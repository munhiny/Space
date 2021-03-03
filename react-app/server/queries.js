const pool = require("./configs/db.config").pool;

//CALL BACK VERSION
// const getUsers = (request, response) => {
//   pool.query("SELECT * FROM users ORDER BY id asc", (error, results) => {
//     if (error) {
//       throw error;
//     }
//     // this sets the status code
//     response.status(200).json(results.rows);
//   });
// };

//PROMISE VERSION
const getUsers = (request, response) => {
  pool
    .query("SELECT * FROM users ORDER BY id asc")
    .then((results) => response.status(200).json(results.rows))
    .catch((error) => {
      throw error;
    });

  // this sets the status code
};

// const getUserById = (request, response) => {
//   const id = parseInt(request.params.id);
//   pool.query("SELECT * FROM users WHERE id=$1", [id], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     // this sets the status code
//     response.status(200).json(results.rows);
//   });
// };

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);
  pool
    .query("SELECT * FROM users WHERE id=$1", [id])
    .then((results) => response.status(200).json(results.rows))
    .catch((error) => {
      throw error;
    });
};

const createUser = (request, response) => {
  const { name, email } = request.body;
  pool
    .query("INSERT INTO users (name, email) VALUES ($1,$2) returning id", [
      name,
      email,
    ])
    .then((results) =>
      response.status(201).send(`User added wtih ID: ${results.rows[0].id}`)
    )
    .catch((error) => {
      throw error;
    });
};

const updateUser = (request, response) => {
  const { name, email, id } = request.body;

  pool
    .query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 returning id",
      [name, email, id]
    )
    .then((results) => {
      response.status(200).send(`User modified with ID: ${id}`);
    })
    .catch((error) => {
      throw error;
    });
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);
  pool
    .query("DELETE FROM users WHERE id=$1", [id])
    .then((results) => response.status(200).send(`User delete with ID: ${id}`))
    .catch((error) => {
      error;
    });
};

const deleteAllNull = (request, response) => {
  pool
    .query("DELETE FROM users WHERE id IS NULL")
    .then((results) =>
      response.status(200).send(`All Null users have been delete`)
    )
    .catch((error) => response.status(200).send(`No Null users`));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  deleteAllNull,
};
