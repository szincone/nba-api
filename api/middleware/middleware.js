"use strict";
// dependencies
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
// routes
const playerRoutes = require("../routes/playerRoutes.js");
// middleware
const { errorHandler } = require("./errorHandler.js");

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(morgan("dev"));
  server.use("/api/players", playerRoutes);
  server.use(errorHandler);
};
