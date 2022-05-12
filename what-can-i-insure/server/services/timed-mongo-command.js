
const dbName = 'deploymentService';

async function timedMongoCommand (command, commandName) {
  const start = Date.now();

  const db = global.mongo.db(dbName);
  const result = await command(db);

  const time = Date.now() - start;
  console.log("Timed mongo command", time, { operation: commandName })

  return result;
}

module.exports = { timedMongoCommand };
