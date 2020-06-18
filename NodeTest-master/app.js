var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
const session = require("express-session");

var dbConn = mongoose.connection;

dbConn.on("error", function () {
  console.err;
});

dbConn.once("open", function () {
  console.log("MongoDB Open!!!");
});
dbConn.on("disconnected", function () {
  console.log("MongoDB Close!");
});
dbConn.on("connected", function () {
  console.log("MongoDB Connect!");
});

mongoose.connect("mongodb://localhost/dumpdb");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var reportRouter = require("./routes/reportRouter");
var memberRouter = require("./routes/memberRouter");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    key: "sid",
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24000 * 60 * 60, // 24hour
    },
  })
);

// session을 view에서 변수로 사용하기 위해서
app.use(function (req, res, next) {
  res.locals = req.session;
  next();
});

// 전체 view에서 공용으로 사용할 전역변수 선언하기
let myHome = "우리나라";
global.myHome = myHome;

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/report", reportRouter);
app.use("/member", memberRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;