const jwt = require('jsonwebtoken')

const googleAuth = async (req, res) => {
  if (!req.user) {
    return res.status(400).json({ message: 'Account not found' })
  }

  const user = req.user

  const accessToken = jwt.sign(
    {
      userId: user._id,
      username: user.username,
    },
    process.env.JWTSecret,
    { expiresIn: '1h' }
  )

  res.redirect(`https://to-do-app-placement.vercel.app/?token=${accessToken}`)
}

module.exports = { googleAuth }
