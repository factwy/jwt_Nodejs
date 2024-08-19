const express = require('express')
const mysql = require('./db/db.js')
const jwt = require('./jwt/jwt.js')
const path = require('path')
const static = require('serve-static')

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/frontend', static(path.join(__dirname, 'frontend')))

const conn = mysql.init()
mysql.connect(conn)

app.listen(8000, (req, res)=>{
    console.log('8000번 포트 확인')
})