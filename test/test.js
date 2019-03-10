const assert = require('assert');
chai = require('chai'),
	fs = require("fs"),
	server = require("../app.js"),
	chaiHttp = require('chai-http');

chai.use(chaiHttp);

// Test cases for creating and getting student api
describe('/POST student', function () {
	setTimeout(function () {
		it('successfully creating the student', function (done) {
			this.timeout(5000);
			chai.request(server).post('/api/student').set('content-type', 'application/json')
			.send({
				"firstName": "Test",
				"lastName": "User",
				"address": "Test Address"
				}).end(function (err, res) {
					if(err){
						return console.error(err);
					}
				assert.equal(res.body.success, true);
				chai.request(server).get('/api/student').end(function (err, res) {
					assert.equal(res.body.success, true);
					done();
				});
			});
		});
	});
});


// Test cases for search API

describe('/GET search Student', function () {
	it('successfully getting the result', function (done) {
		// this.timeout(3000);
		chai.request(server).get('/api/student/search/test').end(function (err, res) {
			if(err)
				console.error(err);
			assert.equal(res.body.success, true);
			done();
		});
	});
});