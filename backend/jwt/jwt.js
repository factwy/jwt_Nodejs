const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const generateToken = (payload)=>{
    const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, {expiresIn : '1h'})

    return token
}

const refreshToken = (token)=>{
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
    
        const payload = {
            userId: decoded.userId,
            userPassword: decoded.userPassword,
            isAdmin: decoded.isAdmin
        }
    
        const newToken = generateToken(payload)
        return newToken
    } catch (error) {
        console.error('Error Refreshing Token : ', error)
        return null
    }
}

module.exports = {generateToken, refreshToken}