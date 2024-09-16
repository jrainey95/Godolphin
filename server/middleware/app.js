const express = require('express');

const app = express();


// Middleware functions
function middleware1(req, res, next) {
    req.customProperty = 100;
    console.log('I am a middleware');
    next();
}

function middleware2(req, res, next) {
    console.log(`The custom property value is: ${req.customProperty}`);
    req.customProperty = 69;
    next();
}

// Register middleware
app.use(middleware1);
app.use(middleware2);

// Route handler
app.get('/', (req, res, next) => {
    console.log('I am the standard Express function');
    res.send(`<h1>The Value is: ${req.customProperty}</h1>`);
});

// Error handler middleware
function errorHandler(err, req, res, next) {
    console.error(err); // Log the error for debugging
    res.status(500).send('<h1>There was an error, please try again</h1>');
}

// Register error handler middleware
app.use(errorHandler);

// Start the server
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
