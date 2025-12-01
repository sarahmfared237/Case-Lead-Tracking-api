const fs = require('fs').promises;
const path = require('path');

const leadsFile = path.join(__dirname, '..', 'test', 'leads.json');
const casesFile = path.join(__dirname, '..', 'test', 'cases.json');

async function ensureFile(filePath) {
  try {
    await fs.access(filePath);
  } catch {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, '[]', 'utf8');
  }
}

async function readJSON(file) {
  await ensureFile(file);
  const data = await fs.readFile(file, 'utf8');
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeJSON(file, data) {
  await ensureFile(file);
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = {
  readJSON,
  writeJSON,
  leadsFile,
  casesFile
};
