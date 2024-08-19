const mysql = require('mysql2')
const dotenv = require('dotenv')

dotenv.config()

const dbInfo = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}

console.log(dbInfo)

// const dbInfo = {
//     host: 'localhost',
//     user: 'factwy',
//     password: '8865',
//     database: 'jwt_db'
// }

module.exports = {
    init: function() {
        return mysql.createConnection(dbInfo)
    },
    connect: function(conn){
        conn.connect((err)=>{
            if(err) console.log('MySQL 연결 실패')
            else    console.log('MySQL 연결 성공')
        })
    }
}