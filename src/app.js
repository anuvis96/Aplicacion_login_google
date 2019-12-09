const express = require('express');

const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Middlewares

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes

require('./routes/userRoutes')(app);
require('./routes/loginRoutes')(app);

// Settings

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log('Server on port 3000');
});
