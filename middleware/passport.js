const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const { secret } = require('../config.js')
const options = {}

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = secret

module.exports = new JwtStrategy(options, (jwt_payload, done) => {
  if (jwt_payload.username) {
    return done(null, true)
  }
  return done(null, false)
})
