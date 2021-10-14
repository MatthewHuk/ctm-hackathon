const express = require('express');
const cookieParser = require('cookie-parser');
const httpServer = require('http');
const app = express();
const normalizePort = require("./helpers/normalizePort")
const { v4: uuidv4 } = require('uuid');

// Routes
const indexRouter = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Use routes
app.use('/', indexRouter);

const port = normalizePort(process.env.PORT || '3001');
let server = httpServer.createServer(app);

app.on("ready", () => {
    server.listen(port);
    console.log(`The Quoting fun has started on port ${port}.`);
});

app.emit("ready");

module.exports = server;