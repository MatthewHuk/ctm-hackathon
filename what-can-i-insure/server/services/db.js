const { timedMongoCommand } = require('./timed-mongo-command');

const providerDeploymentCollection = 'providerDeployment';
const providerDeploymentCycle = 'providerDeploymentCycle';
const providerDeploymentLog = 'providerDeploymentLog';

function storeProviderDeployment (deployment) {
  return timedMongoCommand(db => {
    return db.collection(providerDeploymentCollection)
      .insertOne(deployment);
  }, 'storeProviderDeployment');
}

function searchableCarEnquiry (carEnquiries) {
  return timedMongoCommand(db => {
    return db.collection('searchable_car_enquiry')
        .insert(carEnquiries);
  }, 'storeSearchableEnquiry');
}

function carEnquiriesByLocation (Lon, Lat) {
  return timedMongoCommand(async (db) => {
    const results = await db.collection('searchable_car_enquiry')
        .aggregate([
          {
            $geoNear: {
              near: { type: "Point", coordinates: [ Lon , Lat ] },
              distanceField: "dist.calculated",
              maxDistance: 5000,
              includeLocs: "dist.locale",
              spherical: true
            }
          }
        ]).toArray()
        //.find({"$geoNear":{near: { type: "Point", coordinates: [ Lon , Lat ] }, $maxDistance: 5}});
    console.log(results);
    return results;
  }, 'storeSearchableEnquiry');
}

function storeProviderCycles (cycles) {
  return timedMongoCommand(db => {
    return db.collection(providerDeploymentCycle)
      .insert(cycles);
  }, 'storeProviderCycles');
}

function storeProviderLogs (logs) {
  return timedMongoCommand(db => {
    return db.collection(providerDeploymentLog)
      .insert(logs);
  }, 'storeProviderLogs');
}

async function updateProviderCycle (cycleId, update) {
  return timedMongoCommand(async db => {
    return db.collection(providerDeploymentCycle)
      .updateOne({ cycleId }, { $set: update });
  }, 'updateProviderCycle');
}

async function getDeploymentData (filter) {
  return timedMongoCommand(async db => {
    return db.collection(providerDeploymentCollection)
      .find(filter)
      .sort('createdAt', -1)
      .toArray();
  }, 'getProviderDeploymentData');
}

async function getLatestDeploymentAndCycles (deploymentFilter, cycleFilter) {
  return timedMongoCommand(async db => {
    return db.collection(providerDeploymentCollection)
      .aggregate(pipelineForLatestDeploymentAndCycles(deploymentFilter, cycleFilter, 1), { allowDiskUse: true })
      .toArray();
  }, 'getLatestDeploymentAndCycles');
}

async function getDeploymentCycleData (filter) {
  return timedMongoCommand(async db => {
    return db.collection(providerDeploymentCycle)
      .find(filter)
      .sort('createdAt', -1)
      .toArray();
  }, 'getDeploymentCycleData');
}

function getDeploymentLogs (filter) {
  return timedMongoCommand(async db => {
    return db.collection(providerDeploymentLog)
      .find(filter)
      .sort('createdAt', -1)
      .toArray();
  }, 'getDeploymentLog');
}

async function deleteDeploymentData (filter) {
  return timedMongoCommand(async db => {
    return db.collection(providerDeploymentCollection)
      .deleteMany(filter);
  }, 'deleteProviderDeploymentData');
}

async function deleteProviderDeploymentCycleData (filter) {
  return timedMongoCommand(async db => {
    return db.collection(providerDeploymentCycle)
      .deleteMany(filter);
  }, 'deleteProviderDeploymentCycleData');
}

function deleteProviderDeploymentLogData (filter) {
  return timedMongoCommand(async db => {
    return db.collection(providerDeploymentLog)
      .deleteMany(filter);
  }, 'deleteProviderDeploymentLogData');
}

function pipelineForLatestDeploymentAndCycles (deploymentFilter, cycleFilter, limit = 1) {
  const cyclesProperty = 'cycles';

  return [
    { $match: deploymentFilter },
    { $sort: { createdAt: -1 } },
    { $lookup: lookup(cycleFilter, cyclesProperty) },
    { $match: { [cyclesProperty]: { $ne: [] } } },
    { $limit: limit }];
}

function lookup (cycleFilter, cyclesProperty) {
  const deployIdInLeftCollectionAlias = 'id';

  const cycleExpression = [
    { $eq: ['$deployId', `$$${deployIdInLeftCollectionAlias}`] }
  ];

  for (const [key, value] of Object.entries(cycleFilter)) {
    cycleExpression.push({ $eq: [`$${key}`, value] });
  }
  return {
    from: providerDeploymentCycle,
    let: { [deployIdInLeftCollectionAlias]: '$deployId' },
    pipeline: [
      {
        $match: {
          $expr:
          {
            $and: cycleExpression
          }
        }
      },
      { $sort: { updatedAt: -1 } }
    ],
    as: cyclesProperty
  };
}

module.exports = {
  updateProviderCycle,
  storeProviderDeployment,
  storeProviderCycles,
  storeProviderLogs,
  getDeploymentData,
  getDeploymentCycleData,
  getDeploymentLogs,
  deleteDeploymentData,
  deleteProviderDeploymentCycleData,
  deleteProviderDeploymentLogData,
  getLatestDeploymentAndCycles,
  searchableCarEnquiry,
  carEnquiriesByLocation
};
