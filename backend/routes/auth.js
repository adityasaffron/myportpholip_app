var express = require('express');
var router = express.Router();
var User = require("../model/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



/* GET users listing. */
router.post('/login', login);


async function login(req, res, next) {
    try {
        let body = req.body;

        let user = await User.findOne({ email: body.email });
        console.log(user,'user');

        if (!user) {
            return res.status(400).json({ error: 'Invalid Email or password' });
        } else {
            bcrypt.compare(body.password, user.password, (err, result) => {
                if (err) {
                    console.error('Error comparing password:', err);
                    return res.status(500).json({ error: 'Invalid password' });
                }
                if (result) {
                    const token = jwt.sign({ userId: user._id, email:user.email,name:user.name }, 'yourSecretKey', );
                    return res.status(200).json({ message: 'Login successful', token: token });

                } else {
                    return res.status(400).json({ error: 'Invalid password' });
                }
            });
        }
    } catch (error) {
        // Handle any unexpected errors
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = router;
