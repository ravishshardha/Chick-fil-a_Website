var express = require("express");
var router = express.Router();

const { Client } = require("pg");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const cors = require('cors');
app.use(cors());

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

// get request for orders
app.get('/api/retrieveorders', (req, res) => {
  client.query('SELECT * FROM orderslog1', (error, results) => {
    if (error) {
      console.log("unable to connect");
      throw error;
    }
    console.log("sent");
    res.json(results.rows);
  });
});

// get request for menu
app.get('/api/menu', (req, res) => {
  client.query('SELECT * FROM menu', (error, results) => {
    if (error) {
      console.log("unable to connect");
      throw error;
    }
    console.log("sent");
    res.json(results.rows);
  });
});


app.get('/api/menu1', (req, res) => {
  client.query('SELECT * FROM menu', (error, results) => {
    if (error) {
      console.log("unable to connect");
      throw error;
    }
    console.log("sent");
    res.json(results.rows);
  });
});

// app.get('/api/postOrder', async (req, res) => {

//   const result = client.query('SELECT orderid FROM orderslog1 ORDER BY orderid DESC LIMIT 1', [req.params.id]);

//   const { time, employeeid, orderid,itemlist,price } = req.body;
//   const now = new Date();
//   time = now.toLocaleString('en-US', { hour12: false });
//   console.log(time);
//   res.status(201).json({ message: 'User created successfully' });
//   // try {
//   //   const result =  client.query('INSERT INTO data (time, employeeid, orderid,itemlist,price) VALUES ($1, $2, $3,$4, $5)', [time, employeeid, orderid,itemlist,price]);
//   //   res.status(200).json(result.rows[0]);
//   // } catch (error) {
//   //   console.error(error);
//   //   res.status(500).json({ error: 'Something went wrong' });
//   // }
// });

app.get('/api/addOrder', (req, res) => {
  // create time
  const now = new Date();
  const time = now.toLocaleString('en-US', { hour12: false });
  console.log(time);
  // find id
  client.query('SELECT orderid FROM orderslog1 ORDER BY orderid DESC LIMIT 1', (error, results) => {
    if (error) {
      console.log("unable to connect");
      throw error;
    }
    const myValueString = results.rows[0].orderid;
    const nextOrderId = parseInt(myValueString, 10) + 1 ; 
    console.log(nextOrderId)
    
    // insert to DB
    const itemlist = "testItems";
    const price = 99999;
    const employeeid  = 9999999;
    client.query('INSERT INTO orderslog1 (time, employeeid, orderid,itemlist,price) VALUES ($1, $2, $3,$4, $5)', [time, employeeid, nextOrderId,itemlist,price]);
    console.log('inserted');
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
