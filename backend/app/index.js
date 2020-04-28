const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const accountRouter = require('./api/account');
const IdentityEngine = require('./account/accountId/engine');
const cors = require('cors');

const app = express();
// const engine = new IdentityEngine();

// app.locals.engine = engine;

app.use(cors({ 
    origin: 'http://localhost:1234',
    credentials: true
}));

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/account', accountRouter);

// error handling
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        type: 'error', message: err.message
    })
});

// engine.start();

module.exports = app;