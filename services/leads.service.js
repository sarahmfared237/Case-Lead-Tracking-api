const json = require('../utils/jsonfunctions');
const validator = require('validator');


async function createLead({name, email, source}) {
  if (!name || !email || !source) {
    const e = new Error('name, email, and source are required');
    e.status = 400;
    throw e;
  }
  if (!validator.isEmail(email)) {
    const e = new Error('Invalid email format');
    e.status = 400;
    throw e;
  }
  const leads = await json.readJSON(json.leadsFile);
  let maxId = 0;
  for (const lead of leads) {
    if (lead.leadId > maxId) {
      maxId = lead.leadId;
    }
  }
  const newLead = { leadId: maxId + 1, name, email, source };
  leads.push(newLead);
  await json.writeJSON(json.leadsFile, leads);
  return newLead;
}

async function getAllLeads() {
  const leads = await json.readJSON(json.leadsFile);
  return leads;
     
}
module.exports = {
  createLead,
  getAllLeads
}; 
