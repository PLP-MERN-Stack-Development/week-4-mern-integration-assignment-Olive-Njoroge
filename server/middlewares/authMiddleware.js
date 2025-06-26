//protect routes, do authenticatio n and authorization
const jwt = require('jsonwebtoken');


//checks token and sets req.user
exports.protect = (req, res, next) => {
    try{
        const auth = req.headers.authorization;
        if(!auth || !auth.startsWith("Bearer ")) return res.status(401).json({message: "No token Given"});
        
        //Targeting tocken in bearer since it's index 1 Bearer <token>
        const token = auth.split(" ")[1];

        //Decoding the password
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //attaching our user to the token
        req.user = decoded;       //{id, name}
        next();
    }catch(error){
        return res.status(403).json({message: "Invalid token"});
    }
}