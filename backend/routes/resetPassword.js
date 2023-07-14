const router = require('express').Router();
const User = require('../models/user');
const crypto = require('crypto');
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');


router.post('/',async (req,res)=>{
    try {
        const userEmail = User.findOne({email:req.body.email});
        if (!userEmail) {
           res.json('user with given email does not exist!')       
        }
        
    } catch (error) {
        
    }

})

module.exports = router
