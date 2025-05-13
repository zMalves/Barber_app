import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import AppointmentStepper from "@/components/AppointmentStepper";
import BarberList from "@/components/BarberList";
import ServiceList from "@/components/ServiceList";
import DateTimeSelection from "@/components/DateTimeSelection";
import ConfirmAppointment from "@/components/ConfirmAppointment";
import AppointmentSuccess from "@/components/AppointmentSuccess";
import { Button } from "@/components/ui/button";
import type { Barber, Service, Appointment } from "@shared/schema";

const AppointmentPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);

  const handleSelectBarber = (barber: Barber) => {
    setSelectedBarber(barber);
    setCurrentStep(2);
  };

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    setCurrentStep(3);
  };

  const handleSelectDateTime = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setCurrentStep(4);
  };

  const handleAppointmentConfirmed = (appointment: Appointment) => {
    setCreatedAppointment(appointment);
  };

  const handleCloseSuccessModal = () => {
    setCreatedAppointment(null);
    // Reset state for a new appointment
    setCurrentStep(1);
    setSelectedBarber(null);
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleGoBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <AppLayout>
      <AppointmentStepper currentStep={currentStep} />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Step 1: Select Barber */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-bold font-serif mb-6">Escolha seu barbeiro</h2>
            <BarberList onSelectBarber={handleSelectBarber} />
          </div>
        )}

        {/* Step 2: Select Service */}
        {currentStep === 2 && selectedBarber && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-serif">Escolha o serviço</h2>
              <Button
                variant="ghost"
                className="flex items-center text-secondary hover:text-secondary/90"
                onClick={handleGoBack}
              >
                <i className="ri-arrow-left-line mr-1"></i> Voltar
              </Button>
            </div>
            <ServiceList 
              onSelectService={handleSelectService} 
              selectedBarber={selectedBarber} 
            />
          </div>
        )}

        {/* Step 3: Select Date and Time */}
        {currentStep === 3 && selectedBarber && selectedService && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-serif">Escolha data e horário</h2>
              <Button
                variant="ghost"
                className="flex items-center text-secondary hover:text-secondary/90"
                onClick={handleGoBack}
              >
                <i className="ri-arrow-left-line mr-1"></i> Voltar
              </Button>
            </div>
            <DateTimeSelection 
              selectedBarber={selectedBarber} 
              selectedService={selectedService}
              onSelectDateTime={handleSelectDateTime}
            />
          </div>
        )}

        {/* Step 4: Confirm Appointment */}
        {currentStep === 4 && selectedBarber && selectedService && selectedDate && selectedTime && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-serif">Confirmar agendamento</h2>
              <Button
                variant="ghost"
                className="flex items-center text-secondary hover:text-secondary/90"
                onClick={handleGoBack}
              >
                <i className="ri-arrow-left-line mr-1"></i> Voltar
              </Button>
            </div>
            <ConfirmAppointment 
              selectedBarber={selectedBarber}
              selectedService={selectedService}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onAppointmentConfirmed={handleAppointmentConfirmed}
            />
          </div>
        )}
      </div>

      {createdAppointment && (
        <AppointmentSuccess 
          appointment={createdAppointment} 
          onClose={handleCloseSuccessModal} 
        />
      )}
    </AppLayout>
  );
};

export default AppointmentPage;
