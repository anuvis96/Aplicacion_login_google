const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'BCzMQnHKJo',
  password: 'N9C1rfcDux',
  database: 'BCzMQnHKJo',
});

const userModel = {};


userModel.getUsers = (callback) => {
  if (connection) {
    connection.query('SELECT * FROM users_aos ORDER BY id', (err, rows) => {
      if (err) {
        throw err;
      } else {
        callback(null, rows);
      }
    });
  }
};

userModel.inserUser = (userData, callback) => {
  if (connection) {
    connection.query('INSERT INTO users_aos SET ?', userData, (err, res) => {
      if (err) {
        throw err;
      } else {
        callback(null, {
          insertId: res.insertId,
        });
      }
    });
  }
};

userModel.updateUser = (userData, callback) => {
  if (connection) {
    const sql =`

    UPDATE users_aos SET
    firstname = ${connection.scape(userData.firstname)}
    email = ${connection.scape(userData.email)}
    WHERE id  = ${connection.scape(userData.id)}

    `

    connection.query(sql, (err, res) => {})
  }
};

module.exports = userModel;
