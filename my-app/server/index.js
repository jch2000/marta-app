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
        } else {
          console.log(`Wrong email/password! with email: ${email}, and password: ${password}`);
        }
      }
    )
  });

  app.post("/nearestStation", (req, res) => {
    const userLat = req.body.userLat;
    const userLng = req.body.userLng;

    db.query("SELECT station_name, (3959 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance FROM Station ORDER BY distance LIMIT 0, 1;", [userLat, userLng, userLat],(error, result) => {
      if (error) {
        res.send({error: error});
      } else {
        res.send("Response...");
      }
    })
  });

  app.post("/schedule", (req, res) => {
    const stationInput = req.body.stationInput;
    const lineInput = req.body.lineInput;
    const dirInput = req.body.dirInput;
    const position = "";
    // const lineID = 0
  
    console.log(`user's input station: ${stationInput}, line: ${lineInput}, dir: ${dirInput}`);

    // db.query(
    //   "SELECT position, line_id FROM StationHasRoute WHERE station_name = ? AND line_id = (SELECT id FROM Line WHERE color = ? AND direction = ?)",
    //   [stationInput,lineInput, dirInput],
    //   (error, result) => {
    //     if (error) {
    //       console.log(error)
    //       console.log(`Combination ${stationInput}, ${lineInput}, ${dirInput} is invalid`);
    //     } else {
    //       position = result[0]["position"];
    //       console.log(position)
    //       // lineID = result[0]["line_id"]
    //     }
    //   }
    // )

    // db.query(
    //   'SELECT StationHasRoute.station_name, TrainSchedule.? FROM TrainSchedule INNER JOIN StationHasRoute ON StationHasRoute.line_id = TrainSchedule.line_id WHERE station_name = ?;'
    //   [position, stationInput],
    //   (error, result) => {
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log(`Here are the train time for ${stationInput} station on the ${dirInput} ${lineInput} line:`);
    //       console.log(result);
    //     }
    //   }

    // )
  });