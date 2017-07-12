const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

const should = chai.should();

const {User} = require('../models/user');
const {Qna} = require('../models/qna');
const {app, runServer, closeServer} = require('../app');
const {TEST_DATABASE_URL} = require('../config');
const middleware = require("../middleware/index");//Used??

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
		seedQnaData();
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
				return Qna.count();
			})
		});

		it('should return QnAs with correct fields', function() {
			Qna.find({}, function(err, questions){
				questions.should.have.length.of.at.least(1);
				questions.forEach(function(question) {
					question.should.be.a('object');
					// console.log('QUESTION: ', question)
					question.should.include.keys(
						'id', 'question', 'author', 'answer', 'source');
				});
				resQnas = questions[0];
			})
		});
	});

	describe('testing create new QnA', () => {
		it('should create new QnA!!', () => {
			console.log('TESTING')
			api
				.post('/login')
				.send({username: 'dax2000', password: 'test'})
				.then(res => {
					expect(res).to.have.status(200);
					done()
					res
						.post('/new')
						.send({
							question: faker.lorem.sentence(),
							answer: faker.lorem.paragraph(),
							source: faker.internet.domainName()
						})
						.expect(302)
						.then(res => {
							console.log('RES: ', res)
						})
				})
				.then(res => {
					// for(let key in res){ console.log(':',key) };
					console.log('qna: ', res.res)
					return res
						.findOne({username: 'dax2000'})
						.exec()
						.then(qnas => {
							describe('QnA exist', () => {
								it('QnA should have user', () => {
									console.log('QNA Author: ', qna.author.username)
									qnas.author.should.not.have.length(0)
								})
							})
						 })
				})
				
		})
	})

});









