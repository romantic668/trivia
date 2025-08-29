// app/src/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');

const models = require('./models');
const authentication = require('./middleware/authentication');
const routes = {
	api: require('./routes/api'),
	user: require('./routes/user'),
};

const app = express();
const PORT = process.env.PORT || 3000;

// 关键修正：从 app/src 回到仓库根，再进 static
const STATIC_DIR = path.join(__dirname, '../../static');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// APIs
app.get('/api/user', authentication.isAuthenticated, routes.api.getUser);
app.get('/api/user/friends', authentication.isAuthenticated, routes.api.getUserFriends);
app.get('/api/user/history', authentication.isAuthenticated, routes.api.getUserGameHistory);
app.get('/api/lobbyGame/:id', authentication.isAuthenticated, routes.api.getLobbyGame);
app.get('/api/questions/:id', authentication.isAuthenticated, routes.api.getThisQuestion);
app.get('/api/games', authentication.isAuthenticated, routes.api.getAllGames);
app.get('/api/game/current', authentication.isAuthenticated, routes.api.getCurrentGame);

app.post('/signup', routes.user.doSignup);
app.post('/login', routes.user.doLogin);
app.delete('/logout', routes.user.doLogout);

// HTML routes
app.get('/', (req, res) => res.redirect(301, '/login'));
app.get('/login', (req, res) => res.sendFile(path.join(STATIC_DIR, 'login.html')));

app.get('/profile', authentication.isAuthenticated, (req, res) =>
	res.sendFile(path.join(STATIC_DIR, 'index.html'))
);
app.get('/lobby', authentication.isAuthenticated, (req, res) =>
	res.sendFile(path.join(STATIC_DIR, 'index.html'))
);
app.get('/games', authentication.isAuthenticated, (req, res) =>
	res.sendFile(path.join(STATIC_DIR, 'game.html'))
);
app.get('/friends', authentication.isAuthenticated, (req, res) =>
	res.sendFile(path.join(STATIC_DIR, 'index.html'))
);

// static assets
app.use(express.static(STATIC_DIR));

// Start
const server = app.listen(PORT, '0.0.0.0', () => {
	console.log('web-app started on port ' + PORT);
});

// Socket.IO
require('./routes/socketio')(server);
