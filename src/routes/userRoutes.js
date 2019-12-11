const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'BCzMQnHKJo',
  password: 'N9C1rfcDux',
  database: 'BCzMQnHKJo',
});

module.exports = function (app) {

  app.post('/user', async (req, res) => {
    const { token } = req.body;
    const usuario = await verify(token);
    const userDB = {
      name: usuario.nombre,
      image: usuario.img,
      email: usuario.email,
    };

    console.log(userDB);

    // eslint-disable-next-line consistent-return
    connection.query('INSERT INTO users_aos SET ?', userDB, (err) => {
      if (err) {
        console.log(err);
      } else {
        return res.status(200).json({
          ok: true,
          mensaje: 'Usuario registrado',
        });
      }
    });
  });
};
