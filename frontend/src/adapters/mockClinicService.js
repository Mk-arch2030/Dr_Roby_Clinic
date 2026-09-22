const clinicDay = {
  id: 'CD-2026-09-22',
  date: '2026-09-22',
  status: 'OPEN',
  lifecycle: 'WORKING',
  counter: 3,
};

const patients = [
  {
    id: 'P-001',
    name: 'Ahmed Hassan',
    cpn: 'CPN-1001',
    status: 'AWAITING_DOCTOR',
    caseId: 'C-001',
    caseState: 'AWAITING_DOCTOR',
    lastVisit: '2026-09-22',
  },
  {
    id: 'P-002',
    name: 'Mona Ali',
    cpn: 'CPN-1002',
    status: 'WITH_DOCTOR',
    caseId: 'C-002',
    caseState: 'WITH_DOCTOR',
    lastVisit: '2026-09-22',
  },
  {
    id: 'P-003',
    name: 'Omar Mahmoud',
    cpn: 'CPN-1003',
    status: 'CONTINUING',
    caseId: 'C-003',
    caseState: 'AWAITING_FOLLOW_UP',
    lastVisit: '2026-09-20',
  },
];

const visits = [
  {
    id: 'V-001',
    patientId: 'P-001',
    patientName: 'Ahmed Hassan',
    cpn: 'CPN-1001',
    caseId: 'C-001',
    clinicDayId: 'CD-2026-09-22',
    date: '2026-09-22',
    time: '09:10',
    visitType: 'Visit & Consultation',
    caseState: 'AWAITING_DOCTOR',
    protectionState: 'OPEN',
    operationalContext: 'Arrival recorded — waiting for Doctor',
    arrivalCondition: 'Normal',
    currentComplaint: 'Headache for two days',
    doctorContext: 'Doctor encounter pending',
    chronology: 'First recorded Visit for Case C-001',
  },
  {
    id: 'V-002',
    patientId: 'P-002',
    patientName: 'Mona Ali',
    cpn: 'CPN-1002',
    caseId: 'C-002',
    clinicDayId: 'CD-2026-09-22',
    date: '2026-09-22',
    time: '09:35',
    visitType: 'Visit & Consultation',
    caseState: 'WITH_DOCTOR',
    protectionState: 'OPEN',
    operationalContext: 'Doctor encounter in progress',
    arrivalCondition: 'Moderately Unwell',
    currentComplaint: 'Persistent cough',
    doctorContext: 'Patient currently with Doctor',
    chronology: 'First recorded Visit for Case C-002',
  },
  {
    id: 'V-003',
    patientId: 'P-003',
    patientName: 'Omar Mahmoud',
    cpn: 'CPN-1003',
    caseId: 'C-003',
    clinicDayId: 'CD-2026-09-22',
    date: '2026-09-22',
    time: '10:05',
    visitType: 'Visit & Consultation',
    caseState: 'AWAITING_FOLLOW_UP',
    protectionState: 'PROTECTED',
    operationalContext: 'Recorded Visit — follow-up continuity',
    arrivalCondition: 'Normal',
    currentComplaint: 'Follow-up review',
    doctorContext: 'Previous clinical encounter preserved',
    chronology: 'Follow-up Visit; previous Visits remain preserved',
  },
];

const clinicalHistory = {
  'P-001': [
    {
      visitId: 'V-001',
      date: '2026-09-22',
      summary: 'Current Visit — headache for two days',
    },
  ],
  'P-002': [
    {
      visitId: 'V-002',
      date: '2026-09-22',
      summary: 'Current Visit — persistent cough',
    },
  ],
  'P-003': [
    {
      visitId: 'V-003',
      date: '2026-09-22',
      summary: 'Follow-up review',
    },
    {
      visitId: 'V-004',
      date: '2026-09-20',
      summary: 'Previous Visit preserved in chronology',
    },
  ],
};

const clone = (value) => JSON.parse(JSON.stringify(value));

export function getClinicDashboard() {
  return clone({
    clinicDay,
    patients,
    visits: visits.filter((visit) => visit.clinicDayId === clinicDay.id),
  });
}

export function getVisitDetails(visitId) {
  const visit = visits.find((item) => item.id === visitId);

  if (!visit) {
    return null;
  }

  const patient = patients.find((item) => item.id === visit.patientId);

  return clone({
    visit,
    patient,
    clinicalHistory: clinicalHistory[visit.patientId] || [],
  });
}

export function getInitialState() {
  return getClinicDashboard();
}


export function getVisitInspection(visitId) {
  const dashboard = getClinicDashboard()
  const visit = dashboard.visits.find((item) => item.id === visitId)

  if (!visit) {
    return null
  }

  const patient = dashboard.patients.find((item) => item.id === visit.patientId)

  return {
    visit,
    patient: patient || null,
    caseContext: patient
      ? {
          id: patient.caseId,
          workflowState: visit.caseState,
        }
      : null,
    clinicDay: dashboard.clinicDay,
    clinicalHistory: visit.clinicalHistory || [],
  }
}
