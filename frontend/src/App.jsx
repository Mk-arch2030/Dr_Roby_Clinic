import { useMemo, useState } from 'react';
import { getClinicDashboard } from './adapters/mockClinicService';

const statusLabels = {
  AWAITING_DOCTOR: 'Awaiting Doctor',
  WITH_DOCTOR: 'With Doctor',
  CONTINUING: 'Continuing',
};

const caseStatusLabels = {
  AWAITING_DOCTOR: 'Awaiting Doctor',
  WITH_DOCTOR: 'With Doctor',
  AWAITING_FOLLOW_UP: 'Awaiting Follow-up',
};

function App() {
  const clinic = useMemo(() => getClinicDashboard(), []);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const selectedPatient =
    clinic.patients.find((patient) => patient.id === selectedPatientId) ?? null;

  const awaitingDoctor = clinic.patients.filter(
    (patient) => patient.status === 'AWAITING_DOCTOR'
  );

  const withDoctor = clinic.patients.filter(
    (patient) => patient.status === 'WITH_DOCTOR'
  );

  const continuing = clinic.patients.filter(
    (patient) => patient.status === 'CONTINUING'
  );

  return (
    <main className="clinic-app">
      <header className="clinic-header">
        <div>
          <p className="eyebrow">CLINIC WEB APP</p>
          <h1>Dr.Roby Clinic</h1>
          <p className="header-subtitle">Doctor Entry</p>
        </div>

        <div className="runtime-badge">
          <span className="status-dot" />
          MOCK RUNTIME
        </div>
      </header>

      <section className="clinic-day-card" aria-label="Current Clinic Day">
        <div>
          <p className="section-label">CURRENT CLINIC DAY</p>
          <h2>{clinic.clinicDay.date}</h2>
          <p className="muted">
            Status: {clinic.clinicDay.status} · Lifecycle:{' '}
            {clinic.clinicDay.lifecycle}
          </p>
        </div>

        <div className="day-counter" aria-label="Clinic Day counter">
          <strong>{clinic.clinicDay.counter}</strong>
          <span>Patients</span>
        </div>
      </section>

      <section className="entry-actions" aria-label="Clinic entry actions">
        <button type="button" onClick={() => setSelectedPatientId(null)}>
          Patients
        </button>
        <button type="button" onClick={() => setSelectedPatientId(null)}>
          Patient Data
        </button>
        <button type="button" onClick={() => setSelectedPatientId(null)}>
          New Patient
        </button>
      </section>

      <section className="dashboard-grid">
        <div className="patient-worklist">
          <div className="section-heading">
            <div>
              <p className="section-label">TODAY</p>
              <h2>Clinic Patients</h2>
            </div>
            <span className="count-badge">{clinic.patients.length}</span>
          </div>

          <div className="patient-groups">
            <PatientGroup
              title="Awaiting Doctor"
              patients={awaitingDoctor}
              onSelect={setSelectedPatientId}
              selectedPatientId={selectedPatientId}
            />

            <PatientGroup
              title="With Doctor"
              patients={withDoctor}
              onSelect={setSelectedPatientId}
              selectedPatientId={selectedPatientId}
            />

            <PatientGroup
              title="Continuing Patients / Cases"
              patients={continuing}
              onSelect={setSelectedPatientId}
              selectedPatientId={selectedPatientId}
            />
          </div>
        </div>

        <aside className="patient-inspection" aria-label="Selected Patient">
          <div className="section-heading">
            <div>
              <p className="section-label">PATIENT INSPECTION</p>
              <h2>Selected Patient</h2>
            </div>
          </div>

          {selectedPatient ? (
            <div className="inspection-content">
              <h3>{selectedPatient.name}</h3>

              <dl>
                <div>
                  <dt>Patient ID</dt>
                  <dd>{selectedPatient.id}</dd>
                </div>
                <div>
                  <dt>CPN</dt>
                  <dd>{selectedPatient.cpn}</dd>
                </div>
                <div>
                  <dt>Patient Status</dt>
                  <dd>{statusLabels[selectedPatient.status]}</dd>
                </div>
                <div>
                  <dt>Case</dt>
                  <dd>{selectedPatient.caseId}</dd>
                </div>
                <div>
                  <dt>Case Status</dt>
                  <dd>{caseStatusLabels[selectedPatient.caseStatus]}</dd>
                </div>
                <div>
                  <dt>Last Visit</dt>
                  <dd>{selectedPatient.lastVisit}</dd>
                </div>
              </dl>

              <div className="relationship">
                Patient → Case → Visit → Clinic Day
              </div>
            </div>
          ) : (
            <div className="empty-selection">
              <strong>No patient selected</strong>
              <p>
                Select a patient to inspect stable identity and continuing
                Case context.
              </p>
            </div>
          )}
        </aside>
      </section>

      <footer className="clinic-footer">
        <span>Frontend Foundation · Increment 01</span>
        <span>Data Source: Mock Adapter</span>
      </footer>
    </main>
  );
}

function PatientGroup({ title, patients, onSelect, selectedPatientId }) {
  return (
    <section className="patient-group">
      <div className="group-heading">
        <h3>{title}</h3>
        <span>{patients.length}</span>
      </div>

      {patients.length === 0 ? (
        <p className="group-empty">No patients in this group.</p>
      ) : (
        <div className="patient-list">
          {patients.map((patient) => (
            <button
              className={`patient-row ${
                patient.id === selectedPatientId ? 'selected' : ''
              }`}
              key={patient.id}
              type="button"
              onClick={() => onSelect(patient.id)}
            >
              <span>
                <strong>{patient.name}</strong>
                <small>{patient.cpn}</small>
              </span>
              <span className="patient-case">
                {patient.caseId}
              </span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export default App;
