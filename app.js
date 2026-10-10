const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const crypto = require('crypto');

const indexRouter = require('./routes/index');
const serviceRouter = require('./routes/service');
const chartRouter = require('./routes/chart');

const app = express();

const SECRET_KEY = crypto.randomBytes(64).toString('hex'); // secure key
const SESSION_EXPIRY = '30'; // 30 minutes

const { dataset } = require('./config');
const { user } = require('./user');

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
/*app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Enable CORS for educational purposes
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});*/

// Configure sessions
app.use(
    session({
      store: new FileStore({}),
      secret: SECRET_KEY, // Replace with a secure key
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: SESSION_EXPIRY * 60 * 1000,
        secure: false,
      },
    })
);

// API endpoint to provide dataset
app.get('/api/data', (req, res) => {
    res.json(dataset);
});

// API Store Chart
app.post('/api/store', (req, res) => {
    const { chart } = req.body; // Extract chart parameter from the request body

    if (!chart) {
        return res.status(400).json({ success: false, message: 'Missing "chart" parameter in the request body.' });
    }

    // Store the chart parameter in the user's session
    req.session.chart = chart;

    return res.status(200).json({ success: true, message: 'Chart parameter stored successfully.', chart });
});

// API Login User
app.post('/login', (req, res) => {
  const { login, password } = req.body;

  if (login === user.login && password === user.password) {
    // Store user info in the session
    req.session.user = { login: user.login, chart: null };
    return res.json({ success: true, message: 'Logged in successfully' });
  }

  return res.status(401).json({ success: false, message: 'Логин или пароль неверны.' });
});

// API Logout route to destroy session
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Ошибка сервера.' });
    }
    res.clearCookie('connect.sid'); // Clear session cookie
    return res.json({ success: true, message: 'Успешный выход.' });
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routing
app.use('/', indexRouter);
app.use('/service', serviceRouter);
app.use('/chart', chartRouter);

// Serve Chart.js UMD version
//app.use('/js', express.static(path.join(__dirname, 'node_modules/chart.js/dist')));
//app.use('/js', express.static(path.join(__dirname, 'node_modules/chartjs-plugin-datalabels/dist')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
