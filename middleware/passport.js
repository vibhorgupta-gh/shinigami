const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const { secret } = require('../config.js')
const options = {}

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = secret

/**
 * jwt passport strategy for authentication
 * @param {Object} options - authentication options
 * @param {function} callback returning payload after authentication
 * @return done object containing user data
 */
module.exports = new JwtStrategy(options, (payload, done) => {
  if (payload.username) {
    return done(null, true)
  }
  return done(null, false)
})
