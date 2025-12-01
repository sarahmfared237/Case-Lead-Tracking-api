const express = require('express');
const app = express();
const LeadsRoutes = require('./routes/leads.route');
const CaseRoutes = require('./routes/cases.route');


app.use(express.json());
app.use('/leads', LeadsRoutes);
app.use('/cases', CaseRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});