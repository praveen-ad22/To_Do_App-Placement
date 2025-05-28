# To_Do_App-Placement

This project is a part of a hackathon run by
https://www.katomaran.com

+---------------------------+
|       Client (React)       |
| - User Interface           |
| - Google OAuth frontend    |
| - Stores JWT token after   |
|   login                   |
+------------+--------------+
             |
             | HTTP/HTTPS requests (with JWT token in Authorization header)
             |
+------------v--------------+
|      Vercel (API Server)   |  <-- Backend deployed here
| - Express.js with Routes   |
| - Passport.js for Google   |
|   OAuth                   |
| - JWT Authentication       |
| - Task CRUD APIs           |
+------------+--------------+
             |
             | MongoDB connection (Mongoose ORM)
             |
+------------v--------------+
|       MongoDB Atlas        |  <-- Database
| - User Collection          |
| - Task Collection          |
+---------------------------+


