const express = require('express')
const mysql = require('../db/db.js')
const jwt = require('../jwt/jwt.js')

const router = express()

conn = mysql.init()
mysql.connect(conn)

let refreshToken = null
let accessToken = null

router.post('/signup', (req, res)=>{
    console.log('signup 호출됨')

    const pname = req.body.name
    const pid = req.body.id
    const ppw = req.body.password

    if(!(pname || pid || ppw)) {ß
        alert('모든 정보를 기입하시오.')
        return
    }

    conn.query('SELECT * FROM user WHERE id = ?',
        pid,
        (err, rows)=>{
            if(err) {
                alert('SQL QUERY ERROR')
                return
            }

            if(rows[0]) {
                alert('이미 존재하는 아이디입니다.')
                return
            }
        }
    )

    conn.query('INSERT INTO user VALUES (?, ?, SHA2(?, 256))',
        [pid, pname, ppw],
        (err, rows)=>{
            if(err) {
                alert('SQL QUERY ERROR')
                return
            }

            res.redirect('/frontend/html/signin.html')
        }
    )
})

router.post('/signin', (req, res)=>{
    console.log('signin 호출됨')

    const pid = req.body.id
    const ppw = req.body.password

    if(!(pid || ppw)) {
        alert('모든 정보를 기입하시오')
        return
    }

    conn.query('SELECT * FROM user WHERE id = ? and password = SHA2(?, 256);',
        [pid, ppw],
        (err, rows)=>{
            if(err) {
                alert('SQL QUERY ERROR')
                return
            }

            if(rows[0]) {

                const payload = {
                    userName: rows[0]['name'],
                    isAdmin: true
                }

                refreshToken = jwt.generateToken(payload, '1h')
                accessToken = jwt.refreshToken(refreshToken)
                res.redirect('/frontend/html/main.html')
            } else {
                alert('잘못된 정보입니다.')
            }
        }
    )
})

router.get('/check_auth', (req, res)=>{
    console.log(refreshToken)
    console.log(accessToken)

    if(jwt.verifyToken(accessToken) == 'Not Found') {
        console.log('Refresh Token 확인 중')
        console.log(refreshToken)
        console.log(accessToken)
        accessToken = jwt.refreshToken(refreshToken)
    }

    const resData = {}
    resData.userName = jwt.verifyToken(accessToken)    
    console.log(refreshToken)
    console.log(accessToken)

    console.log(resData)
    res.send(resData)
})

module.exports = router