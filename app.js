const express = require('express');
const cors = require('cors');

// bring in dotenv...
require('dotenv').config();

const helmet = require('helmet');
const hpp = require('hpp');

const app = express();

// cors options
const corsOptions = {
    origin: 'http://localhost:8081',
};

app.use(helmet());
app.use(hpp()); // 

// This header can be used to detect that the application is powered by Express, which lets hackers conduct a precise attack. 
app.disable('x-powered-by');

app.use(cors(corsOptions));

// get all request as a json 
app.use(express.json());

app.use(express.urlencoded({extended: true}));

// routers
const router = require('./routes/index.js'); // import routers

app.use('/', router);

// test server...
app.get('/', (req, res) => {
    res.json({msg: 'Hello from API!'});
});

module.exports = app;