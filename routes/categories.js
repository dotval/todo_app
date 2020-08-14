const express = require('express');
const router = express.Router();
const db = require('../models/index');

router.get('/', function(req, res) {
  db.category.findAll().then(function(results) {
    res.render('categories/index', { categories: results } );
  });
});

module.exports = router;