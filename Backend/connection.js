const mongoose = require('mongodb');

async function connection (uri){
    await mongoose.connect(uri);
}

module.exports = connection;