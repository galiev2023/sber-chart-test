const express = require('express');
const router = express.Router();

/* GET root page. */
router.get('/', function(req, res, next) {
  if (req.session.user) {
    // User is already logged in
    //return res.render('index', { login: session.user.login, chart: req.session.chart, title: 'Войти в панель' });
    res.redirect('/service'); // select Service
  }
  // User is not logged in, show login form
  res.render('index', { login: null, chart: null, title: 'Войти в панель' });
});

module.exports = router;
