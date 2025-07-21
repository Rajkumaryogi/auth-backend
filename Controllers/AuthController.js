const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/user');

const signup = async (req, res) => {
    try {
        const {name, email, password } = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409)
            .json({ message: "User is already exists, you can login", success: false});
        }
        const userModel = new UserModel({name, email, password});
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "User created successfully", 
                success: true
            })

    } catch (error) {
        res.status(500)
        .json({
            message: "Internal server error",
            success: false
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({email});
        errorMsg = "Invalid email or password - Auth failed";
        console.log(errorMsg);
        if(!user){
            return res.status(403)
            .json({ 
                message: errorMsg, 
                success: false
            })
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if(!isPassEqual){
            return res.status(403)
            .json({ 
                message: errorMsg, 
                success: false
            })
        }
        const jwtToken = jwt.sign({
            email: user.email,
            _id: user._id
        }, process.env.JWT_SECRET, {expiresIn: '24h'})


        res.status(200)
            .json({
                message: "Login Success", 
                success: true,
                jwtToken,
                email: user.email,
                name: user.name
                
            })

    } catch (error) {
        res.status(500)
        .json({
            message: "Internal server error",
            success: false
        })
    }
}
module.exports = { signup, login };