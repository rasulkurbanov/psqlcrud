const express = require('express')
const app = express()
const PORT = process.env.PORT || 5500
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('./routes/users')


app.use(express.json())

app.get('/', (_, res) => {
  res.send({"greeting": "Assalomu alaykum"})
})

app.get('/users', getUsers)
app.get('/users/:id', getUser)
app.post('/users', createUser)
app.put('/users/:id', updateUser)
app.delete('/users/:id', deleteUser)


app.listen(PORT, () => console.log(`Server running PORT on ${PORT}`))