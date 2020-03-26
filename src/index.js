'use strict';
// ================================================
//
// Modules
//
// ================================================
require('./config/config');

const express = require('express');

const config = require('./server/config');

const app = config(express());

const http = require('http').createServer(app);

// ================================================
//
// Run Server
//
// ================================================

const server = http.listen(process.env.PORT, () =>{
  console.log(`Listening on PORT: ${process.env.PORT}`);
});

const io = require('./socket').init(server);

io.on('connection', socket=>{
  console.log(`New connection ${socket.id}`);
});
