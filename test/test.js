const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

const should = chai.should();
const expect = chai.expect; //include globally

const {User} = require('../models/user');
const {Qna} = require('../models/qna');
const {app, runServer, closeServer} = require('../app');
const {TEST_DATABASE_URL} = require('../config');
const middleware = require("../middleware/index");//Used??

chai.use(chaiHttp);
const request = require('supertest');
const api = request(app);
const authUser = request.agent(app);

const totalQuestions = 10

function seedQnaData() {
	console.info('seeding QnA data');
	const seedData = [];

	for (let i=1; i<=totalQuestions; i++) {
		seedData.push(generateQnaData());
	}
	// this will return a promise
	return Qna.insertMany(seedData).catch((e)=>console.error(e));
}

function generateQnaData() {
	return {
		question: faker.lorem.sentence(),
		category: faker.lorem.word(),
		answer: faker.lorem.paragraph(),
		source: faker.internet.domainName(),
		author: {
			username: faker.internet.userName()
		}
	}
}

function tearDownDb() {
	console.warn('Deleting database');

	return mongoose.connection.dropDatabase().catch((e)=>console.error(e));
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

	describe('GET endpoint', function(done) {
		it('should return all existing QnAs', function() {
			return api
			.get('/')
			.expect(function(_res) {
				let res = _res.text,
				cards = res.match(/div class="card"/g);

				if(!_res.status === 200){ throw new Error('not a 200 status: ' + _res.status) }
			})
		});

		it('should return QnA with correct fields', function(done) {
			Qna.find() //promise only, no callbacks
			.then(
				(res)=>{
					let fieldObj = res[0].toObject(); //https://stackoverflow.com/questions/28442920/mongoose-find-method-returns-object-with-unwanted-properties
					fieldObj.should.have.all.keys('__v', '_id', 'question', 'category', 'author', 'answer', 'source');
					done();
				}
				)
			.catch( (e)=> { done(e); } ) //catch & done to remove terminal warning
		});
	});

	describe('POST endpoint', () => {
		it('should create new QnA!!', () => {
			return authUser
			.post('/login')
			.send({username: 'dax2000', password: 'test'})
			.expect(302)	
			.then(res => {
				return authUser
				.post('/new')
				.send({
					question: faker.lorem.sentence(),
					category: faker.lorem.word(),
					answer: faker.lorem.paragraph(),
					source: faker.internet.domainName(),
					author: {
						id: authUser._id,
						username: authUser.username
					}
				})
				.expect(302)
			})
			.catch(err => {
				if (err) console.log('Something went wrong: ' + err)
			});
		});
	});

	describe('DELETE endpoint', () => {
		it('should delete a QnA', () => {
			return authUser
			.post('/login')
			.send({username: 'dax2000', password: 'test'})
			.expect(302)	
			.then(res => {
				return authUser
				.delete('/:id')
				.expect(302)
			})
			.catch(err => {
				if (err) console.log('Something went wrong: ' + err)
			});
		})
	})

});
