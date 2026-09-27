function calculateAge(dateOfBirth, referenceDate = new Date()) {
  if (!dateOfBirth) {
    throw new Error('Date of Birth is required');
  }

  let birthYear;
  let birthMonth;
  let birthDay;

  if (dateOfBirth instanceof Date) {
    if (Number.isNaN(dateOfBirth.getTime())) {
      throw new Error('Invalid Date of Birth');
    }

    birthYear = dateOfBirth.getUTCFullYear();
    birthMonth = dateOfBirth.getUTCMonth() + 1;
    birthDay = dateOfBirth.getUTCDate();
  } else {
    const parts = String(dateOfBirth).split('-').map(Number);

    if (
      parts.length !== 3 ||
      parts.some(Number.isNaN) ||
      parts[0] < 1 ||
      parts[1] < 1 ||
      parts[1] > 12 ||
      parts[2] < 1 ||
      parts[2] > 31
    ) {
      throw new Error('Invalid Date of Birth');
    }

    [birthYear, birthMonth, birthDay] = parts;
  }
  const reference = referenceDate instanceof Date
    ? referenceDate
    : new Date(referenceDate);

  if (Number.isNaN(reference.getTime())) {
    throw new Error('Invalid age reference date');
  }

  let age = reference.getFullYear() - birthYear;

  const referenceMonth = reference.getMonth() + 1;
  const referenceDay = reference.getDate();

  if (
    referenceMonth < birthMonth ||
    (referenceMonth === birthMonth && referenceDay < birthDay)
  ) {
    age -= 1;
  }

  return age;
}

class Patient {
  constructor({
    clinicPatientNumber,
    name,
    dateOfBirth,
    profession,
    pastHistory,
    phone,
    gender,
    ageReferenceDate,
  }) {
    if (!clinicPatientNumber) {
      throw new Error('Clinic Patient Number is required');
    }

    if (!dateOfBirth) {
      throw new Error('Date of Birth is required');
    }

    this.clinicPatientNumber = clinicPatientNumber;
    this.name = name;
    this.dateOfBirth = dateOfBirth;

    // AGE IS DERIVED — NEVER ACCEPTED AS AN AUTHORITATIVE INPUT.
    this.age = calculateAge(dateOfBirth, ageReferenceDate);

    this.profession = profession;
    this.pastHistory = pastHistory;
    this.phone = phone;
    this.gender = gender;
  }
}

module.exports = {
  Patient,
  calculateAge,
};
