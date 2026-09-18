class Patient {
  constructor({ clinicPatientNumber }) {
    if (!clinicPatientNumber) {
      throw new Error('Clinic Patient Number is required');
    }

    this.clinicPatientNumber = clinicPatientNumber;
  }
}

module.exports = { Patient };
