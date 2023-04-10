//add sql connection + code here 

import mysql from "mysql"
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'martaApp',
  password : 'marta@DB23',
  database : 'martaplus'
});
export default connection

