const Product = require('../models/Product');
const { hasEmpty } = require('../util/functions');
const { ADMIN } = require('../config/level');

module.exports = {
  async getAll(req, res) {
    try {
      const products = await Product.findAll();
      return res.status(200).json(products);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'INTERNAL SERVER ERROR' });
    }
  },

  async store(req, res) {
    const { name, description, price } = req.body;
    if (req.level !== ADMIN)
      return res.status(403).json({ msg: 'UNAUTHORIZED' });

    if (hasEmpty([name, price]))
      return res.status(400).json({ msg: 'MISSING DATA' });
    try {
      const product = await Product.create({ name, description, price });
      return res.status(200).json(product);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'INTERNAL SERVER ERROR' });
    }
  },

  async update(req, res) {
    const { id, name, description, price } = req.body;
    if (req.level !== ADMIN)
      return res.status(403).json({ msg: 'UNAUTHORIZED' });

    if (hasEmpty([name, price]))
      return res.status(400).json({ msg: 'MISSING DATA' });
    try {
      const product = await Product.findByPk(id);

      if (!product)
        return res.status(404).json({ msg: 'NOT FOUND' });

      await product.update({ name, description, price });
      return res.status(200).json(product);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'INTERNAL SERVER ERROR' });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    if (req.level !== ADMIN)
      return res.status(403).json({ msg: 'UNAUTHORIZED' });

    if (hasEmpty([id]))
      return res.status(400).json({ msg: 'MISSING DATA' });
    try {
      const product = await Product.findByPk(id);

      if (!product)
        return res.status(404).json({ msg: 'NOT FOUND' });

      await product.destroy();
      return res.status(200).json({ msg: 'DELETED' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'INTERNAL SERVER ERROR' });
    }
  },
};