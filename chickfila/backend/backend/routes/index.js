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
  client.query('SELECT * FROM orderslog1 LIMIT 30', (error, results) => {
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

// get request for ingredients
app.get('/api/ingredients', (req, res) => {
  client.query('SELECT * FROM ingredients', (error, results) => {
    if (error) {
      console.log("unable to connect");
      throw error;
    }
    console.log("sent");
    res.json(results.rows);
  });
});


app.get('/api/addOrder', (req, res) => {
  // create time
  let date = new Date();
  let time = date.toISOString().slice(0, 19).replace('T', ' ');
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
    // parse input  // TEST STRING
    const jsonString = req.query.order;
    const data = JSON.parse(jsonString);

    let itemlist = [];
    let price = 0.0;
    let ingredientList = [];
    for (let i = 0; i < data.length; i++) {
      itemlist.push(data[i].name);
      price = price + parseFloat(data[i].price);
      ingredientList.push(data[i].ingredients);
    }
    console.log(itemlist);
    const roundedPrice = parseFloat(price.toFixed(2));
    console.log(roundedPrice);
    console.log(ingredientList);
    // rand employee ID
    const min = 100000;
    const max = 100100;
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(randomInt);
    const employeeid  = randomInt;
    const itemListString = itemlist.join(", ");
    client.query('INSERT INTO orderslog1 (time, employeeid, orderid,itemlist,price) VALUES ($1, $2, $3,$4, $5)', [time, employeeid, nextOrderId,itemListString,roundedPrice]);
    console.log('inserted');

    // loop through ingredientList
    for (let i = 0; i < ingredientList.length; i++) {
      // updating ingredients table
        const ingredientString = ingredientList[i];
        console.log(ingredientString);
        const ingredientMap = parseIngredientList(ingredientString); // create map from ingredient list

        for (const [key, value] of ingredientMap) {
          // find current amount
          client.query('SELECT amount FROM ingredients WHERE id = $1',  [key], (error2, result2) => {
            if (error2) {
                console.log("unable to connect");
                throw error2;
            }
            const amountString = result2.rows[0].amount;
            const currentAmount = parseInt(amountString, 10);
            console.log(currentAmount);
             //updating inventory w subtraction
            client.query('UPDATE ingredients SET amount = $1 WHERE id = $2',  [currentAmount - value, key], (error3, result3) => {
              if (error3) {
                  console.log("unable to connect");
                  throw error3;
              }
              console.log(`Updated ${result3.rowCount} row(s)`);
              });
           });
        }
    }
  });
});

// helper function for addOrder
function parseIngredientList(str) {
  const pairs = str.match(/\d+,\s*\d+/g); // match all pairs of numbers
  const arr = pairs.map((pair) => {
  const [x, y] = pair.split(","); // split each pair into x and y values
  return [Number(x), Number(y)]; // convert x and y values to numbers and return as array
});
const map = new Map();
arr.forEach((pair) => {
  map.set(pair[1], pair[0]);
}); 
  return map;
}

// seaonsal item*
app.get('/api/addItem', (req, res) => {
  // find id
  client.query('SELECT id FROM menu ORDER BY id DESC LIMIT 1', (error, results) => {
    if (error) {
      console.log("unable to connect");
      throw error;
    }
    const myValueString = results.rows[0].id;
    const nextOrderId = parseInt(myValueString, 10) + 1; 
    console.log(nextOrderId);
    //client.query('INSERT INTO Menu (id,name ,price ,type, ingredients,url) VALUES ($1, $2, $3,$4, $5)', [id,itemName ,price ,type, ingredients,url]);
  });
});

app.get('/api/Zreport', (req, res) => {
  //const inputTime = req.time;
  const inputTime = '2022-03-07 09:13:53';
  let newDate = new Date(inputTime);
  newDate.setHours(newDate.getHours() + 24);
  console.log(newDate);

  client.query('SELECT * FROM orderslog1 WHERE time between $1 and $2', [inputTime, newDate], (error, results) => {
    if (error) {
      console.log("unable to connect");
      throw error;
    }
    console.log("sentZreport");
    res.json(results.rows);
  });
});

app.get('/api/salesReport', (req, res) => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  client.query('SELECT * FROM orderslog1 WHERE time BETWEEN $1 AND $2;', [startDate, endDate], (error, results) => {
    if (error) {
      console.log("unable to connect");
      throw error;
    }
    console.log("sent of sales report");
    res.json(results.rows);
  });
});

app.get('/api/Xreport', (req, res) => {
  client.query('SELECT date FROM zreports ORDER BY date DESC LIMIT 1', (error, results) => {
    if (error) {
      console.log("unable to connect");
      throw error;
    }
    const mostRecentDate = results.rows[0].date;
    console.log("most recent report", mostRecentDate);
    let date = new Date();
    let currTime = date.toISOString().slice(0, 19).replace('T', ' ');
    console.log("current time",currTime);
    client.query('SELECT * FROM orderslog1 WHERE time between $1 and $2',[mostRecentDate,currTime], (error, results) => {
      if (error) {
        console.log("unable to connect");
        throw error;
      }
      console.log("sentXreport");
      res.json(results.rows);
  });
  });
});

// inventory query
app.get('/api/ingredients', (req, res) => {
  client.query('SELECT * FROM ingredients', (error, results) => {
    if (error) {
      console.log("unable to connect");
      throw error;
    }
    console.log("sent inventry");
    res.json(results.rows);
  });
});

app.get('/api/addInventory', (req, res) => {
  const name = "newItem";
  const vendor = "newVendor";
  const stock = 0;
  const restock = 0;
  client.query('INSERT INTO inventory (id,name,amount,vendor) VALUES ($1, $2, $3,$4,)',[name,vendor,stock,restock]);
});

app.get('/api/whatSalesTogether', (req, res) => {
  client.query('SELECT * FROM menu', (error, results) => {
    if (error) {
      console.log("unable to connect");
      throw error;
    }
    console.log("sent");
    res.json(results.rows);
  });
});

app.get('/api/excessReport', (req, res) => {
  const inputDate = " 2023-03-09 00:00:00";

  let date = new Date();
  let currTime = date.toISOString().slice(0, 19).replace('T', ' ');
  console.log("current time",currTime);

  client.query('SELECT * FROM orderslog1 WHERE time between $1 and $2',[inputDate,currTime], (error, results) => {
    if (error) {
      console.log("unable to connect");
      throw error;
    }

    // Map to store amounts
    const map = new Map();


    for (let i = 0; i < results.rows.length; i++) {
      const itemListString = results.rows[i].itemlist;
      const itemList = itemListString.split(", ");
      for (let i = 0; i < itemList.length; i++) {
       // map[itemList[i]] =
      }
      console.log(row);
    }
    console.log("sent excess report");
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