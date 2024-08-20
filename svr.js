const express = require('express')
const path = require('path')
const static = require('serve-static')
const signRouter = require('./backend/sign/sign.js')

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/frontend', static(path.join(__dirname, 'frontend')))

app.listen(8000, (req, res)=>{
    console.log('8000번 포트 확인')
})

app.use('/sign', signRouter)