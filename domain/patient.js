class Patient {
  constructor({
    clinicPatientNumber,
    name,
    age,
    profession,
    pastHistory
  }) {
    if (!clinicPatientNumber) {
      throw new Error('Clinic Patient Number is required');
    }

    this.clinicPatientNumber = clinicPatientNumber;
    this.name = name;
    this.age = age;
    this.profession = profession;
    this.pastHistory = pastHistory;
  }
}

module.exports = { Patient };
