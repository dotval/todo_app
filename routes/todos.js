const express = require('express');
const router = express.Router();
const db = require('../models/index');

router.get('/', function(req, res) {
  const options = {
    include: [{
      model: db.todo
    }]
  };
  db.category.findAll(options).then(function(results) {
    res.render('todos/index', { categories: results } );
  });
});

router.post('/', function(req, res) {
  const values = {
    content: req.body.todoContent
  };
  db.todo.create(values).then(function(results) {
    res.redirect('/todos');
  });
});

router.get('/:id', function(req, res) {
  db.todo.findByPk(req.params.id).then(function(results) {
    res.render('todos/edit', { todo: results } );
  });
});

router.put('/:id', function(req, res) {
  const values = {
    content: req.body.todoContent
  };
  const options = {
    where: {
      id: req.params.id
    }
  };
  db.todo.update(values, options).then(function(results) {
    res.redirect('/todos');
  })
});

router.delete('/:id', function(req, res) {
  const options = {
    where: {
      id: req.params.id
    }
  };
  db.todo.destroy(options).then(function(results) {
    res.redirect('/todos');
  });
});

module.exports = router;