const jwt = require('jsonwebtoken');
require('dotenv').config();
const expressJwt = require('express-jwt')
const User = require ("../models/User");
const { validationResult } = require('express-validator');



exports.signup = async(req, res) => {
    const userExist = await User.findOne({email: req.body.email});
    if (userExist){
       return res.status(403).json({error: "Email is aleady taken!"});
    }

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({error: errors.array().map((err) => err.msg).toString()})
    }

    const user = await new User(req.body)
    await user.save()
    res.json({user: "Account successfully created!!"})

}

exports.signin = (req, res) => {
    // find the user based on email
    const { email, password } = req.body;
    User.findOne({ email}, (err, user) => {
        // if error or no user 
        if(err || !user){
            return res.status(401).json({
                error: "User with that email does not exist. Please signin."
            })
        }
        // if user is found make sure email and password match

        // create authenticate method in model and use here
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and password do not match"
            })
        }
        // generate a token with id and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

        // persist the token as 't' in cookie with expiry date
        res.cookie('t', token, {expire: new Date() + 9999});

        // return response with user and token to frontend client
        const {_id, name, email} = user
        return res.json({ token, user: {_id, email, name} });
    })

};

exports.signout = (req, res) => {
    res.clearCookie("t")
    return res.json({message: "Signout success!"});
};

exports.requireSignin = expressJwt({
    // if the token is valid, express jwt appends the verified userId in 
    // auth key to the request object
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: "auth"
})