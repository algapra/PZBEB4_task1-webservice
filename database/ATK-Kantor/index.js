const fs = require('fs');
const path = require('path');
const dbPath = path.resolve(__dirname, './atkKantor.json');

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

function getOne(atk_id) {
  let data = getDataFromDatabase();
  return data.find((d) => d.id == atk_id);
}

function update(bodyData, atk_id) {
  let data = fetch();
  const cariData = data.findIndex((d) => d.id === atk_id);
  data[cariData] = bodyData
  writeData(data);
  return data;
}

function destroy(atk_id) {
  let data = fetch();
  data = data.filter((d) => d.id !== atk_id);
  writeData(data);
}

module.exports = {
  fetch,
  create,
  getOne,
  update,
  destroy
};
