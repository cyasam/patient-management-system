export const fetchPatient = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/patients/${id}`, {
    cache: 'no-cache',
  });

  const { data } = await response.json();

  return data;
};

export const fetchPatientFiles = async (id: string) => {
  const response = await fetch(
    `http://localhost:3000/api/patients/${id}/upload`,
    {
      cache: 'no-cache',
    }
  );

  const { data } = await response.json();

  return data;
};

export const fetchPatientAppointments = async (doctorId: string) => {
  const response = await fetch(
    `http://localhost:3000/api/appointments?doctorId=${doctorId}`,
    {
      cache: 'no-cache',
    }
  );

  const { data } = await response.json();

  return data;
};

export const fetchPatientAppointmentsByPatientId = async (
  patientId: string,
  doctorId: string
) => {
  const response = await fetch(
    `http://localhost:3000/api/appointments?patientId=${patientId}&doctorId=${doctorId}`,
    {
      cache: 'no-cache',
    }
  );

  const { data } = await response.json();

  return data;
};
