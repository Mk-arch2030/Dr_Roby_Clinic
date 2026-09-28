const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  return response.text();
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const payload = await parseResponse(response);

  if (!response.ok) {
    const error = new Error(
      payload?.error || `Patient API request failed: ${response.status}`,
    );

    error.status = response.status;
    error.payload = payload;

    throw error;
  }

  return payload;
}

export async function registerPatient({
  name,
  dateOfBirth,
  profession,
  phone,
  gender,
}) {
  return request('/patients', {
    method: 'POST',
    body: JSON.stringify({
      name,
      dateOfBirth,
      profession,
      phone,
      gender,
    }),
  });
}

export async function getPatient(patientId) {
  return request(`/patients/${encodeURIComponent(patientId)}`, {
    method: 'GET',
  });
}
