var express = require("express");
var router = express.Router();

const { Client } = require("pg");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const client = new Client({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_DATABASE,
  password: process.env.PSQL_PASSWORD,
  port: process.env.PSQL_PORT,
});

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected');
  }
});

// client.query('SELECT * FROM menu', (err, res) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(res.rows);
//   }
//   client.end();
// });


// get request
app.get('/api/data', (req, res) => {
  client.query('SELECT * FROM orderslog1', (error, results) => {
    if (error) {
      console.log("unable to connect");
      throw error;
    }
    console.log("sent");
    res.json(results.rows);
  });
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});


/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
