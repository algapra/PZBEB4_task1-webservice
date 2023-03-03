const fs = require('fs');
const path = require('path');
const dbPath = path.resolve(__dirname, './jadwalPiket.json');

function getDataFromDatabase() {
  let data = fs.readFileSync(dbPath);
  data = data.toString('utf-8');
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data), { encoding: 'utf-8' });
}

function create(bodyData) {
  let data = getDataFromDatabase();
  data.push(bodyData);
  writeData(data);
  return bodyData;
}

function fetch() {
  let data = getDataFromDatabase();
  return data;
}

function getOne(idPegawai) {
  let data = getDataFromDatabase();
  return data.filter((d) => d.id == idPegawai);
}

function update(bodyData, idPegawai, hariPegawai) {
  let data = fetch();
  const cariData = data.findIndex((d) => d.id === idPegawai && d.hari === hariPegawai);
  console.log(cariData);
  data[cariData] = bodyData
  writeData(data);
  return data;
}

function destroy(idPegawai, hariPegawai) {
  let data = fetch();
  data = data.filter((d) => d.id !== idPegawai || d.hari !== hariPegawai);
  writeData(data);
}

module.exports = {
  fetch,
  create,
  getOne,
  update,
  destroy
};
