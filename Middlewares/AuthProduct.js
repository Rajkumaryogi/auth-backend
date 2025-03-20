const jwt = require('jsonwebtoken');

const ensureAuthProduct = (req, res, next) => {
    const auth = req.header('authorization');
    if(!auth){
        return res.status(403)
        .json({
            message: "Unauthorized, JWT token is required : Access Denied"
        });
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400)
        .json({
            message: "Invalid Token: Unauthorized, JWT token is wrong or expired : Access Denied"
 });
    }
}

module.exports = ensureAuthProduct;