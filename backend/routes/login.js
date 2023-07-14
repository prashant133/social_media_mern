const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');


router.post('/', async (req, res) => {


    try {
        const loggedUser = await User.findOne({ userName: req.body.userName });
        const validPassword = await bcrypt.compare(req.body.password, loggedUser.password);
       
        if (!loggedUser) {
            res.json('invalid email or password')
        }

        if (!validPassword) {
            // res.status(400).json('password must be at least 4 characters')
            res.json('invalid email or password')
            // res.json('logged in successfully')
        }

        if (validPassword) {
            // res.json('logged in successfully')
             res.status(200).send({ message: 'logged in successfully' });
        }
        
    } catch (error) {
        res.json('invalid email or password')
    }

})

module.exports = router