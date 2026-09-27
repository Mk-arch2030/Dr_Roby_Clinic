const {
  registerNewPatientController,
} = require('../controllers/register-new-patient-controller');

async function patientRoutes(app) {
  app.post('/patients', registerNewPatientController);
}

module.exports = { patientRoutes };
