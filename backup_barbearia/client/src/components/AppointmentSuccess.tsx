import React from "react";
import { Button } from "@/components/ui/button";
import type { Appointment } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import type { Barber, Service } from "@shared/schema";

interface AppointmentSuccessProps {
  appointment: Appointment;
  onClose: () => void;
}

const AppointmentSuccess: React.FC<AppointmentSuccessProps> = ({ appointment, onClose }) => {
  const { data: barber } = useQuery<Barber>({
    queryKey: [`/api/barbers/${appointment.barberId}`],
  });

  const { data: service } = useQuery<Service>({
    queryKey: [`/api/services/${appointment.serviceId}`],
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 z-10 overflow-hidden">
        <div className="p-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <i className="ri-check-line text-green-500 text-3xl"></i>
          </div>
          <h3 className="text-xl font-bold text-center mb-2">Agendamento Confirmado!</h3>
          <p className="text-gray-600 text-center mb-6">Seu horário foi agendado com sucesso.</p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500">Barbeiro</p>
                <p className="font-medium">{barber?.name || appointment.barberId}</p>
              </div>
              <div>
                <p className="text-gray-500">Serviço</p>
                <p className="font-medium">{service?.name || appointment.serviceId}</p>
              </div>
              <div>
                <p className="text-gray-500">Data</p>
                <p className="font-medium">{appointment.date}</p>
              </div>
              <div>
                <p className="text-gray-500">Horário</p>
                <p className="font-medium">{appointment.time}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Button 
              className="bg-secondary hover:bg-secondary/90 text-white"
              onClick={onClose}
            >
              Fechar
            </Button>
            <Button 
              variant="link" 
              className="text-center text-secondary hover:text-secondary/90"
            >
              Adicionar ao Calendário
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSuccess;
