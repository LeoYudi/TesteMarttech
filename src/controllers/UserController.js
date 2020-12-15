const User = require('../models/User');
const { hasEmpty, generateHash } = require('../util/functions');

module.exports = {
  async register(req, res) {
    const { email, password, name } = req.body;
    if (hasEmpty([email, password, name]))
      return res.status(400).json({ msg: 'MISSING DATA' });
    try {
      const hash = generateHash(password);
      const user = await User.create({ email, password: hash, name });
      user.password = undefined;
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'INTERNAL SERVER ERROR' });
    }
  }
};