// app.test.js
const request = require('supertest');
const app = require('./app');  // Import the app (Express server)

describe('GET /', () => {
  it('should return Hello World', async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Hello World');
  });
});
