const dbPegawai = require('../database/Jadwal-Piket');

function create(req, res) {
  const body = req.body
  const database = dbPegawai.fetch()
  const cariId = database.find((d) => d.id == body.id)
  const cariNama = database.find((d) => d.namaPegawai == body.namaPegawai)
  const cariNamaDanHari = database.find((d) => d.namaPegawai.includes(body.namaPegawai) && d.hari.includes(body.hari))
  let result = {}, responseStatus = 200;
  if (cariId) {
    if(cariNamaDanHari) {
        result = { message: 'Pegawai sudah ada di jadwal' };
        responseStatus = 406;
    } else if (cariId.namaPegawai === body.namaPegawai) {
        result = dbPegawai.create(body);
    } else {
        result = { message: 'id Pegawai sudah ada, masukan id yang lain' };
        responseStatus = 406;
    }
  } else if (cariNama) {
    if (body.id !== cariNama.id) {
        result = { message: `Pegawai dengan Nama ${cariNama.namaPegawai} sudah memiliki id ${cariNama.id} dan tidak bisa memasukan lagi jika id berbada` };
        responseStatus = 406;
    }
  } else {
    result = dbPegawai.create(body);
  }
  res.status(responseStatus).send(result);
}

function fetch(req, res) {
  const data = dbPegawai.fetch();
  res.set('Cache-Control', `max-age=${60 * 2}`);
  res.send(data);
}

function get(req, res) {
  const idPegawai = req.params.id;
  const selectPegawai = dbPegawai.getOne(idPegawai);
  let data = {},
    responseStatus = 200;
  if (selectPegawai) {
    data = selectPegawai;
  } else {
    data = { message: 'id Pegawai tidak ditemukan' };
    responseStatus = 404;
  }
  res.status(responseStatus).send(data);
}

function update(req, res) {
  const idPegawai = req.params.id;
  const hariPegawai = req.params.hari;
  const body = req.body;
  const result = dbPegawai.update(body, idPegawai, hariPegawai);
  res.send(result);
}

function destroy(req, res) {
  const idPegawai = req.params.id;
  const hariPegawai = req.params.hari;
  dbPegawai.destroy(idPegawai, hariPegawai);
  res.sendStatus(204);
}


module.exports = {
  fetch,
  get,
  create,
  update,
  destroy,
};
