const pool = require('../utils/pool')


//Get all users from DB
const getUsers = async(req, res) => {
  try {
    const results = await pool.query(`SELECT * FROM users ORDER BY ID ASC`)
    res.status(200).json(results.rows)
  }
  catch(err) {
    console.log(err)
  }
} 

//Get a with an id user from DB 
const getUser = async (req, res) => {
  const { id } = req.params
  try {
    const {rows} = await pool.query(`SELECT * FROM users WHERE ID=$1`,  [id])
    res.status(200).json(rows)
  }
  catch(err) {
    console.log(err)
    res.send(400).json(err.message)
  }
}

//Create a new user
const createUser = async (req, res) => {
  const { name, email } = req.body

  try {
    const {rows} = await pool.query(`INSERT INTO users (name, email) VALUES ($1, $2) RETURNING ID, name, email`, [name, email])
    res.status(201).send(`User added with an ID: ${rows[0].id}`)
  }
  catch(err) {
    res.status(400).send(err.message)
    console.log(err)
  }
}

//Update a user with new info
const updateUser = async (req, res) => {
  const { id } = req.params
  const {name, email} = req.body
  try {
    const {rows} = await pool.query(`UPDATE users SET name=$1, email=$2 WHERE ID=$3 RETURNING ID, name, email`, [name, email, id])
    res.status(201).send(`User modified info with ${rows[0].name} and ${rows[0].email}`)
    console.log(rows[0])
  }
  catch(err) {
    res.status(400).send(err.message)
    console.log(err)
  }
}

//Delete a user from database with an id
const deleteUser = async (req, res) => {
  const {id} = req.params
  try {
    await pool.query(`DELETE FROM users WHERE ID=$1`, [id])
    res.status(200).send(`User is deleted`)
  }
  catch(err) {
    console.log(err)
    res.status(400).send(err.message)
  }
}



module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}
