const leadService = require('../services/leads.service');

async function createLead(req, res) {
  try {
    const created = await leadService.createLead(req.body);
    return res.status(201).json("Lead created successfully" );
  } catch (err) {
    return res.status(err.status || 500).json({ error: "Failed to create lead" });
  }
}

async function listLeads(req, res) {
  try {
    const leads = await leadService.getAllLeads();
    return res.json(leads);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to read leads' });
  }
}

module.exports = {
  createLead,
  listLeads
};
