const express = require('express');
const app = express();
const cors = require('cors');

const hueRouter = require('./hue-api');

app.use(cors());
app.use('/hue', hueRouter);

module.exports = app;