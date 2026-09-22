const mockClinicState = {
  clinicDay: {
    date: '2026-09-22',
    status: 'OPEN',
    lifecycle: 'WORKING',
    counter: 3,
  },
  patients: [
    {
      id: 'P-001',
      name: 'Ahmed Hassan',
      cpn: 'CPN-1001',
      status: 'AWAITING_DOCTOR',
      caseId: 'C-001',
      caseStatus: 'AWAITING_DOCTOR',
      lastVisit: '2026-09-22',
    },
    {
      id: 'P-002',
      name: 'Mona Ali',
      cpn: 'CPN-1002',
      status: 'WITH_DOCTOR',
      caseId: 'C-002',
      caseStatus: 'WITH_DOCTOR',
      lastVisit: '2026-09-22',
    },
    {
      id: 'P-003',
      name: 'Omar Mahmoud',
      cpn: 'CPN-1003',
      status: 'CONTINUING',
      caseId: 'C-003',
      caseStatus: 'AWAITING_FOLLOW_UP',
      lastVisit: '2026-09-20',
    },
  ],
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function getClinicDashboard() {
  return clone(mockClinicState);
}

export function getInitialState() {
  return {
    status: 'READY',
    source: 'MOCK',
    ...getClinicDashboard(),
  };
}
