const User = require('../models/User');
const { hasEmpty, generateHash, generateToken, validPassword } = require('../util/functions');
const { NORMAL, ADMIN } = require('../config/level');

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
      console.log(error);
      return res.status(500).json({ msg: 'INTERNAL SERVER ERROR' });
    }
  },

  async update(req, res) {
    const { id, name, password } = req.body;

    if (hasEmpty([id, name, password]))
      return res.status(400).json({ msg: 'MISSING DATA' });
    try {
      const user = await User.findByPk(id);
      if (!user)
        return res.status(404).json({ msg: 'NOT FOUND' });

      const hash = generateHash(password);

      console.log(req.id, req.level);

      if (user.id === req.id)
        await user.update({ name, password: hash });
      else if (req.level === ADMIN)
        await user.update({ name, password: hash });
      else
        return res.status(403).json({ msg: 'UNAUTHORIZED' });

      user.password = undefined;
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'INTERNAL SERVER ERROR' });
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    if (hasEmpty([id]))
      return res.status(400).json({ msg: 'MISSING DATA' });
    try {
      const user = await User.findByPk(id);
      if (!user)
        return res.status(404).json({ msg: 'NOT FOUND' });

      if (user.id === req.id)
        await user.destroy();
      else if (req.level === ADMIN)
        await user.destroy();
      else
        return res.status(403).json({ msg: 'UNAUTHORIZED' });

      return res.status(200).json({ msg: 'DELETED' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'INTERNAL SERVER ERROR' });
    }
  },
};