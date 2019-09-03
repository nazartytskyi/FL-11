const emoji  = require('./emoji.json');
const emojiShop  = require('./emoji-shop.json');

module.exports = () => ({
  emoji,
  'emoji-shop': emojiShop,
})