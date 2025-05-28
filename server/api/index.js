const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()

require('../middleware/passport')
const verifyToken = require('../middleware/verifyToken')
const authRoutes = require('../Routes/authRoutes')
const taskRoutes = require('../Routes/TaskRoute')

const app = express()

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false, // Disable if CSP conflicts with Vercel or Google OAuth
  })
)

app.use(express.json())

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
)

app.use(passport.initialize())

// Routes
app.get('/', (req, res) => {
<<<<<<< HEAD
  res.send('To-Do App API is running');
});
=======
  res.send('To-Do App API is running')
})
>>>>>>> 0ee0280 (modified)
app.use('/auth', authRoutes)
app.use('/tasks', verifyToken, taskRoutes)

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err))

// Export for Vercel
module.exports = app
