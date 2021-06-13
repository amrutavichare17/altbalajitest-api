 // Endpoint testing with mocha and chai and chai-http

// Import libraries
    const chai = require('chai');
    const chaiHttp = require('chai-http');
    const should = chai.should();
    var mongoose = require("mongoose");
    const token='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFtcnV0YXZpY2hhcmUxN0BnbWFpbC5jb20iLCJwYXNzd29yZCI6ImFtcnV0YUAxMjMiLCJpYXQiOjE2MjM1NTk2MzAsImV4cCI6MTYyMzkwNTIzMH0.jL-rIEAyolpfomStOfZ3ds_dVruklo4KFxsDoQLP09o';
    // Import server
    var server = require('../server');

    chai.use(chaiHttp);

    describe('User API', function() {

        it('Create All User', function(done) {
            chai.request(server)

                // create all users request
                .post('/api/users')
                // for now is static i am using we can create also using method
                .set('Authorization', token)
                // send all users data. 
                //If you got error of duplicate entry please change id of following data because id is unique
                .send(
                    [{
                        "id":4,
                        "name":"Amruta Vichare",
                        "dob":"17/03/1993",
                        "address":"A-104 Center Plaza Miraroad Thane",
                        "state":"Maharashtra"
                    },{
                        "id":5,
                        "name":"Ashish Vichare",
                        "dob":"05/02/1995",
                        "address":"A-104 Center Plaza Miraroad Thane",
                        "state":"Maharashtra"
                    }]
                ) // this is like sending $http.post or this.http.post in Angular
                .end((err, res) => { // when we get a resonse from the endpoint
                    console.log(err);
                    // in other words,
                    // the res object should have a status of 200
                    res.should.have.status(200);
                    res.body.should.have.property('message');
                    res.body.message.should.equal('User created successfully');
                    done();
                })
        })
        it('Get All Users', function(done) {
            chai.request(server)

                // Get all users request
                .get('/api/users')
                // for now is static i am using we can create also using method
                .set('Authorization', token)
                 // this is like sending $http.post or this.http.post in Angular
                .end((err, res) => { // when we get a resonse from the endpoint
                    console.log(err);
                    // in other words,
                    // the res object should have a status of 200
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.have.property('message');
                    res.body.message.should.equal('User fetch successfully');
                    done();
                })
        })
        it('Get User By Id', function(done) {
            chai.request(server)

                // Get user by id request
                .get('/api/users/1')
                // for now is static i am using we can create also using method
                .set('Authorization', token)
                 // this is like sending $http.post or this.http.post in Angular
                .end((err, res) => { // when we get a resonse from the endpoint
                    console.log(err);
                    // in other words,
                    // the res object should have a status of 200
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.have.property('message');
                    res.body.message.should.equal('User fetch successfully');
                    done();
                })
        })
        it('Delete User By Id', function(done) {
            chai.request(server)

                // Delete user by id request
                .delete('/api/users/4')
                // for now is static i am using we can create also using method
                .set('Authorization', token)
                 // this is like sending $http.post or this.http.post in Angular
                .end((err, res) => { // when we get a resonse from the endpoint
                    console.log(err);
                    // in other words,
                    // the res object should have a status of 200
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.have.property('message');
                    res.body.message.should.equal('User deleted successfully');
                    done();
                })
        })
        it('Update User By Id', function(done) {
            chai.request(server)

                // Delete user by id request
                .put('/api/users/5')
                // for now is static i am using we can create also using method
                .set('Authorization', token)
                // send all users data
                .send(
                    {
                        "name":"Akashay Jadhav",
                        "dob":"22/08/1996",
                        "address":"A-105 Axis Plaza Bhyandar Thane",
                        "state":"Goa"
                    }
                ) 
                .end((err, res) => { // when we get a resonse from the endpoint
                    console.log(err);
                    // in other words,
                    // the res object should have a status of 200
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.have.property('message');
                    res.body.message.should.equal('User updated successfully');
                    done();
                })
        })
    })
