import React from 'react';
import { mockClinicService } from './adapters/mockClinicService.js';

export default function App() {
  const clinicState = mockClinicService.getInitialState();

  return (
    <main className="app-shell">
      <header className="app-header">
        <h1>Dr.Roby Clinic</h1>
        <p>Clinic Web App</p>
      </header>

      <section className="app-status" aria-label="Application status">
        <strong>Frontend Foundation</strong>
        <span>Mock Runtime</span>
        <span>{clinicState.status}</span>
      </section>
    </main>
  );
}
