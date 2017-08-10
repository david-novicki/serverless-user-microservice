'use strict';
const mongoose = require('mongoose');
const mongoURL = '<insert mongo connection string here>';
const options = {
  promiseLibrary: global.Promise,
  useMongoClient: true
};
const User = require('./models/user.js');

module.exports.getUser = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;//defaults to true and will result in timeout
  let response = {
    isBase64Encoded: false,
    statusCode: 200,
    headers: null,
    body: null
  }
  const email = event.pathParameters.email;
  const promise = mongoose.connect(mongoURL, options);
  promise.then(() => {
    User.findOne({ email: email }).then((results) => {
      response.body = JSON.stringify({ user: results})
      callback(null, response);
    });
  }).catch((err) => {
    callback(err);
  });
}
module.exports.saveUser = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let response = {
    isBase64Encoded: false,
    statusCode: 200,
    headers: null,
    body: null
  }
  let data = JSON.parse(event.body) || {};
  const promise = mongoose.connect(mongoURL, options);
  promise.then(() => {
    let user = new User({
      email: data.email
    });
    return user.save();
  }).then(() => {
    response.body = JSON.stringify({ message: 'saved'})
    callback(null, response);
  }).catch(error => {
    callback(error);
  })
}
