
const validateMongoClient = (client)=> {
  if (client === null || client === undefined) {
      throw new Error('First call "connect" before doing operations');
  }
};

getClient = ()=> {
  const client = global.CLIENT;
  validateMongoClient(client);
  return client;
}
module.exports = {
  getClient
};