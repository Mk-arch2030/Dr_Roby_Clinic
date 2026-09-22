import { useMemo, useState } from 'react';
import {
  getClinicDashboard,
  getVisitDetails,
} from './adapters/mockClinicService';
import './styles/app.css';

function App() {
  const dashboard = useMemo(() => getClinicDashboard(), []);
  const [selectedVisitId, setSelectedVisitId] = useState(null);

  const selectedVisit = selectedVisitId
    ? getVisitDetails(selectedVisitId)
    : null;

  const awaitingDoctor = dashboard.visits.filter(
    (visit) => visit.caseState === 'AWAITING_DOCTOR'
  );

  const withDoctor = dashboard.visits.filter(
    (visit) => visit.caseState === 'WITH_DOCTOR'
  );

  const continuing = dashboard.visits.filter(
    (visit) => visit.caseState === 'AWAITING_FOLLOW_UP'
  );

  const patient = selectedVisit?.patient;
  const visit = selectedVisit?.visit;

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">DR.ROBY CLINIC</p>
          <h1>Doctor Entry</h1>
          <p className="subtitle">
            Clinic Day operational view with recorded Visits
          </p>
        </div>
        <span className="runtime-badge">MOCK RUNTIME</span>
      </header>

      <section className="clinic-day-card">
        <div>
          <p className="section-label">CURRENT CLINIC DAY</p>
          <h2>{dashboard.clinicDay.date}</h2>
          <div className="meta-row">
            <span>Status: {dashboard.clinicDay.status}</span>
            <span>Lifecycle: {dashboard.clinicDay.lifecycle}</span>
            <span>Daily Count: {dashboard.clinicDay.counter}</span>
          </div>
        </div>
        <div className="day-id">
          <strong>{dashboard.clinicDay.id}</strong>
          <span>Recorded Visits: {dashboard.visits.length}</span>
        </div>
      </section>

      <nav className="entry-actions" aria-label="Doctor entry">
        <button type="button" onClick={() => setSelectedVisitId(null)}>
          Patients
        </button>
        <button type="button" onClick={() => setSelectedVisitId(null)}>
          Patient Data
        </button>
        <button type="button" onClick={() => setSelectedVisitId(null)}>
          New Patient
        </button>
      </nav>

      <section className="layout-grid">
        <div className="main-column">
          <section className="panel">
            <div className="panel-heading">
              <div>
                <p className="section-label">CLINIC DAY VISITS</p>
                <h2>Recorded Visits</h2>
              </div>
              <span className="count-badge">{dashboard.visits.length}</span>
            </div>

            <p className="helper-text">
              Each Visit remains distinct and preserves its Patient, Case,
              Clinic Day, chronology, and existing context.
            </p>

            <VisitGroup
              title="Awaiting Doctor"
              visits={awaitingDoctor}
              selectedVisitId={selectedVisitId}
              onSelect={setSelectedVisitId}
            />

            <VisitGroup
              title="With Doctor"
              visits={withDoctor}
              selectedVisitId={selectedVisitId}
              onSelect={setSelectedVisitId}
            />

            <VisitGroup
              title="Continuing Patients / Cases"
              visits={continuing}
              selectedVisitId={selectedVisitId}
              onSelect={setSelectedVisitId}
            />
          </section>
        </div>

        <aside className="side-column">
          <section className="panel detail-panel">
            <div className="panel-heading">
              <div>
                <p className="section-label">SELECTED VISIT</p>
                <h2>Visit Inspection</h2>
              </div>
              {visit && (
                <span className="count-badge">{visit.id}</span>
              )}
            </div>

            {!visit ? (
              <div className="empty-state">
                <strong>Select a Visit</strong>
                <p>
                  Choose a recorded Visit from the Clinic Day to inspect its
                  organized details and continuity.
                </p>
              </div>
            ) : (
              <>
                <section className="inspection-summary" aria-label="Visit Inspection Summary">
                    <div className="section-heading">
                      <div>
                        <p className="eyebrow">DOCTOR INSPECTION</p>
                        <h3>Inspection Summary</h3>
                      </div>
                      <span className="derived-badge">READ-ONLY CONTEXT</span>
                    </div>

                    <div className="inspection-grid">
                      <div>
                        <span>Patient</span>
                        <strong>{patient.name}</strong>
                      </div>
                      <div>
                        <span>Case</span>
                        <strong>{visit.caseId}</strong>
                      </div>
                      <div>
                        <span>Visit</span>
                        <strong>{visit.id}</strong>
                      </div>
                      <div>
                        <span>Clinic Day</span>
                        <strong>{visit.clinicDayId}</strong>
                      </div>
                      <div>
                        <span>Case Workflow</span>
                        <strong>{visit.caseState}</strong>
                      </div>
                      <div>
                        <span>Protection</span>
                        <strong>{visit.protectionState}</strong>
                      </div>
                    </div>
                  </section>

                  <section className="patient-journey-continuity" aria-label="Patient Journey Continuity">
                    <div className="section-heading">
                      <div>
                        <p className="eyebrow">PATIENT JOURNEY</p>
                        <h3>Patient Journey Continuity</h3>
                      </div>
                      <span className="derived-badge">READ-ONLY</span>
                    </div>

                    <div className="continuity-summary">
                      <div>
                        <span>Patient</span>
                        <strong>{patient.name}</strong>
                      </div>
                      <div>
                        <span>Case</span>
                        <strong>{visit.caseId}</strong>
                      </div>
                      <div>
                        <span>Recorded Visits</span>
                        <strong>{selectedVisit.clinicalHistory.length}</strong>
                      </div>
                      <div>
                        <span>Current Clinic Day</span>
                        <strong>{visit.clinicDayId}</strong>
                      </div>
                    </div>

                    <div className="journey-timeline">
                      {selectedVisit.clinicalHistory.map((historyVisit) => (
                        <article className="journey-entry" key={historyVisit.id}>
                          <div className="journey-entry-head">
                            <strong>{historyVisit.id}</strong>
                            <span>{historyVisit.clinicDayId}</span>
                          </div>
                          <div className="journey-entry-meta">
                            <span>{historyVisit.date}</span>
                            <span>{historyVisit.time}</span>
                            <span>{historyVisit.visitType}</span>
                            <span>{historyVisit.protectionState}</span>
                          </div>
                          <p>
                            {historyVisit.currentComplaint ||
                              "No current complaint recorded."}
                          </p>
                        </article>
                      ))}
                    </div>

                    <div className="relationship-strip">
                      Patient → Case → Visit → Clinic Day
                    </div>
                  </section>

                  <div className="identity-block">
                  <strong>{patient.name}</strong>
                  <span>
                    {patient.id} · {patient.cpn}
                  </span>
                </div>

                <div className="detail-grid">
                  <Detail label="Case" value={visit.caseId} />
                  <Detail
                    label="Clinic Day"
                    value={visit.clinicDayId}
                  />
                  <Detail label="Date" value={visit.date} />
                  <Detail label="Time" value={visit.time} />
                  <Detail label="Visit Type" value={visit.visitType} />
                  <Detail label="Case Workflow" value={visit.caseState} />
                  <Detail
                    label="Protection"
                    value={visit.protectionState}
                  />
                  <Detail
                    label="Arrival Condition"
                    value={visit.arrivalCondition}
                  />
                </div>

                <div className="detail-section">
                  <span className="detail-label">Operational Context</span>
                  <p>{visit.operationalContext}</p>
                </div>

                <div className="detail-section">
                  <span className="detail-label">Current Complaint</span>
                  <p>{visit.currentComplaint}</p>
                </div>

                <div className="detail-section">
                  <span className="detail-label">Doctor Context</span>
                  <p>{visit.doctorContext}</p>
                </div>

                <div className="detail-section">
                  <span className="detail-label">Visit Chronology</span>
                  <p>{visit.chronology}</p>
                </div>

                <div className="history-block">
                  <div className="history-heading">
                    <span className="detail-label">Clinical History</span>
                    <span className="derived-badge">DERIVED FROM VISITS</span>
                  </div>

                  {selectedVisit.clinicalHistory.map((item) => (
                    <div className="history-item" key={item.visitId}>
                      <strong>{item.visitId}</strong>
                      <span>{item.date}</span>
                      <p>{item.summary}</p>
                    </div>
                  ))}
                </div>

                <div className="relationship">
                  Patient → Case → Visit → Clinic Day
                </div>
              </>
            )}
          </section>
        </aside>
      </section>

      <footer>
        Doctor Clinical Authority · Nurse delegated boundary preserved ·
        Frontend → Service Boundary → Mock Adapter
      </footer>
    </main>
  );
}

function VisitGroup({ title, visits, selectedVisitId, onSelect }) {
  return (
    <section className="visit-group">
      <div className="group-heading">
        <h3>{title}</h3>
        <span>{visits.length}</span>
      </div>

      {visits.length === 0 ? (
        <div className="group-empty">No recorded Visits in this group.</div>
      ) : (
        <div className="visit-list">
          {visits.map((visit) => (
            <button
              type="button"
              className={`visit-card ${
                selectedVisitId === visit.id ? 'selected' : ''
              }`}
              key={visit.id}
              onClick={() => onSelect(visit.id)}
            >
              <div className="visit-card-top">
                <strong>{visit.id}</strong>
                <span>{visit.time}</span>
              </div>
              <strong>{visit.patientName}</strong>
              <span>
                {visit.caseId} · {visit.visitType}
              </span>
              <div className="visit-context-row">
                <span>Case: {visit.caseState}</span>
                <span>Protection: {visit.protectionState}</span>
              </div>
              <small>{visit.operationalContext}</small>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

function Detail({ label, value }) {
  return (
    <div className="detail-item">
      <span className="detail-label">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default App;
