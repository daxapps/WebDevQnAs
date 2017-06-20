const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

const should = chai.should();

const {User} = require('./models/user');
const {Qna} = require('./models/qna');
const {app, runServer, closeServer} = require('../app');
const {TEST_DATABASE_URL} = require('../config');
const middleware = require("../middleware/index");

chai.use(chaiHttp);
const request = require('supertest');
const api = request(app);
const authUser = request.agent(app);

function seedQnaData() {
	console.info('seeding QnA data');
	const seedData = [];

	for (let i=1; i<=10; i++) {
		seedData.push(generateQnaData());
	}
	// this will return a promise
	return Qna.insertMany(seedData);
}


function generateQnaData() {
	return {
		question: faker.lorem.sentence(),
		answer: faker.lorem.paragraph(),
		source: faker.internet.domainName(),
		author: {
			// id: faker.random.number(),
			username: faker.internet.userName()
		}
	}
}

function tearDownDb() {
	console.warn('Deleting database');
	
	return mongoose.connection.dropDatabase();
}

describe('Tests', function() {
  	this.timeout(15000);

	before(function() {
  		console.log("test DB: " + TEST_DATABASE_URL)
		return runServer(TEST_DATABASE_URL); 
	});

	beforeEach(function() {
		return seedQnaData();
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

	describe('GET endpoint', function() {
		it('should return all existing QnAs', function() {
			let res;
			return api
			.get('/')
			.then(function(_res) {
				res = _res;
				res.should.have.status(200);
				// res.body.should.have.length.of.at.least(1);
				return Qna.count();
			})
				// .then(count => {
				// 	res.body.should.have.length.of(count);
				// })
			});

		it('should return QnAs with right fields', function() {
			let resQnas;
			return api
			.get('/')
			.then(function(res) {
				res.should.have.status(200);
				// res.should.be.json;
				// res.body.should.be.a('array');
				// res.body.should.have.length.of.at.least(1);

				res.body.forEach(function(question) {
					post.should.be.a('object');
					post.should.include.keys(
						'id', 'question', 'author', 'answer', 'source');
				});
				resQnas = res.body[0];
				return Qna.findById(qnas.id);
			})
			.then(function(question) {
				resQnas.id.should.equal(question.id);
				resQnas.question.should.equal(question.question);
				resQnas.author.should.equal(question.author.username);
				resQnas.answer.should.equal(question.answer);
				resQnas.source.should.equal(question.source);
			});
		});
	});
});









