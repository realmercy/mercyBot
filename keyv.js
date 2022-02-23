const Keyv = require('keyv');
const keyv = new Keyv()
keyv.on('error', err => console.error('Keyv connection error:', err));
keyv.set("n", "0")