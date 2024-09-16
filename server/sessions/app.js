const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

var app = express();

const dbString = 'mongodb://localhost:27017/login_db';

const connection = mongoose.createConnection(dbString); // No need for deprecated options

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionStore = MongoStore.create({
    mongoUrl: dbString,
    collectionName: 'sessions3'
});

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.get('/', (req, res, next) => {
    if (req.session.viewCount) {
        req.session.viewCount = req.session.viewCount + 1;
    } else {
        req.session.viewCount = 1;
    }
    res.send(`<h1>You have visited this page: ${req.session.viewCount} times</h1>`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
