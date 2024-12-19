const request = require('supertest');
const app = require('./app');  // Import the app without starting the server

describe('GET /', () => {
  it('should return Hello World', async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Hello World');
  });
});
