const request = require('supertest');
const express = require('express');

const server = express();
const configureMiddleware = require('../middleware/middleware.js');

configureMiddleware(server);

describe('server.js', () => {
  test('runs the tests', () => {
    expect(true).toBeTruthy();
  });
});
