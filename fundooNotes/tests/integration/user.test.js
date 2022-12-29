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

 

//Testcase for invalid firstname having less than 4 characters
describe('UserRegistration', () => {
  const userDetails={
    "firstname":"Rit",
    "lastname":"Patil",
    "email":"ranju@gmail.com",
    "password":"ranjua@1234"
  }
  it('Given user registration details should not be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/register')
      .send(userDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
    });
  });

//Testcase for invalid firstname,first letter is not capital
describe('UserRegistration', () => {
  const userDetails={
    "firstname":"ritu",
    "lastname":"Patil",
    "email":"ranju@gmail.com",
    "password":"ranju@1234"
  }
  it('Given user registration details should not be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/register')
      .send(userDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
    });
  });

//Testcase for invalid lastname,having less than 4 characters
describe('UserRegistration', () => {
  const userDetails={
      "firstname":"ranju",
      "lastname":"Pat",
      "email":"ranju@gmail.com",
      "password":"ranju@1234"
  }
  it('Given user registration details should not be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/register')
      .send(userDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
    });
  });

//Testcase for invalid lastname,,first letter is not capital
describe('UserRegistration', () => {
  const userDetails={
      "firstname":"ranju",
      "lastname":"pati",
      "email":"ranju@gmail.com",
      "password":"ranju@1234"
  }
  it('Given user registration details should not be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/register')
      .send(userDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
    });
  });

//Testcase for invalid email
describe('UserRegistration', () => {
  const userDetails={
      "firstname":"ranju",
      "lastname":"Patil",
      "email":"ranjugmail.com",
      "password":"ranju@1234"
  }
  it('Given user registration details should not be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/register')
      .send(userDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
    });
  });

//Test case for login with invalid email
describe('UserLogin', () => {
  const loginDetails={
    "email":"ritz@gmail.com",
    "password":"Ritz@1234"
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

//Test case for login with invalid password
describe('UserLogin', () => {
  const loginDetails={
    "email":"shraddha123@gmail.com",
    "password":"shar1234"
  }
  it('Given invalid password login details should not get logged in', (done) => {
    request(app)
      .post('/api/v1/users/login')
      .send(loginDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
    });
  });

//Test case for login with password data not found
describe('UserLogin', () => {
  const loginDetails={
    "email":"Sivkapoor@gmail.com",
    "password":""
  }
  it('Given invalid password login details should not get logged in', (done) => {
    request(app)
      .post('/api/v1/users/login')
      .send(loginDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
    });
  });

//10.Test case for login with password data not found
/*describe('UserLogin', () => {
  const loginDetails={
    "email":"Sivkapoor@gmail.com",
    "password":"Shivansh@12"
  }
  it('Given invalid password login details should not get logged in', (done) => {
    request(app)
      .post('/api/v1/users/login')
      .send(loginDetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(201);
        done();
      });
    });
  });*/
});

});
