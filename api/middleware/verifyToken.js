const jwt = require('jsonwebtoken')

function verify(req, res, next){
    const authorization = req.headers.authorization;
    if (authorization){
        const token = authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, (err,user) => {
            if (err) res.status(403).json('token_is_not_valid');
            req.user = user;
            next();
        })
    }else{
        res.status(401).json('token_not_found');
    }
}

module.exports = verify;
