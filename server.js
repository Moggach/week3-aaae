'use strict';

const express = require('express');

const login = require('./routes/login');
const signUp = require('./routes/signUp.js');
const writePost = require('./routes/writePost.js');
const posts = require('./routes/posts.js');
const logout = require('./routes/logout.js');
const home = require('./routes/home.js');

const db = require('./database/connection.js');

const server = express();

const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

server.use(express.urlencoded({ extended: false }));

server.use(cookieParser(process.env.COOKIE_SECRET));

server.get('/', home.get);

// page for displaying all the posts
server.get('/posts', posts.get);
server.post('/posts', posts.post);

// setting the routes for login - get and set
// implementation of the functions is in the ./routes/login.js
server.get('/log-in', login.get);
server.post('/log-in', login.post);

server.get('/sign-up', signUp.get);
server.post('/sign-up', signUp.post);

server.get('/write-post', writePost.get);
server.post('/write-post', writePost.post);

server.post('/log-out', logout.post);

// Static handler
const staticHandler = express.static('public');
server.use(staticHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
