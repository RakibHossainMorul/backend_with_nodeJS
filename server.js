//
const express = require('express');
console.log(express);
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');


//Database Connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contacts-db');
const db = mongoose.connection;
db.on('error',(err) => {
    console.log(err);
});
db.once('open',(err) => {
    console.log("Database Connection Established!");
});
//


//
const contactRoute = require('./api/route/contact_route/contact_route');
//
const userRoute = require('./api/route/user_route/user_route');


const app = express();
 app.use(morgan('dev'));
 app.use(bodyParser.urlencoded({extended: true}));
 app.use(bodyParser.json());
 app.use(cors());
const PORT=process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
//

app.use((req, res, next) => {
    console.log('Function is middleware!');
    next();
});

//
app.use('/api/contactList', contactRoute);
//
app.use('/api/user', userRoute);



app.get('/', (req, res) => {
    res.send(`<h1>Welcome to my first API with node mon auto server!\nHello World!</h1>`);
});
app.get('/new', (req, res) => {
    res.send(`<h1>This is new Page</h1>`);
});



