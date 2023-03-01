const dbATK = require('../database/ATK-Kantor');

function create(req, res) {
  const body = req.body;
  const result = dbATK.create(body);
  res.send(result);
}

function fetch(req, res) {
  const data = dbATK.fetch();
  res.send(data);
}

function get(req, res) {
  const atkKantor = req.params.id;
  const selectATK = dbATK.getOne(atkKantor);
  let data = {},
    responseStatus = 200;
  if (selectATK) {
    data = selectATK;
  } else {
    data = { message: 'Alat tulis tidak ditemukan' };
    responseStatus = 404;
  }
  res.status(responseStatus).send(data);
}

function update(req, res) {
  const atkKantor = req.params.id;
  const body = req.body;
  const result = dbATK.update(body, atkKantor);
  res.send(result);
}

function destroy(req, res) {
  const atkKantor = req.params.id;
  dbATK.destroy(atkKantor);
  res.sendStatus(204);
}


module.exports = {
  fetch,
  get,
  create,
  update,
  destroy,
};
