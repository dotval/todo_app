const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// ここから書き始める
const db = require('./models/index');
const methodOverride = require('method-override');
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method
    delete req.body._method
    return method
  }
}));

app.get('/', function(req, res) {
  res.redirect('/todos');
});

app.get('/todos', function(req, res) {
  db.todo.findAll().then(function(results) {
    res.render('todos/index', { todos: results } );
  });
});

app.post('/todos', function(req, res) {
  const values = {
    content: req.body.todoContent
  };
  db.todo.create(values).then(function(results) {
    res.redirect('/todos');
  });
});

app.get('/todos/:id', function(req, res) {
  db.todo.findByPk(req.params.id).then(function(results) {
    res.render('todos/edit', { todo: results } );
  });
});

app.put('/todos/:id', function(req, res) {
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

app.delete('/todos/:id', function(req, res) {
  const options = {
    where: {
      id: req.params.id
    }
  };
  db.todo.destroy(options).then(function(results) {
    res.redirect('/todos');
  });
});

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
