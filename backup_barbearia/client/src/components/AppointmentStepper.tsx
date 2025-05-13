import React from "react";

interface AppointmentStepperProps {
  currentStep: number;
}

const AppointmentStepper: React.FC<AppointmentStepperProps> = ({ currentStep }) => {
  return (
    <div className="px-6 py-8 bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-4">Agende seu horário</h1>
        
        <div className="flex items-center w-full justify-between max-w-3xl">
          {/* Step 1: Barber */}
          <div className="flex flex-col items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                currentStep >= 1 
                  ? 'border-secondary bg-secondary text-white' 
                  : 'border-gray-300 text-gray-300'
              }`}
            >
              <i className="ri-user-3-line"></i>
            </div>
            <span 
              className={`text-xs mt-2 ${
                currentStep >= 1 ? 'text-primary' : 'text-gray-400'
              }`}
            >
              Barbeiro
            </span>
          </div>
          
          {/* Line */}
          <div 
            className={`h-1 flex-1 mx-2 ${
              currentStep >= 2 ? 'bg-secondary' : 'bg-gray-200'
            }`}
          ></div>
          
          {/* Step 2: Service */}
          <div className="flex flex-col items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                currentStep >= 2 
                  ? 'border-secondary bg-secondary text-white' 
                  : 'border-gray-300 text-gray-300'
              }`}
            >
              <i className="ri-scissors-line"></i>
            </div>
            <span 
              className={`text-xs mt-2 ${
                currentStep >= 2 ? 'text-primary' : 'text-gray-400'
              }`}
            >
              Serviço
            </span>
          </div>
          
          {/* Line */}
          <div 
            className={`h-1 flex-1 mx-2 ${
              currentStep >= 3 ? 'bg-secondary' : 'bg-gray-200'
            }`}
          ></div>
          
          {/* Step 3: Date/Time */}
          <div className="flex flex-col items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                currentStep >= 3 
                  ? 'border-secondary bg-secondary text-white' 
                  : 'border-gray-300 text-gray-300'
              }`}
            >
              <i className="ri-calendar-line"></i>
            </div>
            <span 
              className={`text-xs mt-2 ${
                currentStep >= 3 ? 'text-primary' : 'text-gray-400'
              }`}
            >
              Data/Hora
            </span>
          </div>
          
          {/* Line */}
          <div 
            className={`h-1 flex-1 mx-2 ${
              currentStep >= 4 ? 'bg-secondary' : 'bg-gray-200'
            }`}
          ></div>
          
          {/* Step 4: Confirm */}
          <div className="flex flex-col items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                currentStep >= 4 
                  ? 'border-secondary bg-secondary text-white' 
                  : 'border-gray-300 text-gray-300'
              }`}
            >
              <i className="ri-check-line"></i>
            </div>
            <span 
              className={`text-xs mt-2 ${
                currentStep >= 4 ? 'text-primary' : 'text-gray-400'
              }`}
            >
              Confirmar
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentStepper;
