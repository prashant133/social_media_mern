const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users));   // get for us all the questions from mongoDb atles database, and returns it in json format
})

router.post('/register', (req, res) => {

    const userName = req.body.userName; // grabing the name that the user entered
    const email = req.body.email;
    const password = req.body.password;
    // tha name of the variable(const ...) should be equal to the name of the filed in test model, but the name after(req.body._)  should be equal to the name of the field in the frontend state/object.

    User.findOne().sort({ _id: -1 }).exec(async (err, lastUser) => {
        const addId = lastUser?.id ? lastUser.id + 1 : 1;
        const salt = await bcrypt.genSalt(Number(10));
        const hashPassword = await bcrypt.hash(password, parseInt(salt));
        const regexp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const validEmail = regexp.test(email);
        const existEmail = await User.findOne({ email });
        const existUserName = await User.findOne({ userName });

        const newUser = new User({
            userName,
            email,
            password: hashPassword,
            id: addId
        });
        if (password.length < 4) {
            res.status(400).json('password must be at least 4 characters')
        }

        else if (password.length > 11) {
            res.status(400).json('Password must be less than 11 characters')
        }

        else if (!validEmail) {
            res.status(400).json('This is not a valid email format!')
        }
        else if (existEmail) {
            res.status(400).json('user with given email already exist!')
        }

        else if (existUserName) {
            res.status(400).json('userName  already exists');

        }

        else {
            newUser.save();
            res.status(200).send({ message: 'user successfully added' })
        }
    })
})

//get user
router.get('/profile/:name', (req, res) => {
    User.findOne({ userName: req.params.name }, (err, obj) => {
        if (err) {
            res.status(400).json('ERROR' + err)
        }
        else {
            res.status(200).json(obj);
        }
    })
})

//update user details
router.post('/update/:name', (req, res) => {
    User.findOneAndUpdate({ userName: req.params.name }, req.body)
        .then(() => {
            res.status(200).json('user updated successfully');
        })
        .catch((err) => console.log(err))
})


module.exports = router
