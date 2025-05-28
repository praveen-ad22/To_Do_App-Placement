const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()

require('../middleware/passport') // Make sure this file sets up passport strategies
const verifyToken = require('../middleware/verifyToken')
const authRoutes = require('../Routes/authRoutes')
const taskRoutes = require('../Routes/TaskRoute')

const app = express()

// Helmet for securing HTTP headers
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false, // Disabled for compatibility with Vercel + Google OAuth
  })
)

// JSON body parsing
app.use(express.json())

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL?.replace(/\/$/, ''), // Remove trailing slash if any
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
)

// Initialize passport
app.use(passport.initialize())

// Root route
app.get('/', (req, res) => {
  res.send('To-Do App API is running')
})

// Auth and Task routes
app.use('/auth', authRoutes)
app.use('/tasks', verifyToken, taskRoutes)

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server is running on port ${process.env.PORT || 5000}`)
    })
  )
  .catch((err) => console.error('❌ MongoDB connection error:', err))

