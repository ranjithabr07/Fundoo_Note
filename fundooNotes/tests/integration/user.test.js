import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

 

// 1 Test case for user registration with valid data
describe('UserRegistration', () => {
  const userDetails={
    "firstName":"kushukVishnu",
    "lastName":"MS",
    "email":"kushu6@gmail.com",
    "password":"123456"
  }
  it('Given user registration details should be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/register')
      .send(userDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(201);
        done();
      });
    });
  });

  // 2 Testcase for invalid firstname having less than 4 characters
describe('UserRegistration', () => {
  const userDetails={
    "firstName":"kus",
    "lastName":"MS",
    "email":"kushu6@gmail.com",
    "password":"123456"
  }
  it('Given user registration details should not be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/register')
      .send(userDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        done();
      });
    });
  });

  // 3 Testcase for invalid email,
describe('UserRegistration', () => {
  const userDetails={
    "firstName":"kus",
    "lastName":"MS",
    "email":"kushu6gmail.com",
    "password":"123456"
  }
  it('Given user registration details should not be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/register')
      .send(userDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        done();
      });
    });
  });

   // 4 Testcase for invalid password,
describe('UserRegistration', () => {
  const userDetails={
    "firstName":"kus",
    "lastName":"MS",
    "email":"kushu6@gmail.com",
    "password":"123"
  }
  it('Given user registration details should not be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/register')
      .send(userDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        done();
      });
    });
  });

  // 5 Test case for login with invalid email
describe('UserLogin', () => {
  const loginDetails={
    "email":"kushu6@gmail.com",
    "password":"123456"
  }
  it('Given unregistered user login details should not get logged in', (done) => {
    request(app)
      .post('/api/v1/users/login')
      .send(loginDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
  });

   // 6 Test case for login with invalid email
describe('UserLogin', () => {
  const loginDetails={
    "email":"kushu6gmail.com",
    "password":"123456"
  }
  it('Given unregistered user login details should not get logged in', (done) => {
    request(app)
      .post('/api/v1/users/login')
      .send(loginDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
    });
  });

    // 7 Test case for login with invalid password
describe('UserLogin', () => {
  const loginDetails={
    "email":"kushu6gmail.com",
    "password":"12"
  }
  it('Given unregistered user login details should not get logged in', (done) => {
    request(app)
      .post('/api/v1/users/login')
      .send(loginDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
    });
  });

    // 8 Test case for login with invalid password
describe('UserLogin', () => {
  const loginDetails={
    "email":"kushu6gmail.com",
    "password":""
  }
  it('Given unregistered user login details should not get logged in', (done) => {
    request(app)
      .post('/api/v1/users/login')
      .send(loginDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
    });
  });

    // 9 Test case for login with invalid password
describe('UserLogin', () => {
  const loginDetails={
    "email":"kushu6gmail.com",
    "password":"124545"
  }
  it('Given unregistered user login details should not get logged in', (done) => {
    request(app)
      .post('/api/v1/users/login')
      .send(loginDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
    });
  });


});
