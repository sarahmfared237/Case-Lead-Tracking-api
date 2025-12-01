const json = require('../utils/jsonfunctions');

async function promoteLeadToCase(leadId) {

  const cases = await json.readJSON(json.casesFile);
  const leads = await json.readJSON(json.leadsFile);

// check lead exists
let lead = null;
for (let i = 0; i < leads.length; i++) {
  if (leads[i].leadId === leadId) {
    lead = leads[i];
    break;
  }
}

if (!lead) {
  const e = new Error('Lead not found');
  e.status = 404;
  throw e;
}

// check not promoted before
let promoted = false;
for (let i = 0; i < cases.length; i++) {
  if (cases[i].leadId === leadId) {
    promoted = true;
    break;
  }
}

if (promoted) {
  const e = new Error('Lead already promoted to a case');
  e.status = 409;
  throw e;
}


  // new caseId auto-increment
  let maxCaseId = 0;
  for (const caseItem of cases) {
    if (caseItem.caseId > maxCaseId) {
      maxCaseId = caseItem.caseId;
    }
  } 
  
  const newCase = {
    caseId: maxCaseId + 1,
    leadId,
    status: 'opened',
    createdAt: new Date().toISOString()
  };

  cases.push(newCase);
  await json.writeJSON(json.casesFile, cases);
  return newCase;
}

async function updateCaseStatus(caseId, status) {
  if (!status) {
    const e = new Error('status is required');
    e.status = 400;
    throw e;
  }

const cases = await json.readJSON(json.casesFile);

  // simple loop to find the case (no findIndex, no reduce)
  let found = null;
  for (let i = 0; i < cases.length; i++) {
    // use strict equality now that id is a Number
    if (cases[i].caseId === caseId) {
      cases[i].status = status;
      found = cases[i];
      break;
    }
  }

  if (!found) {
    const e = new Error('Case not found');
    e.status = 404;
    throw e;
  }

  // write back and return updated case
  await json.writeJSON(json.casesFile, cases);
  return found;
}

module.exports = {
  promoteLeadToCase,
  updateCaseStatus
};
