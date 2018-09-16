"use strict";
const express = require("express");
const server = new express();

// middleware
const configureMiddleware = require("./middleware/middleware.js");
configureMiddleware(server);

const PORT = 9000;

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
