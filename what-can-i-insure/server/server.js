const express = require('express');
const cookieParser = require('cookie-parser');
const httpServer = require('http');
const app = express();
const normalizePort = require("./helpers/normalizePort")
const cors = require('cors');
const mongo = require('./helpers/mongoSetup');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

// Routes
const indexRouter = require('./routes/index');
const insuranceRouter = require('./routes/insurance');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(cors({credentials: true, origin: true}));
app.options('*', cors())

// Use routes
app.use('/', indexRouter);
app.use('/', insuranceRouter);

const port = normalizePort(process.env.PORT || '3001');
let server = httpServer.createServer(app);

app.on("ready", () => {
    server.listen(port);
    console.log(`The Quoting fun has started on port ${port}.`);
});

const mongoPromise = mongo.setup('mongodb+srv://deploymentService_load:FatBigMeerkat@loadquoting-1-z7nhh.mongodb.net/quoting?authSource=admin&replicaSet=loadQuoting-1-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true');

mongoPromise.then(resolved => {
        console.log('Ready!');
        app.emit('ready');
    })
    .catch((err) => {
        console.error(err);
        console.error('Exiting the Deployment Service...');
        process.exit(2);
    });

module.exports = server;