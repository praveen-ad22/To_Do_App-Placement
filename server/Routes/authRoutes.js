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

router.get(
  '/google/redirect',
  passport.authenticate('google', {
    session: false,
  }),
  googleAuth
)
module.exports = router
