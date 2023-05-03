var express = require("express");
var router = express.Router();

const { Client } = require("pg");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const cors = require('cors');
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
  client.query('SELECT * FROM orderslog1 ORDER BY time DESC LIMIT 1000', (error, results) => {
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
  client.query('SELECT * FROM menu ORDER BY id', (error, results) => {
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
  client.query('SELECT * FROM ingredients ORDER BY id', (error, results) => {
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

// // seaonsal item*
// app.get('/api/addItem', (req, res) => {
//   // find id
//   client.query('SELECT id FROM menu ORDER BY id DESC LIMIT 1', (error, results) => {
//     if (error) {
//       console.log("unable to connect");
//       throw error;
//     }
//     const myValueString = results.rows[0].id;
//     const nextOrderId = parseInt(myValueString, 10) + 1; 
//     console.log(nextOrderId);
//     //client.query('INSERT INTO Menu (id,name ,price ,type, ingredients,url) VALUES ($1, $2, $3,$4, $5)', [id,itemName ,price ,type, ingredients,url]);
//   });
// });

app.get('/api/Zreport', (req, res) => {
  //const inputTime = "2023-05-01 14:55:41";
  const inputTime = req.query.Time;
  client.query('Select MAX(date) from zreports' , (error1, result1)  => {
    if (error1) {
      console.log("unable to connect");
      throw error1;
    }
    let prevDate = result1.rows[0].max;
    client.query('SELECT * FROM orderslog1 WHERE time between $1 and $2', [prevDate, inputTime], (error, results) => {
      if (error) {
        console.log("unable to connect");
        throw error;
      }
      console.log("sentZreport between times", prevDate, inputTime);
      res.json(results.rows);
      let sale_total = 0;
      for (let i = 0; i < results.rows.length; i++) {
        sale_total = sale_total + results.rows[i].price;
      }
      sale_total = sale_total.toFixed(2);
      console.log(sale_total);
      client.query('INSERT INTO zreports (date,sale_total) values ($1,$2)', [inputTime, sale_total]);
      });
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

// todo
app.get('/api/addInventory', (req, res) => {
  const name = "newItem";
  const vendor = "newVendor";
  const stock = 0;
  const restock = 0;
  client.query('INSERT INTO inventory (id,name,amount,vendor) VALUES ($1, $2, $3,$4,)',[name,vendor,stock,restock]);
});

// todo
app.get('/api/salesTogether', (req, res) => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  client.query('SELECT * FROM orderslog1 WHERE time BETWEEN $1 AND $2;', [startDate, endDate], (error, results) => {
    if (error) {
      console.log("unable to connect");
      throw error;
    }

    const orders = results.rows;
    const pairs = {};

    for (let i = 0; i < orders.length; i++) {
      const items = orders[i].itemlist.substr(0,orders[i].itemlist.length-1).split(',');
      const uniqueItems = [...new Set(items)];
      for (let j = 0; j < uniqueItems.length; j++) {
        for (let k = j + 1; k < uniqueItems.length; k++) {
          const pair = [uniqueItems[j], uniqueItems[k]].sort().join(',');
          pairs[pair] = (pairs[pair] || 0) + 1;
        }
      }
    }

    const sortedPairs = Object.keys(pairs).sort((a, b) => pairs[b] - pairs[a]).reduce((acc, key) => ({...acc, [key]: pairs[key]}), {});

    console.log("sent sales together report");
    res.json(sortedPairs);
  });
});

// todo
app.get('/api/addItem', (req, res) => {
  console.log("got here")
  const id = req.query.id;
  const name = req.query.name;
  const price = req.query.price;
  const type = req.query.type;
  const ingredients = req.query.ingredients;
  const url = req.query.url;
  // const jsonString = req.query._newitem;
  // const data = JSON.parse(jsonString);

  console.log("before menu query")
  client.query("INSERT INTO menu (id, name, price, type, ingredients, url) VALUES ($1, $2, $3, $4, $5, $6);",[id, name, price, type, ingredients, url])
  .then(() => {
    console.log("menu query sent");
    res.sendStatus(200); // respond with a success status code
  })
  .catch(error => {
    console.error(error);
    res.sendStatus(500); // respond with an error status code
  });
  console.log("menu query sent")
});

// todo
app.get('/api/updateItem', (req, res) => {
  const id = req.query.id;
  const name = req.query.name;
  const price = req.query.price;
  const type = req.query.type;
  const ingredients = req.query.ingredients;
  const url = req.query.url;

  console.log(id + ", " + name + ", " + price + ", " + type + ", " + ingredients + ", " + url);

  client.query('UPDATE menu SET name = $2, price = $3, type = $4, ingredients = $5, url = $6 WHERE id = $1',[id,name,price,type,ingredients,url])
  .then(() => {
    console.log("updateItem query sent");
    res.sendStatus(200); // respond with a success status code
  })
  .catch(error => {
    console.error(error);
    res.sendStatus(500); // respond with an error status code
  });
  console.log("updateItem query sent")
});

// todo
app.get('/api/deleteMenuItem', (req, res) => {
  const currentId = req.query.id;
  client.query('DELETE FROM menu WHERE id = $1',[currentId]);
});

// todo
app.get('/api/updateInventory', (req, res) => {
  const currentId = req.query.id;
  const newAmount = req.query.stock;
  console.log("updating item id: " + currentId + ", new stock = " + newAmount);
  client.query('UPDATE ingredients SET amount = $1 WHERE id = $2',[newAmount, currentId]);
});

// todo
app.get('/api/excessReport', (req, res) => {
  client.query('SELECT * FROM ingredients where amount<100;', (error, results) => {
    if (error) {
      console.log("unable to connect");
      throw error;
    }
    console.log("sent of excess report");
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