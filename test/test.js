const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const middleware = require("../middleware/index");

const should = chai.should();

const {User, Qna} = require('../models/user');
const {app, runServer, closeServer} = require('../app');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);
const request = require('supertest');
const api = request(app);
const authUser = request.agent(app);

function tearDownDb() {
	console.warn('Deleting database');
	console.log("#####" + mongoose.connection)
	return mongoose.connection.dropDatabase();
}

describe('Tests', function() {
  	this.timeout(15000);

	before(function() {
  		console.log("test DB: " + TEST_DATABASE_URL)

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

	describe('login a user', () => {
		it('should login a user', () => {
			return api
				.post('/login')
				.send({username: 'dax2000', password: 'test'})
				.expect(302)
		});
	});
});









