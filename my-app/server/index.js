const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require ("mysql")

const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());
app.listen(3001, () => {
   console.log("running server");
   console.log(`Server is listening on port ${PORT}`)
});

const db =  mysql.createPool({
  host     : 'localhost',
  user     : 'martaApp',
  password : '',
  database : 'martaplus'
 });
 
 module.exports = db;

app.post('/signup', (req,res)=> {

    const first_name = req.body.first_name;
    const last_name = req.body.last_name; 
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;

    db.on('error', function(err) {
        console.log("[mysql error]",err);
      });

    db.query(
        "INSERT INTO customer (first_name, last_name, email, phone, userpassword) VALUES (?,?,?,?,?)",
        [first_name,last_name, email, phone, password ],
        (error, result)=> {
            if(error){
                throw error
            }
            console.log(error); 
        }
    )
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    db.query(
      "SELECT * FROM customers WHERE email = ? AND password = ?",
      [email,password],
      (error, result) => {
        if (error) {
          throw error
        }
        console.log(result)
  
        if (result.length > 0) {
            console.log(result);          
        } else {
          console.log({ message: "Wrong username/password" });
        }
      }
    );
  });
  