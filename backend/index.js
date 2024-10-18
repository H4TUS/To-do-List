// É necessário rodar npm run start no terminal para se conectar ao banco de dados

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const TaskModel = require('./models/Task');
const Task = require('./models/Task');

require('dotenv').config();

var app = express();

const corsOptions = {
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
};

app.use(cors(corsOptions));

app.use(express.json());

const AuthRegisterUserRoutes = require('./routes/AuthRegisterUserRoutes');

app.use(AuthRegisterUserRoutes);

const port = process.env.PORT || 3000;

app.post('/add', async (req, res) => {
  const { description } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    if (!description) {
      return res.status(422).json({ message: 'A descrição é obrigatória!' });
    }

    const task = new Task({
      description,
      userId,
    });

    const result = await task.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar a tarefa!', error });
  }
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

app.get('/get', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const tasks = await Task.find({ userId });

    if (!tasks) {
      return res.status(404).json({ message: 'Nenhuma tarefa encontrada!' });
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Erro no servidor:', error);
    res.status(500).json({ message: 'Erro interno no servidor!' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});

require('./databse/connection');
