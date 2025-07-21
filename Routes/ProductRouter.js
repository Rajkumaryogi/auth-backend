const ensureAuthProduct = require('../Middlewares/AuthProduct');
const router = require('express').Router();

router.get('/',ensureAuthProduct,(req, res) => {
    // console.log("---logged in user details : ",req.user);
    res.status(200).json([
        {
            id: 1,
            name: "Mobile",
            description: "This is a mobile",
            price: 100
        },
        {
            id: 2,
            name: "TV",
            description: "This is a TV",
            price: 200
        }
    ]);
});

module.exports = router;