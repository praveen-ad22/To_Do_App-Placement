const passport = require('passport')
const googleStrategy = require('passport-google-oauth20')
const User = require('../model/User')

passport.use(
  new googleStrategy(
    {
      callbackURL:
        'https://to-do-app-api-swart.vercel.app/auth/google/redirect',
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
    },
    async (acessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ email: profile.emails[0].value })
        if (user) {
          return done(null, user)
        }
        const newuser = new User({
          username: profile.displayName,
          email: profile.emails[0].value,
          profile: profile.photos[0].value,
        })
        await newuser.save()
        done(null, newuser)
      } catch (error) {
        done(error, null)
      }
    }
  )
)
