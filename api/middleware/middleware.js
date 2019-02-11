const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const playerRoutes = require('../routes/playerRoutes.js');
const { errorHandler } = require('./errorHandler.js');

module.exports = (server) => {
  server.use(helmet());
  server.use(express.json());
  server.use(morgan('dev'));
  server.use('/api/players', playerRoutes);
  server.use(errorHandler);
};
