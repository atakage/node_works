var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

// ./models 폴더에 index.js 파일이 있는지  찾아서 있으면 require하여 사용할 수 있도록 준비
var sequelize = require('./models').sequelize

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bbsRouter = require('./routes/bbsRouter')

var app = express();


// db에 연결
sequelize.sync()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));


/*
  express의 json과 urlencoded는 대용량 Text(데이터)를 json 구조나 post로 전송할 때 문제를 일으키기 때문에
  body-parser의 도움을 받아 대용량 Text를 업로드 할 수 있도록 함
*/
app.use(bodyParser.json({limit:"10mb"}))
app.use(bodyParser.urlencoded({limit:'10mb', extends:true, parameterLimit:10000000}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bbs', bbsRouter)

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
