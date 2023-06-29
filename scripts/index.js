const fs = require('fs-extra');
const path = require('path');

const DATA_DIR = './.tempData';
const DATA_FILE = './data.json';


function getData() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
  }

  if (!fs.existsSync(path.join(DATA_DIR, DATA_FILE))) {
    fs.createFile(path.join(DATA_DIR, DATA_FILE));
  }
  return fs.readJSONSync(path.join(DATA_DIR, DATA_FILE));
}

module.exports = {
  getData,
};
