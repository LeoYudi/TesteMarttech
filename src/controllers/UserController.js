const User = require('../models/User');
const { hasEmpty, generateHash, generateToken, validPassword } = require('../util/functions');
const { NORMAL } = require('../config/level');

module.exports = {
  async register(req, res) {
    const { email, password, name } = req.body;
    if (hasEmpty([email, password, name]))
      return res.status(400).json({ msg: 'MISSING DATA' });
    try {
      const hash = generateHash(password);
      const user = await User.create({ email, password: hash, name, level: NORMAL });
      user.password = undefined;
      return res.status(200).json({ user, token: generateToken({ id: user.id, level: user.level }) });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'INTERNAL SERVER ERROR' });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    if (hasEmpty([email, password]))
      return res.status(400).json({ msg: 'MISSING DATA' });
    try {
      const user = await User.findOne({
        where: { email }
      });

      if (!user)
        return res.status(401).json({ msg: 'INCORRECT EMAIL OR PASSWORD' });

      if (!validPassword(password, user.password))
        return res.status(401).json({ msg: 'INCORRECT EMAIL OR PASSWORD' });

      user.password = undefined;
      return res.status(200).json({ user, token: generateToken({ id: user.id, level: user.level }) })

    } catch (error) {

    }
  }
};