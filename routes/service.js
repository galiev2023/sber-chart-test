const express = require('express');
const router = express.Router();

/* Select Service page. */
router.get('/', function(req, res, next) {
    if (req.session.user) {
        // User is already logged in
        return res.render('service', { login: null, chart: null, title: 'Сервис' });
    } else {
        res.redirect('/'); // need auth
    }
});

module.exports = router;