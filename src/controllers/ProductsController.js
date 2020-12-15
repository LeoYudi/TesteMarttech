const Products = require('../models/Products');
const { hasEmpty } = require('../util/functions');

module.exports = {
  async getAll(req, res) {
    try {
      const products = await Products.findAll();
      return res.status(200).json(products);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'INTERNAL SERVER ERROR' });
    }
  },

  async store(req, res) {
    const { name, description, price } = req.body;
    if (hasEmpty([name, price]))
      return res.status(400).json({ msg: 'MISSING DATA' });
    try {
      const product = await Products.create({ name, description, price });
      return res.status(200).json(product);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'INTERNAL SERVER ERROR' });
    }
  }
};