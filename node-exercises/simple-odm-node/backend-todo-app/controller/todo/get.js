module.exports = function ({ request, response }) {
  //if id supplied return only one todo
  //else return all
  response.json({ status: 200, result: 'OK' });
}
