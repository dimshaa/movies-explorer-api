require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');

const router = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');

const { MONGO_URL_DEV } = require('./utils/configuration');

const {
  PORT = 3000,
  NODE_ENV,
  MONGO_URL,
} = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : MONGO_URL_DEV, {
  useNewUrlParser: true,
});

app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3000', 'http://mydiploma.nomoredomains.icu', 'https://mydiploma.nomoredomains.icu'],
  credentials: true,
}));

app.use(helmet());

app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);

app.use(limiter);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
