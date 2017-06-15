const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const should = chai.should();

const {User} = require('../models/user');
const {app, runServer, closeServer} = require('../app');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);
const request = require('supertest');
const api = request(app);
const authUser = request.agent(app);

function tearDownDb() {
	console.warn('Deleting database');
	return mongoose.connection.dropDatabase();
}

describe('Tests', function() {
  	this.timeout(15000);

	before(function() {
		return runServer(TEST_DATABASE_URL); 
	});

	after(function() {
		tearDownDb();
		return closeServer();
	});

	describe('testing user authentication', () => {
		it('should create a user', () => {
			return api
				.post('/register')
				.send({username:'dax2000', password: 'test'})
				.expect(302)
		});
	});
});









