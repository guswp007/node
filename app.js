const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('ninjucks');
const dotenv = require('dotenv');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');

dotenv.config();

const app = express();
app.set('port', process.env.PORT || 3000);
app.set("view engin", "html");


nunjucks.configure("views", {
	express : app,
	watch : true,
)};

app.use(morgan('dev'));

// 없는 페이지 처리 미들웨어

//에러 처리 미들웨어

app.use((err, req, res, next) => {
	const error = new Error(`${req.method} ${req.url}은 없는 페이지 입니다`);
	error.status = 404;
	next(error);

});

app.use((err, req, res, next) => {
	res.locals.error = err;

	res.status(err.status || 500).render('error');
});

app.listern(app.get('port'), () => {
	console.log(app.get('port'), '번 포트에서 대기중');