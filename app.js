// call in the installed dependencies
const express =  require('express'),
bodyParser =  require('body-parser'),
mongoose =  require('mongoose'),
mainRoutes =  require('./routes'),
config = require('./config/config');
require('dotenv').config();
const MONGO_DB_URI = config.mongodbURI;
const port  = config.PORT;

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connect to mongoose
mongoose.connect(MONGO_DB_URI)
  .then(() => {
    console.log('database connected.');
  })
  .catch(() => {
  });
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info('Serving from http://localhost:%s/ in your browser.', port);
});

// set up route
app.use('/api/', mainRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Student CRUD API',
  });
});

app.use(function (err, req, res, next) {
  if (err.isBoom) {
       return res.status(err.output.statusCode).json(err.output.payload);
  }
});

module.exports = app;
