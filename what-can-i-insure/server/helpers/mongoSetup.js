const { MongoClient } = require('mongodb');
const obfuscator = require('./obfuscator');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

module.exports.setup = async (mongoUrl) => {
  const obfuscatedMongoUrl = obfuscator.obfuscateConnectionString(mongoUrl);

  try {
    console.log(`Connecting to ${obfuscatedMongoUrl}`);
    const db = await MongoClient.connect(mongoUrl, options);
    global.mongo = db;
    console.log(`Connected to ${obfuscatedMongoUrl}`);
    return db;
  } catch (err) {
    console.error(`Failed to connect to ${obfuscatedMongoUrl}`);
    console.error(err);
    throw err;
  }
};
