require('dotenv').config();
const express = require('express');
const configureMiddleware = require('./middleware/middleware.js');

const server = express();

configureMiddleware(server);

const PORT = process.env.PORT || 9000;

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
