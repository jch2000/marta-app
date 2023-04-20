const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require ("mysql");

const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());
app.listen(3001, () => {
   console.log("running server");
   console.log(`Server is listening on port ${PORT}`);
});

const db =  mysql.createPool({
  host     : 'db4free.net',
  user     : 'martaplus',
  password : 'martaplus',
  database : 'martaplus'
 });
 
module.exports = db;

app.post('/signup', (req,res)=> {

    const first_name = req.body.first_name;
    const last_name = req.body.last_name; 
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;

    console.log("Signed up");

    db.on('error', function(err) {
        console.log("[mysql error]",err);
      });

    db.query(
        "INSERT INTO customer (first_name, last_name, email, phone, userpassword) VALUES (?,?,?,?,?)",
        [first_name, last_name, email, phone, password],
        (error, result)=> {
            if(error){
                console.log(error);
            }
            else {
              console.log("registration successful", result) ;
            }
        }
    )
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(`your email: ${email}, password: ${password}`);

    db.query(
      "SELECT * FROM customer WHERE email = ? AND userpassword = ?",
      [email,password],
      (error, result) => {
        if (error) {
          res.send({error: error});
        }
        else if(result.length != 0) {
          console.log(result);
          console.log(`message:"Login successful" with email: ${email}`) ;
          localStorage.setItem('email', response.data.email);
          localStorage.setItem('id', response.data.customer_id);
        } else {
          console.log(`Wrong email/password! with email: ${email}, and password: ${password}`);
        }
      }
    )
  });

  app.get('/profile', (req, res) => {
    const email = req.query.email;
    db.query(`SELECT * FROM customer WHERE email = ?`, [email], 
    (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });
  

  app.put('/update', (req, res) => {
    const { first_name, last_name, phone, email} = req.body;
    const sql = `UPDATE customer SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE email = ? `;
    db.query(sql, [first_name, last_name, email, phone, email], (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });


  app.delete('/delete', (req, res) => {
    const email = req.body.email;
    
    // Escape email to prevent SQL injection
    const escapedEmail = db.escape(email);
  
    db.query("DELETE FROM customers WHERE email = " + escapedEmail, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error deleting customer");
      } else {
        res.send(result);
      }
    });
  });


  app.post("/nearestStation", (req, res) => {
    const userLat = req.body.userLat;
    const userLng = req.body.userLng;

    db.query("SELECT station_name, (3959 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance FROM Station ORDER BY distance LIMIT 0, 1;", [userLat, userLng, userLat],(error, result) => {
      if (error) {
        res.send({error: error});
        return;
      }
      res.send(result);
    })
  });

  app.post("/possibleRoutes", (req, res) => {
    const start = req.body.start;
    const destination = req.body.destination;
    const time = req.body.time;

    /*Get possible routes*/
    db.query("SELECT * FROM Route WHERE ? in (st_1, st_2, st_3, st_4, st_5, st_6, st_7, st_8, st_9, st_10, st_11, st_12, st_13, st_14, st_15, st_16, st_17, st_18, st_19) AND ? IN (st_1, st_2, st_3, st_4, st_5, st_6, st_7, st_8, st_9, st_10, st_11, st_12, st_13, st_14, st_15, st_16, st_17, st_18, st_19);", [start, destination], (error, result) => {
      if (error) {
        res.send({error: error});
        return;
      }

      res.send(result);
      /*Case where 1*/
      /*db.query("SELECT * FROM TrainSchedule WHERE TrainSchedule.line_id = ? AND TrainSchedule.? >= '11:00:00' ORDER BY ? LIMIT 1;", [rInfo.valid_line_ids[0], rInfo.end_indices[0][0], time, rInfo.end_indices[0][0]], (error, result2) => {
        if (error) {
          res.send({error: error});
          return;
        }
    });*/
  });
});

app.post("/fastestRoute", (req, res) => {
  const start = req.body.start;
  const destination = req.body.destination;
  const time = req.body.time;
  const rInfo = req.body.rInfo;
  const index = req.body.index;

  db.query(`SELECT TrainSchedule.line_id, Line.color, Line.direction, ${rInfo.stationIndices.toString()} FROM TrainSchedule INNER JOIN Line ON TrainSchedule.line_id = Line.id WHERE TrainSchedule.line_id = ? AND TrainSchedule.${rInfo.stationIndices[index][0]} >= ? ORDER BY TrainSchedule.${rInfo.stationIndices[index][0]} LIMIT 1;`, [rInfo.lineIds[index], time], (error, result) => {
    if (error) {
      res.send({error: error});
      return;
    }
    res.send(result);
  });
});

  app.post("/schedule", (req, res) => {
    const stationInput = req.body.stationInput;
    const lineInput = req.body.lineInput;
    const dirInput = req.body.dirInput;
    const routeLength = {"blue": 15, "green": 9, "red" : 19, "gold" : 18};
    let stations = "";
    let query_1_return;
    let position = 'x';
    let lineID = 0;
  
    console.log(`user's input station: ${stationInput}, line: ${lineInput}, dir: ${dirInput}`);

    const queryFunc = () =>{
      if(stationInput) {
        return new Promise((resolve, reject)=>{
          db.query(
            "SELECT position, line_id FROM StationHasRoute WHERE station_name = ? AND line_id = (SELECT id FROM Line WHERE color = ? AND direction = ?)",
            [stationInput,lineInput, dirInput], 
            (error, result) => {
              if (error) {
                console.log(error)
                console.log(`Combination ${stationInput}, ${lineInput}, ${dirInput} is invalid`);
              } else if (result.length == 0) {
                console.log("Please pick a station");
              } else {
                query_1_return = result;
                resolve();
                console.log(result);
              }
            });
        });
      }
      else {
        return new Promise((resolve, reject)=>{
          for (let index = 0; index < routeLength[lineInput]; index++) {
            stations = stations + " st_"+(index+1).toString();
            if (!(index+1 == routeLength[lineInput])) {
              stations += ",";
            }
          } 
          console.log(typeof stationInput, lineInput, dirInput, stations)
          let query_1 = "SELECT" + stations + " FROM TrainSchedule WHERE line_id = (SELECT id FROM Line WHERE color = '" + lineInput + "' AND direction = '" + dirInput + "')";
          db.query(
            query_1,
            (error, result) => {
              if (error) {
                console.log(error)
                console.log(`Combination ${stations}, ${lineInput}, ${dirInput} is invalid`);
              } else if (result.length == 0) {
                console.log("Please pick a line");
                alert("Invalid Line and Direction combination");
              } else {
                console.log("yay");
                query_1_return = result;
                resolve();
                console.log(result);
              }
            });
        });
      }
    };
    
    queryFunc().then((val)=>{
      if(stationInput) {
        position = query_1_return[0]["position"];
        lineID = query_1_return[0]["line_id"];
        console.log(position, lineID);

        let query_2 = "SELECT StationHasRoute.station_name, TrainSchedule." + position + " FROM TrainSchedule INNER JOIN StationHasRoute ON StationHasRoute.line_id = TrainSchedule.line_id WHERE station_name = '" + stationInput + "' AND StationHasRoute.line_id = " + lineID;
        db.query(
          query_2,
          (error, result) => {
            if (error) {
              console.log(error);
            } else {
              console.log(`Here are the train time for ${stationInput} station on the ${dirInput} ${lineInput} line:`);
              console.log(result);
              return res.json({'pos': position, 'res': JSON.parse(JSON.stringify(result))});
            }
          }
        )
      } else {
        console.log(query_1_return);
        let query_2 = "SELECT" + stations + " FROM Route WHERE line_id = (SELECT id FROM Line WHERE color = '" + lineInput + "' AND direction = '" + dirInput + "')";
        db.query(
          query_2,
          (error, result) => {
            if (error) {
              console.log(error);
            } else {
              console.log(`Here are the train times on the ${dirInput} ${lineInput} line:`);
              console.log(result);
              return res.json({'st': stations, 'q2': result, 'q1': JSON.parse(JSON.stringify(query_1_return))});
            }
          }
        )
      }
    });

    
  });