const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());

app.use(router);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App started! Port ${PORT} is listened.`);
});
