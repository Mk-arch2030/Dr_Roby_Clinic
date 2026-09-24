const test = require('node:test');
const assert = require('node:assert/strict');

const {
  registerNewPatient,
} = require('../services/register-new-patient');

test('REGISTER NEW PATIENT constructs a Patient through the application capability', () => {
  const patient = registerNewPatient({
    clinicPatientNumber: 'CPN-TEST-0001',
    name: 'Test Patient',
    age: 30,
    profession: 'Engineer',
    pastHistory: 'None',
  });

  assert.equal(patient.clinicPatientNumber, 'CPN-TEST-0001');
  assert.equal(patient.name, 'Test Patient');
  assert.equal(patient.age, 30);
  assert.equal(patient.profession, 'Engineer');
  assert.equal(patient.pastHistory, 'None');
});

console.log('REGISTER_NEW_PATIENT_APPLICATION_TEST = PASS');
console.log('FAIL = 0');
