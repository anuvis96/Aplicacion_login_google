const User = require('../models/user');

module.exports = function (app) {
  app.get('/users', (req, res) => {
    User.getUsers((err, data) => {
      res.status(200).json(data);
    });
  });

  app.post('/users', (req, res) => {
    const {
      firstname, lastname, email, contraseña,
    } = req.body;
    const userData = {
      firstname,
      lastname,
      email,
      contraseña,
    };

    User.inserUser(userData, (err, data) => {
      if (data && data.insertId) {
        res.status(200).json({
          succes: true,
          msg: 'Usuario insertado',
          data,
        });
      } else {
        res.status(500).json({
          succes: false,
          msg: 'Error',
        });
      }
    });
  });
};
