const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const cardRouter = require('./src/routes/Card');
const commnetRouter = require('./src/routes/Comment');
const uploadRouter = require('./src/routes/upload');
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    fileUpload({
        createParentPath: true,
    }),
);
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
app.use('/image', uploadRouter);
app.use(express.static('uploads'));
app.get('/api', (req, res) => {
    res.status(200).json('hello');
});
app.listen(8000, () => {
    console.log('server is running....');
});
