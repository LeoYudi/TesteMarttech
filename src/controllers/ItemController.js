const Item = require('../models/Item');
const Cart = require('../models/Cart');
const { hasEmpty } = require('../util/functions');

module.exports = {
  async register(req, res) {
    const { cartId } = req.params;
    const { productId, amount } = req.body;
    if (hasEmpty([productId, amount]))
      return res.status(400).json({ msg: 'MISSING DATA' });
    try {
      const cart = await Cart.findByPk(cartId);
      if (!cart)
        return res.status(404).json({ msg: 'NOT FOUND' });

      if (cart.userId !== req.id)
        return res.status(403).json({ msg: 'UNAUTHORIZED' });

      const item = await Item.create({ cartId, productId, amount });
      return res.status(200).json(item);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'INTERNAL SERVER ERROR' });
    }
  },

  async update(req, res) {
    const { itemId, productId, amount } = req.body;
    if (hasEmpty([productId, amount]))
      return res.status(400).json({ msg: 'MISSING DATA' });
    try {
      const item = await Item.findByPk(itemId, {
        include: [{ association: 'cart' }],
      });
      if (!item)
        return res.status(404).json({ msg: 'NOT FOUND' });

      if (item.cart.userId !== req.id)
        return res.status(403).json({ msg: 'UNAUTHORIZED' });

      await item.update({ productId, amount });
      return res.status(200).json(item);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'INTERNAL SERVER ERROR' });
    }
  },

  async delete(req, res) {
    const { itemId } = req.params;
    try {
      const item = await Item.findByPk(itemId, {
        include: { association: 'cart' },
      });
      if (!item)
        return res.status(404).json({ msg: 'NOT FOUND' });

      if (item.cart.userId !== req.id)
        return res.status(403).json({ msg: 'UNAUTHORIZED' });

      await item.destroy();
      return res.status(200).json({ msg: 'DELETED' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'INTERNAL SERVER ERROR' });
    }
  },
}