const { Patient } = require('../../domain/patient');

async function registerNewPatient({
  name,
  age,
  profession,
  phone,
  gender,
  repository,
  pool,
}) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const clinicPatientNumber =
      await repository.allocateClinicPatientNumber(client);

    const patient = new Patient({
      clinicPatientNumber,
      name,
      age,
      profession,
      phone,
      gender,
    });

    await repository.createPatient(patient, client);

    await client.query('COMMIT');

    return patient;
  } catch (error) {
    try {
      await client.query('ROLLBACK');
    } catch {}
    throw error;
  } finally {
    client.release();
  }
}

module.exports = { registerNewPatient };
