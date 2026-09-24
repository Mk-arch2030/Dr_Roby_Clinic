const { Patient } = require('../../domain/patient');

function registerNewPatient({
  clinicPatientNumber,
  name,
  age,
  profession,
  pastHistory,
}) {
  return new Patient({
    clinicPatientNumber,
    name,
    age,
    profession,
    pastHistory,
  });
}

module.exports = { registerNewPatient };
