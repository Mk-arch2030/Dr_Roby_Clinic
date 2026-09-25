const { Patient } = require('../../domain/patient');

function registerNewPatient({
  clinicPatientNumber,
  name,
  age,
  profession,
  pastHistory,
  phone,
  gender,
}) {
  return new Patient({
    clinicPatientNumber,
    name,
    age,
    profession,
    pastHistory,
    phone,
    gender,
  });
}

module.exports = { registerNewPatient };
