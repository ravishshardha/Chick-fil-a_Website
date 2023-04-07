const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
// Create express app
const app = express();
const port = 3000;


const { Client } = require('pg');

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

client.query('SELECT * FROM orderslog1', (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log(res.rows);
    }
    client.end();
  });