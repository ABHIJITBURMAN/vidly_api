const jwt = require('jsonwebtoken');

function auth(req,res,next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Ascess denied.');

    try{
        const decoded = jwt.verify(token,process.env.SECRET);
        // console.log('middleware', decoded);
        req.user = decoded;
        next();
    }
    catch(err){
        res.status(400).send('Invalid Token');
    }
    

}
module.exports = auth;