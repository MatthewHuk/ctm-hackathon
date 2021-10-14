const express = require('express');
const cookieParser = require('cookie-parser');
const httpServer = require('http');
const app = express();
const normalizePort = require("./helpers/normalizePort")
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

// Routes
const indexRouter = require('./routes/index');
const insuranceRouter = require('./routes/insurance');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Use routes
app.use('/', indexRouter);
app.use('/', insuranceRouter);

const port = normalizePort(process.env.PORT || '3001');
let server = httpServer.createServer(app);

app.on("ready", () => {
    server.listen(port);
    console.log(`The Quoting fun has started on port ${port}.`);
});

app.emit("ready");

module.exports = server;