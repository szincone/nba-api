require('dotenv').config();
const express = require('express');

const server = express();

// middleware
const configureMiddleware = require('./middleware/middleware.js');

configureMiddleware(server);

const PORT = process.env.PORT || 9000;

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
