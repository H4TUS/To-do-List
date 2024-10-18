const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = class AuthChangePasswordController {
  static async requestEmail(req, res) {
    const { email } = req.body;

    if (!email) {
      return res.status(422).json({ message: 'Digite o seu email!' });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: 'Email não encontrado!' });
    }

    res.status(200).json({
      message: 'Email verificado, prossiga com a mudança de senha.',
      userId: user._id,
    });
  }

  static async changePassword(req, res) {
    const { userId, newPassword, confirmPassword } = req.body;

    if (!newPassword || !confirmPassword) {
      return res
        .status(422)
        .json({ message: 'Ambas as senhas são obrigatórias!' });
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(422)
        .json({ message: 'As senhas precisam ser iguais!' });
    }

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado!' });
      }

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(newPassword, salt);

      user.password = passwordHash;
      await user.save();

      res.status(200).json({ message: 'Senha alterada com sucesso!' });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Ocorreu um erro ao tentar mudar a senha!' });
    }
  }
};
