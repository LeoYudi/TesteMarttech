const Cart = require('../models/Cart');

module.exports = {
  async getCart(req, res) {
    const { cartId } = req.params;

    try {
      const cart = await Cart.findByPk(cartId, {
        include: [{
          association: 'items',
          include: [{ association: 'product' }],
        }],
      });
      if (cart.userId !== req.id)
        return res.status(403).json({ msg: 'UNAUTHORIZED' });

      return res.status(200).json(cart);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'INTERNAL SERVER ERROR' });
    }
  },
}