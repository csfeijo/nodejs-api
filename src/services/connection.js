//const dotenv = require('dotenv')
import dotenv from 'dotenv'
import mysql from 'mysql2/promise'
//const mysql = require('mysql2/promise')
dotenv.config()

const con = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

con.getConnection().then(connection => {
  console.log('Database connection established.')
  connection.release()
}).catch(err => {
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('Database connection was closed.')
  }
  if (err.code === 'ER_CON_COUNT_ERROR') {
    console.error('Database has too many connections.')
  }
  if (err.code === 'ECONNREFUSED') {
    console.error('Database connection was refused.')
  }
})

export default con
