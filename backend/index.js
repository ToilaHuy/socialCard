const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const morgan = require('morgan');
const cardRouter = require('./src/routes/Card');
const commnetRouter = require('./src/routes/Comment');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
const db = require('./src/config/db');
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static('uploads'));

db.connect();
//routes
app.use('/card', cardRouter);
app.use('/comment', commnetRouter);

app.use(express.static('uploads'));
app.get('/api', (req, res) => {
    res.status(200).json('hello');
});
app.listen(8000, () => {
    console.log('server is running....');
});
