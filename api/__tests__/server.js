const request = require('supertest');
const express = require('express');
const configureMiddleware = require('../middleware/middleware.js');

const server = express();

configureMiddleware(server);

describe('server.js', () => {
  test('runs the tests', () => {
    expect(true).toBeTruthy();
  });

  describe('GET /', () => {
    test('returns a 200 (OK) status code', async () => {
      const response = await request(server).get('/api/players');
      expect(response.status).toEqual(200);
    });
  });
});
