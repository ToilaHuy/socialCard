// Using Node.js `require()`
const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/Social');
        console.log('connect successfully');
    } catch (error) {
        console.log('connec failure');
    }
}
module.exports = { connect };
