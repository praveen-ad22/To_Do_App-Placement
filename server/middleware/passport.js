const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../model/User')

passport.use(
  new GoogleStrategy(
    {
      callbackURL:
        'https://to-do-app-placement-1.onrender.com/auth/google/redirect',
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        if (!profile.emails || !profile.photos) {
          return done(new Error('Missing email or photo from Google'), null)
        }

        const user = await User.findOne({ email: profile.emails[0].value })
        if (user) {
          return done(null, user)
        }

        const newUser = new User({
          username: profile.displayName,
          email: profile.emails[0].value,
          profile: profile.photos[0].value,
        })

        await newUser.save()
        done(null, newUser)
      } catch (error) {
        console.error('Passport Strategy Error:', error)
        done(error, null)
      }
    }
  )
)
