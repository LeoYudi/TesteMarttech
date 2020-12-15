const Products = require('../models/Products');

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
    try {

    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'INTERNAL SERVER ERROR' });
    }
  }
};