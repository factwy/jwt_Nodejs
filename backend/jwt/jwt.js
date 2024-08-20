const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config({path: './backend/db/.env'})

const generateToken = (payload, expire)=>{
    const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, {expiresIn : expire})

    return token
}

const refreshToken = (token)=>{
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
    
        const payload = {
            userName: decoded.userName,
            isAdmin: decoded.isAdmin
        }
    
        const accessToken = generateToken(payload, '3s')
        return accessToken
    } catch (error) {
        console.error('Error Refreshing Token : ', error)
        return null
    }
}

const verifyToken = (token)=>{
    try{
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY)

        return decoded.userName
    } catch(error) {
        return 'Not Found'
    }
}

module.exports = {generateToken, refreshToken, verifyToken}