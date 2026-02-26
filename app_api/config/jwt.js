const { expressjwt: jwt } = require('express-jwt');

const auth = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'payload'
});

module.exports = {
  auth
};