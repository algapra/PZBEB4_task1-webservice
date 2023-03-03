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

function update(bodyData, idPegawai) {
  let data = getOne(idPegawai);
  let allData = fetch();
  data = { ...data, ...bodyData }; 
  const id = allData.find((d) => d.id == idPegawai);
  if (!id || !data) {
    throw Error('Data pegawai tidak ditemukan')
  }
  allData[id] = data;
  writeData(data);
  return data;
}

function destroy(idPegawai) {
  let data = fetch();
  data = data.filter((d) => d.id != idPegawai);
  writeData(data);
}

module.exports = {
  fetch,
  create,
  getOne,
  update,
  destroy
};
