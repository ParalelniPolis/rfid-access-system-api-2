const request = require('supertest');
const app = require('../app.js');

describe('GET /login', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/login')
      .expect(200, done);
  });
});

describe('GET /signup', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/signup')
      .expect(200, done);
  });
});

describe('GET /locks', () => {
  it('should return 302 Found', (done) => {
    request(app)
      .get('/locks')
      .expect(302, done);
  });
});

describe('GET /cards', () => {
  it('should return 302 Found', (done) => {
    request(app)
      .get('/cards')
      .expect(302, done);
  });
});

describe('GET /access-log', () => {
  it('should return 302 Found', (done) => {
    request(app)
      .get('/access-log')
      .expect(302, done);
  });
});

describe('GET /random-url', () => {
  it('should return 404', (done) => {
    request(app)
      .get('/reset')
      .expect(404, done);
  });
});
