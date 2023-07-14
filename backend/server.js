//importing packeges
const express = require('express'); //importing the express library that we downloaded(by npm i express)
const app = express(); // setting up/excuting the server by calling express as a function
const cors = require('cors');
require('dotenv').config(); // importing the dotenv package so we can use the env file for the mongo db connection url
const multer = require('multer')
const path = require('path')


const port = process.env.PORT || 5000;   //the port of the server  *not the client!*

//route example
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'hello server'
    })
})

//database connection
const dbConnection = require('./db')
dbConnection();

// app.use('/images', express.static(path.join(__dirname, 'public/images')))

//middleWares - functions that executes when the user is using the routes
app.use(express.json()); // recieving the information from the client and returning it in json format 
app.use(cors());


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../frontend/src/assets/images');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);  
    }
});
const upload = multer({ storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        return res.status(200).json('filed uploaded successfully!')
    } catch (error) {
        console.log(error);
    }
})

const registerRouter = require('./routes/register');
const logInRouter = require('./routes/login');
const resetRouter = require('./routes/resetPassword');
const postRouter = require('./routes/post');

app.use('/api/users', registerRouter)  // whenever someone types in the end of the *server* url: /api/users , the registerRouter(register.js) is going to load
app.use('/api/login', logInRouter);
app.use('/api/resetPassword', resetRouter);
app.use('/api/post', postRouter);

app.listen(port, () => { console.log(`listening on port ${port}...`); })  // making our server actualy run

app.use(express.json());
