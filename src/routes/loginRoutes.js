const mysql = require('mysql');

// Google
const { OAuth2Client } = require('google-auth-library');
const { CLIENT_ID } = require('../config/config');

const client = new OAuth2Client(CLIENT_ID);

connection = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'BCzMQnHKJo',
  password: 'N9C1rfcDux',
  database: 'BCzMQnHKJo',
});

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });

  const payload = ticket.getPayload();
  // const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];

  return {
    nombre: payload.name,
    email: payload.email,
    img: payload.picture,
    google: true,
  };
}

module.exports = function (app) {
  // Autenticación De Google

  app.post('/google', async (req, res) => {
    const { token } = req.body;
    const googleUser = await verify(token).catch((e) => res.status(403).json({
      ok: false,
      mensaje: 'Token no válido',
    }));
    return res.status(200).json({
      ok: true,
      mensaje: 'Ok',
      googleUser,
    });
  });

  app.post('/user', async (req, res) => {
    const { token } = req.body;
    const usuario = await verify(token);
    const userDB = {
      name: usuario.nombre,
      image: usuario.img,
      email: usuario.email,
    };

    console.log(userDB);

    connection.query('INSERT INTO users_aos SET ?', userDB, (err, response) => {
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

// Autenticación Normal Mysql

/* app.post('/login/google', (req, res) => {
  const { email, contraseña } = req.body;
	if (email && contraseña) {
		connection.query('SELECT * FROM users_aos WHERE email = ? AND contraseña = ?', [email, contraseña], function(error, results, fields) {
      if (results.length > 0) {
        res.status(200).json({
          succes: true,
          msg: "Usuario Logueado",
          results,
        });
				//res.redirect('/home');
			} else {
				res.send('Incorrect Email and/or Password!');
			}
			res.end();
		});
	} else {
		res.send('Please enter Email and Password!');
		res.end();
	}
}); */
