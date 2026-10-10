const express = require('express');
const router = express.Router();

/* Chart page. */
router.get('/', function(req, res, next) {
  if (req.session.user) {
    // User is already logged in
    res.render('chart', { login: req.session.user.login, chart: req.session.chart, title: 'Потребительская корзина туриста' });
  } else {
    res.redirect('/'); // need auth
  }
});

module.exports = router;
