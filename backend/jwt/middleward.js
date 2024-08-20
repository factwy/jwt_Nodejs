const jwt = require('jsonwebtoken')

module.exports = {
    verifyToken: function(req, res, next){
        try {
            req.decoded = jwt.verify(req.headers.authorization, )
        }
    }
}