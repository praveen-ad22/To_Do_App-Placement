const express = require('express')
const router = express.Router()
const passport = require('passport')
const { googleAuth } = require('../controller/auth')

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
)

router.get('/google/redirect', (req, res, next) => {
  passport.authenticate('google', { session: false }, (err, user, info) => {
    if (err) {
      console.error('Passport authentication error:', err)
      return res.status(500).json({ error: 'Authentication error', details: err.message })
    }
    if (!user) {
      console.warn('No user returned from Google OAuth:', info)
      return res.status(401).json({ error: 'User not authenticated' })
    }

    req.user = user
    next()
  })(req, res, next)
}, googleAuth)

module.exports = router
