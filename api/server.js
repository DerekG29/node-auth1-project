const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require('express-session');
const { ConnectSessionKnexStore } = require('connect-session-knex');
const usersRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session({
  name: 'chocolatechip',
  secret: process.env.SECRET_KEY || 'this is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: false,
  },
  rolling: true,
  resave: true,
  saveUninitialized: false,
  store: new ConnectSessionKnexStore({
    knex: require('../data/db-config'),
    createTable: true,
    clearInterval: 1000 * 60 * 60,
  })
}));

server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);

server.get("/", (req, res) => { 
  res.json({ api: "up" });
});

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
