var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/admin");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);

require("./config/config");
require("./models/db");
require("./config/passportConfig");

const server = require("http").createServer(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

server.listen(process.env.PORT || "5000", () =>
  console.log(`Server started at port : 5000`)
);

module.exports = app;
