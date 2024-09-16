// const express = require('express');
// const mongoose = require('mongoose');
// const session = require('express-session');
// const mongoStore = require('express-mongo');
// const MongoStore = require('connect-mongo');


// var app = express();


// const dbString = 'mongodb: //localhost:27017/login_db';
// const dbOptions = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true 
// }

// const connection = mongoose.createConnection(dbString, dbOptions);

// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

// const seesionStore = new MongoStore({
//     mongooseConnection: connection,
//     collection: 'sessions'
// });


// app.use(session({
//     secret: 'some secret',
//     resave: false,
//     saveUninitialized: true,
//     store: seesionStore,
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24
//     }
// }));

// app.listen(3000);









// // // Middleware functions
// // function middleware1(req, res, next) {
// //     req.customProperty = 100;
// //     console.log('I am a middleware');
// //     next();
// // }

// // function middleware2(req, res, next) {
// //     console.log(`The custom property value is: ${req.customProperty}`);
// //     req.customProperty = 69;
// //     next();
// // }

// // // Register middleware
// // app.use(middleware1);
// // app.use(middleware2);

// // // Route handler
// // app.get('/', (req, res, next) => {
// //     console.log('I am the standard Express function');
// //     res.send(`<h1>The Value is: ${req.customProperty}</h1>`);
// // });

// // // Error handler middleware
// // function errorHandler(err, req, res, next) {
// //     console.error(err); // Log the error for debugging
// //     res.status(500).send('<h1>There was an error, please try again</h1>');
// // }

// // // Register error handler middleware
// // app.use(errorHandler);

// // // Start the server
// // app.listen(3000, () => {
// //     console.log('Server is listening on port 3000');
// // });
