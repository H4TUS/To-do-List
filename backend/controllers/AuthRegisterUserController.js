const User = require('../models/User');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

module.exports = class AuthRegisterUserController {
  static async init(req, res) {
    res.send({ mensage: 'Bem vindo a nossa API!' });
  }

  static async registerUser(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    if (!name) {
      return res.status(422).json({ mensage: 'O nome é obrigatório!' });
    }

    if (!email) {
      return res.status(422).json({ mensage: 'O email é obrigatório!' });
    }

    if (!password) {
      return res.status(422).json({ mensage: 'A senha é obrigatória!' });
    }

    if (password != confirmPassword) {
      return res
        .status(422)
        .json({ mensage: 'As senhas precisam ser iguais!' });
    }

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res
        .status(422)
        .json({ mensage: 'O email informado está em uso!' });
    }

    const hash = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, hash);

    const user = new User({
      name,
      email,
      password: passwordHash,
    });

    try {
      await user.save();
      const token = createToken(user._id); // Gerar o token JWT
      res.status(201).json({ mensage: 'Usuário criado com sucesso!', token });
    } catch (error) {
      res.status(500).json({ mensage: 'Ocorreu um erro!' });
    }
  }

  static async loginUser(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ mensage: 'Usuário não existe!' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(422).json({ mensage: 'Senha incorreta!' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
    res.status(200).json({ mensage: 'Login realizado com sucesso!', token });
  }

  static async validateToken(req, res) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido!' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(401).json({ message: 'Usuário não encontrado!' });
      }

      return res.status(200).json({ message: 'Token válido', user });
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido!', error });
    }
  }
};
