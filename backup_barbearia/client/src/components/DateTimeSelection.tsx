import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { TimeSlot } from "@shared/schema";

interface DateTimeSelectionProps {
  selectedBarber: { id: number; name: string };
  selectedService: { id: number; name: string; duration: number };
  onSelectDateTime: (date: string, time: string) => void;
}

const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({ 
  selectedBarber, 
  selectedService, 
  onSelectDateTime 
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const formattedDate = selectedDate 
    ? format(selectedDate, "dd/MM/yyyy") 
    : "";

  const { data: timeSlots, isLoading } = useQuery<TimeSlot[]>({
    queryKey: ['/api/timeslots', { barberId: selectedBarber.id, date: formattedDate }],
    enabled: !!selectedDate,
  });

  const availableTimeSlots = timeSlots?.filter(slot => slot.available) || [];

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (selectedDate) {
      onSelectDateTime(formattedDate, time);
    }
  };

  // Format date for display in the calendar
  const formatCalendarDate = (date: Date) => {
    return format(date, "dd", { locale: ptBR });
  };

  return (
    <>
      <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white mr-4">
              <i className="ri-user-3-line text-xl"></i>
            </div>
            <div>
              <h3 className="font-bold">Barbeiro: {selectedBarber.name}</h3>
              <p className="text-gray-600 text-sm">Classico Barber Shop</p>
            </div>
          </div>
          <div className="flex items-center bg-gray-100 p-2 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white mr-2">
              <i className="ri-scissors-line"></i>
            </div>
            <div>
              <p className="text-sm font-medium">{selectedService.name}</p>
              <p className="text-xs text-gray-600">{selectedService.duration} min</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-bold mb-4">Selecione uma data</h3>
          
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            className="border-none"
            formatters={{ formatDay: formatCalendarDate }}
            locale={ptBR}
            disabled={{ before: new Date() }}
          />
          
          <div className="flex flex-wrap mt-3">
            <span className="inline-flex items-center mr-3 mb-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span> Disponível
            </span>
            <span className="inline-flex items-center mr-3 mb-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span> Ocupado
            </span>
            <span className="inline-flex items-center mb-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-secondary mr-1"></span> Selecionado
            </span>
          </div>
        </div>
        
        {/* Time Slots */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-bold mb-4">Selecione um horário</h3>
          
          {selectedDate ? (
            <>
              <p className="text-sm text-gray-600 mb-4">
                Data selecionada: {formattedDate}
              </p>
              
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary mx-auto mb-4"></div>
                  <p>Carregando horários disponíveis...</p>
                </div>
              ) : availableTimeSlots.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {availableTimeSlots.map((slot) => (
                    <Button
                      key={slot.id}
                      variant={selectedTime === slot.time ? "default" : "outline"}
                      className={`py-2 px-4 border rounded-md text-center transition ${
                        selectedTime === slot.time
                          ? "bg-secondary text-white border-secondary"
                          : "border-gray-200 hover:border-secondary hover:bg-secondary hover:text-white"
                      }`}
                      onClick={() => handleTimeSelect(slot.time)}
                    >
                      {slot.time}
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-center py-4 text-gray-500">
                  Não há horários disponíveis para esta data.
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-gray-600 mb-4">
              Selecione uma data primeiro
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default DateTimeSelection;
