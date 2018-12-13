const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const config = require('../../config');

function validationSignIn(user){
    if(user.length === 0){
        return false;
    }else{
        return true;
    }
}
router.post('/',(req, res) => {
    console.log(config.jwtSecret);
    
    const user = {
        username: req.body.username,
        password: req.body.password
    }
    User
        .find({
            username: user.username,
            password: user.password
        })
        .then((user) => {
            console.log(user);
            
            if(validationSignIn(user)){
                const token = jwt.sign({user}, config.jwtSecret);
                  res.json({ token });
            }else{
                res.status(401).json({ errors: { form: "Username or password incorrect" } })
            }
        })
    
    
});
module.exports = router;