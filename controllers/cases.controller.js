const casesService = require('../services/cases.service');

async function promoteLeadToCase(req, res) {
  try {
    const leadId = req.body.leadId;
    if (leadId === undefined) return res.status(400).json({ error: 'leadId is required' });

    const newCase = await casesService.promoteLeadToCase(leadId);
    return res.status(201).json(newCase);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}

async function updateCaseStatus(req, res) {
  try {
    const { status } = req.body;
    const { id: caseId } = req.params;

    if (!status) return res.status(400).json({ error: 'status is required' });
    if (!caseId) return res.status(400).json({ error: 'caseId is required' });

    const updated = await casesService.updateCaseStatus(parseInt(caseId), status);
    return res.json(updated);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}

module.exports = {
  promoteLeadToCase,
  updateCaseStatus
};
