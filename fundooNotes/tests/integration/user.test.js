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
    const userDetails = {
      firstName: 'kushukVishnu',
      lastName: 'MS',
      email: 'kushu6@gmail.com',
      password: '123456'
    };
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
    const userDetails = {
      firstName: 'kus',
      lastName: 'MS',
      email: 'kushu6@gmail.com',
      password: '123456'
    };
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
    const userDetails = {
      firstName: 'kus',
      lastName: 'MS',
      email: 'kushu6gmail.com',
      password: '123456'
    };
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
    const userDetails = {
      firstName: 'kus',
      lastName: 'MS',
      email: 'kushu6@gmail.com',
      password: '123'
    };
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
    const loginDetails = {
      email: 'kushu6@gmail.com',
      password: '123456'
    };
    it('Given unregistered user login details should not get logged in', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(loginDetails)
        .end((err, res) => {
          token=res.body.data
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });

  // 6 Test case for login with invalid email
  describe('UserLogin', () => {
    const loginDetails = {
      email: 'kushu6gmail.com',
      password: '123456'
    };
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
    const loginDetails = {
      email: 'kushu6gmail.com',
      password: '12'
    };
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
    const loginDetails = {
      email: 'kushu6gmail.com',
      password: ''
    };
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
    const loginDetails = {
      email: 'kushu6gmail.com',
      password: '124545'
    };
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

  // using note api
  var token;
  var _id;

  // 10 Test case for create note
  describe('createNote', () => {
    const noteBody = {
      title: 'test656',
      description: 'testing3',
      color: 'testcolor3'
    };
    it('Given note details should be saved in database', (done) => {
      request(app)
        .post('/api/v1/note/create')
        .set('Authorization', `Bearer ${token}`)
        .send(noteBody)
        .end((err, res) => {
          _id = res.body.data._id;
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });

   //Test case for update note by ID with authorization
   describe(' Update note by id ', () => {
    it('Given authorization updating note by ID should successful and return status code 202', (done) => {
      const noteBody = {
        title: "Javascript concept",
        description: "Basic",
        color: 'testcolor3'
      }
      request(app)
        .put(`/api/v1/note/${_id}`)
        .set('authorization', `Bearer ${token}`)
        .send(noteBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(202);
          done();
        });
    });
  });

   // 11 Test case for create note without authorization
  //  describe('createNote', () => {
  //   it('Given creating note without authorization should not saved in database', (done) => {
  //     const noteBody = {
  //       title: "Java Basics",
  //       description: "Concept"
  //     }
  //     request(app)
  //       .post('/api/v1/note/create')
  //       .send(noteBody)
  //       .end((err, res) => {
  //         expect(res.statusCode).to.be.equal(400);
  //         done();
  //       });
  //   });
  // });

   // 12 Test case for get all notes with authorization
  //  describe('Get all note', () => {
  //   it('Given valid authorization getting all notes successfully should return status code 201', (done) => {
  //     request(app)
  //       .get('/api/v1/note/allNote')
  //       .set('authorization', `Bearer ${token}`)
        
  //       .end((err, res) => {
  //         _id = res.body.data._id;
  //         expect(res.statusCode).to.be.equal(201);
  //         done();
  //       });
  //   });
  // });

  

   // 13 Test case for get note by ID with authorization
  //  describe(' Get note by id', () => {
  //   it('Given valid authorization get note by id successfully done should return status code 201', (done) => {
  //     request(app)
  //       .get(`/api/v1/note/${_id}`)
  //       .set('authorization', `Bearer ${token}`)
  //       .end((err, res) => {
  //         _id = res.body.data._id;
  //         expect(res.statusCode).to.be.equal(201);
  //         done();
  //       });
  //   });
  // });


    // 16 - Test case for get note by ID without authorization
    // describe(' Get note by id', () => {
    //   it('Given invalid authorization get note by id successfully done should return status code 400', (done) => {
    //     request(app)
    //       .get(`/api/v1/note/${_id}`)
    //       .end((err, res) => {
    //         expect(res.statusCode).to.be.equal(400);
    //         done();
    //       });
    //   });
    // });

    //Test case for update note by ID with authorization
  // describe(' Update note by id ', () => {
  //   it('Given authorization updating note by ID should successful and return status code 202', (done) => {
  //     const noteBody = {
  //       title: "cascading stail sheet",
  //       description: "Basic",
  //       color: 'testcolor3'
  //     }
  //     request(app)
  //       .put(`/api/v1/note/${_id}`)
  //       .set('authorization', `Bearer ${token}`)
  //       .send(noteBody)
  //       .end((err, res) => {
  //         expect(res.statusCode).to.be.equal(202);
  //         done();
  //       });
  //   });
  // });

    // 21 - Test case for delete note by ID with authorization
    describe(' Delete note by id ', () => {
      it('Given authorization delete note by ID should successful and return status code 200', (done) => {
        request(app)
          .delete(`/api/v1/note/${_id}`)
          .set('authorization', `Bearer ${token}`)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });
    });

 //Test case for delete note by ID without authorization
 describe('delete note by id', () => {
  it('Given authorization updating note by ID should fail and return status code 400', (done) => {
    request(app)
      .delete(`/api/v1/note/${_id}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        done();
      });
  });
});

//Test case for archive note by ID with authorization
describe(' Archive note by id with authorization ', () => {
  it('Given valid id archive note by ID successfully complete should return status code 202', (done) => {
    request(app)
      .put(`/api/v1/note/${_id}/archive`)
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(202);
        done();
      });
  });
});

 //Test case for archive note by ID with invalid id
 describe(' Archive note by id with authorization ', () => {
  it('Given valid id archive note by ID successfully complete should return status code 500', (done) => {
    request(app)
      .put(`/api/v1/note/sdhgfisefgiaw/archive`)
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
  });
});

 //Test case for archive note by ID without authorization
 describe(' Archive note by id with authorization ', () => {
  it('Given valid id archive note by ID successfully complete should return status code 400', (done) => {
    request(app)
      .put(`/api/v1/note/${_id}/archive`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        done();
      });
  });
});

//Test case for trash note by ID with authorization
describe('Trash note by id', () => {
  it('Given valid id trash note by ID successfully complete should return status code 202', (done) => {
    request(app)
      .put(`/api/v1/note/${_id}/trash`)
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(202);
        done();
      });
  });
});

//Test case for trash note by ID with invalid id
describe('Trash note by id', () => {
  it('Given valid id trash note by ID successfully complete should return status code 500', (done) => {
    request(app)
      .put(`/api/v1/note/jshkfh,afa/trash`)
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
  });
});

//Test case for trash note by ID without authorization
describe('Trash note by id', () => {
  it('Given valid id trash note by ID successfully complete should return status code 500', (done) => {
    request(app)
      .put(`/api/v1/note/jshkfh,afa/trash`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        done();
      });
  });
});

});
