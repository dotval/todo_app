const express = require('express');
const router = express.Router();
const db = require('../models/index');

router.get('/', function(req, res) {
  db.category.findAll().then(function(results) {
    res.render('categories/index', { categories: results } );
  });
});

router.post('/', function(req, res) {
  const params = {
    name: req.body.categoryName
  };
  db.category.create(params).then(function(results) {
    res.redirect('/categories');
  });
});

router.get('/:id/edit', function(req, res) {
  db.category.findByPk(req.params.id).then(function(results) {
    res.render('categories/edit.ejs', { category: results });
  });
});

router.put('/:id', function(req, res) {
  const params = {
    name: req.body.categoryName
  };
  const filter = {
    where: {
      id: req.params.id
    }
  }
  db.category.update(params, filter).then(function(results) {
    res.redirect('/categories')
  });
})

router.delete('/:id', function(req, res) {
  const filter = {
    where: {
      id: req.params.id
    }
  };
  db.category.destroy(filter).then(function(results) {
    res.redirect('/categories');
  });
});

module.exports = router;