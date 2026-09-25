const { randomUUID } = require('node:crypto');

class PatientRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async allocateClinicPatientNumber(client = this.pool) {
    const result = await client.query(
      `SELECT 'CPN-' || nextval('clinic_patient_number_seq')::text AS clinic_patient_number`,
    );

    return result.rows[0].clinic_patient_number;
  }

  async createPatient(patient, client = this.pool) {
    const technicalPatientId = randomUUID();

    const result = await client.query(
      `INSERT INTO patients (
         patient_id,
         clinic_patient_number,
         name,
         age,
         profession,
         phone,
         gender
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING
         patient_id,
         clinic_patient_number,
         name,
         age,
         profession,
         phone,
         gender`,
      [
        technicalPatientId,
        patient.clinicPatientNumber,
        patient.name,
        patient.age,
        patient.profession,
        patient.phone,
        patient.gender,
      ],
    );

    return result.rows[0];
  }

  async findByTechnicalId(patientId, client = this.pool) {
    const result = await client.query(
      `SELECT
         patient_id,
         clinic_patient_number,
         name,
         age,
         profession,
         phone,
         gender
       FROM patients
       WHERE patient_id = $1`,
      [patientId],
    );

    return result.rows[0] ?? null;
  }
}

module.exports = { PatientRepository };
