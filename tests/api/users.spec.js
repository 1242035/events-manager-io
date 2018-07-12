import { expect } from 'chai';
import request from 'supertest';
import bcrypt from 'bcrypt';
import server from '../../server/server';
import { User } from '../../server/models';

const hash = bcrypt.hashSync;

const createUser = () => {
  User.create({
    username: 'john', email: 'john@gmail.com', password: hash('johnp', 10), fullname: 'John', admin: false,
  });
};

describe('Users', () => {
  before((done) => {
    createUser();
    done();
  });

  /* SIGNUP */
  it('(POST /api/v1/users) should return 201 if successful', (done) => {
    const userSignup = {
      username: 'james', password: 'james', email: 'james@yahoo.com', fullname: 'James',
    };
    request(server)
      .post('/api/v1/users')
      .send(userSignup)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.user.id).to.be.an('number');
        expect(res.body.user).to.not.have.any.keys('password');
        expect(res.body.user.username).to.equal('james');
        expect(res.body.user.email).to.equal('james@yahoo.com');
        expect(res.body.user.admin).to.equal(false);
        expect(res.body.message).to.equal('User created!');
        done();
      });
  });

  it('(POST /api/v1/users) should return 409 if username already exists', (done) => {
    const userSignup = {
      username: 'john', password: 'jegede', email: 'jegede@yahoo.com', fullname: 'Jegede',
    };
    request(server)
      .post('/api/v1/users')
      .send(userSignup)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message).to.equal('Username has been taken!');
        done();
      });
  });

  it('(POST /api/v1/users) should 409 if email already exists', (done) => {
    const userSignup = {
      username: 'bassey', password: 'bassey', email: 'john@gmail.com', fullname: 'Bassey',
    };
    request(server)
      .post('/api/v1/users')
      .send(userSignup)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message).to.equal('Email has been taken!');
        done();
      });
  });

  it('(POST /api/v1/users) should return 400 if email is not valid', (done) => {
    const userSignup = {
      username: 'bisi', password: 'bisip', email: 'bisi', fullname: 'Bisi',
    };
    request(server)
      .post('/api/v1/users')
      .send(userSignup)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Invalid email!');
        done();
      });
  });

  /* LOGIN */
  it('(POST /api/v1/users/login) should 200 if credentials valid', (done) => {
    const userLogin = {
      username: 'john', password: 'johnp',
    };
    request(server)
      .post('/api/v1/users/login')
      .send(userLogin)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.user.id).to.be.an('number');
        expect(res.body.user).to.not.have.any.keys('password');
        expect(res.body.user.username).to.equal('john');
        expect(res.body.user.email).to.equal('john@gmail.com');
        expect(res.body.user.admin).to.equal(false);
        expect(res.body.message).to.equal('User logged in!');
        done();
      });
  });

  it('(POST /api/v1/users/login) should 401 if username does not exist', (done) => {
    const userLogin = {
      username: 'xxxxx', password: 'johnp',
    };
    request(server)
      .post('/api/v1/users/login')
      .send(userLogin)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('Wrong password or username!');
        done();
      });
  });

  it('(POST /api/v1/users/login) should 401 if password is invalid', (done) => {
    const userLogin = {
      username: 'john', password: 'xxxxx',
    };
    request(server)
      .post('/api/v1/users/login')
      .send(userLogin)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('Wrong password or username!');
        done();
      });
  });
});
