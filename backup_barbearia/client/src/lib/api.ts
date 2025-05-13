import { queryClient } from "./queryClient";

export const fetchBarbers = async () => {
  const response = await fetch("/api/barbers", {
    credentials: "include",
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch barbers: ${response.status}`);
  }
  
  return response.json();
};

export const fetchBarber = async (id: number) => {
  const response = await fetch(`/api/barbers/${id}`, {
    credentials: "include",
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch barber: ${response.status}`);
  }
  
  return response.json();
};

export const fetchServices = async () => {
  const response = await fetch("/api/services", {
    credentials: "include",
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch services: ${response.status}`);
  }
  
  return response.json();
};

export const fetchTimeSlots = async (barberId: number, date: string) => {
  const response = await fetch(`/api/timeslots?barberId=${barberId}&date=${date}`, {
    credentials: "include",
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch time slots: ${response.status}`);
  }
  
  return response.json();
};

export const createAppointment = async (appointmentData: any) => {
  const response = await fetch("/api/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointmentData),
    credentials: "include",
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Failed to create appointment: ${response.status}`);
  }
  
  // Invalidate any queries that might need to be updated
  queryClient.invalidateQueries({
    queryKey: ['/api/timeslots'],
  });
  
  return response.json();
};
