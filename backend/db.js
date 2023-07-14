const mongoose = require('mongoose'); // so we could connect to mongodb 

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true    // something that requires to connect to the database       
    }
    const DataBase = process.env.DB;   // connection url that i got from mongodb and put it in env file (that called 'DataBaseUrl')
    try {
        mongoose.connect(DataBase, connectionParams);
        console.log('connected to mongoDb data base successfully');
    } catch (error) {
        console.log(error);
        console.log('could not connect to data base!');
    }
} 