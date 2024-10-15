// É necessário rodar npm run start no terminal para se conectar ao banco de dados

const express = require('express');
const cors = require('cors');

const TaskModel = require('./models/Task');
const Task = require('./models/Task');

require('dotenv').config();

var app = express();

const corsOptions = {
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type',
};

app.use(cors(corsOptions));
app.use(express.json());

const port = process.env.PORT || 3000;

app.post('/add', (req, res) => {
  console.log('chegou');
  console.log(req.body);
  const description = req.body.description;

  TaskModel.create({
    description: description,
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;

  TaskModel.deleteOne({
    _id: id,
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;
  TaskModel.updateOne(
    {
      _id: id,
    },
    { $set: body }
  )
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get('/get', (req, res) => {
  TaskModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});

require('./databse/connection');
