import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import SimpleHeader from "@/components/SimpleHeader";
import type { Barber, Service, TimeSlot, Appointment } from "@shared/schema";

// Form schema for customer information
const formSchema = z.object({
  customerName: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  customerPhone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  customerEmail: z.string().email("E-mail inválido"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const OnePageAppointment: React.FC = () => {
  // States for the selected items
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const [step, setStep] = useState<"barber" | "service" | "datetime" | "confirm" | "success">("barber");
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);
  
  const { toast } = useToast();
  
  // Format date for API calls
  const formattedDate = selectedDate 
    ? format(selectedDate, "dd/MM/yyyy") 
    : "";
    
  // Fetch barbers
  const { data: barbers, isLoading: loadingBarbers } = useQuery<Barber[]>({
    queryKey: ['/api/barbers'],
  });
  
  // Fetch services
  const { data: services, isLoading: loadingServices } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });
  
  // Fetch time slots
  const { data: timeSlots, isLoading: loadingTimeSlots } = useQuery<TimeSlot[]>({
    queryKey: ['/api/timeslots'],
    queryFn: async () => {
      if (!selectedBarber || !selectedDate) return [];
      const response = await fetch(`/api/timeslots?barberId=${selectedBarber.id}&date=${formattedDate}`);
      if (!response.ok) throw new Error('Failed to fetch time slots');
      return response.json();
    },
    enabled: !!selectedBarber && !!selectedDate,
  });
  
  // Available time slots
  const availableTimeSlots = timeSlots?.filter(slot => slot.available) || [];

  // Form setup with loading saved data from localStorage
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      notes: "",
    },
  });
  
  // Load saved customer information from localStorage
  useEffect(() => {
    const savedCustomerInfo = localStorage.getItem('customerInfo');
    if (savedCustomerInfo) {
      const parsedInfo = JSON.parse(savedCustomerInfo);
      form.reset({
        customerName: parsedInfo.customerName || "",
        customerPhone: parsedInfo.customerPhone || "",
        customerEmail: parsedInfo.customerEmail || "",
        notes: parsedInfo.notes || "",
      });
    }
  }, [form]);
  
  // Create appointment mutation
  const createAppointment = useMutation({
    mutationFn: (data: FormValues) => {
      if (!selectedBarber || !selectedService || !selectedTime) {
        throw new Error("Informações de agendamento incompletas");
      }
      
      const appointmentData = {
        barberId: selectedBarber.id,
        serviceId: selectedService.id,
        date: formattedDate,
        time: selectedTime,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail,
        notes: data.notes || "",
      };
      
      return apiRequest("POST", "/api/appointments", appointmentData);
    },
    onSuccess: async (response) => {
      const appointment = await response.json();
      setCreatedAppointment(appointment);
      setStep("success");
      
      toast({
        title: "Agendamento confirmado!",
        description: "Seu horário foi agendado com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao agendar",
        description: error.message || "Ocorreu um erro ao confirmar o agendamento. Tente novamente.",
        variant: "destructive",
      });
    },
  });
  
  // Handle barber selection
  const handleSelectBarber = (barber: Barber) => {
    setSelectedBarber(barber);
    setStep("service");
  };
  
  // Handle service selection
  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    setStep("datetime");
  };
  
  // Handle time selection
  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    setStep("confirm");
  };
  
  // Handle form submission
  const onSubmit = (data: FormValues) => {
    // Save customer information to localStorage
    localStorage.setItem('customerInfo', JSON.stringify({
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerEmail: data.customerEmail,
      notes: data.notes
    }));
    
    createAppointment.mutate(data);
  };
  
  // Format price from cents to reais
  const formatPrice = (price: number) => {
    return `R$ ${(price / 100).toFixed(2).replace(".", ",")}`;
  };
  
  // Handle going back
  const handleBack = () => {
    switch (step) {
      case "service":
        setStep("barber");
        break;
      case "datetime":
        setStep("service");
        break;
      case "confirm":
        setStep("datetime");
        break;
      default:
        break;
    }
  };
  
  // Handle starting a new appointment
  const handleNewAppointment = () => {
    setSelectedBarber(null);
    setSelectedService(null);
    setSelectedDate(new Date());
    setSelectedTime(null);
    setCreatedAppointment(null);
    setStep("barber");
    form.reset();
  };
  
  return (
    <div>
      <SimpleHeader />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Agendamento Online</h1>
          <p className="text-muted-foreground">Agende seu horário com nossos profissionais</p>
          
          {/* Progress Indicator */}
          {step !== "success" && (
            <div className="flex items-center justify-center mt-6 w-full max-w-sm mx-auto">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === "barber" ? "step-active" : "step-completed bg-gray-200"}`}>
                1
              </div>
              <div className={`h-1 flex-1 mx-2 ${step !== "barber" ? "bg-primary" : "bg-gray-200"}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === "service" ? "step-active" : step === "barber" ? "step-inactive" : "step-completed bg-gray-200"}`}>
                2
              </div>
              <div className={`h-1 flex-1 mx-2 ${step === "datetime" || step === "confirm" ? "bg-primary" : "bg-gray-200"}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === "datetime" ? "step-active" : step === "barber" || step === "service" ? "step-inactive" : "step-completed bg-gray-200"}`}>
                3
              </div>
              <div className={`h-1 flex-1 mx-2 ${step === "confirm" ? "bg-primary" : "bg-gray-200"}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === "confirm" ? "step-active" : "step-inactive"}`}>
                4
              </div>
            </div>
          )}
        </header>
        
        <div className="mt-8">
          {/* Step 1: Select Barber */}
          {step === "barber" && (
            <div className="fade-in">
              <h2 className="text-xl font-bold mb-6 text-center">Escolha um barbeiro</h2>
              
              {loadingBarbers ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="p-2 shadow-sm h-40 animate-pulse">
                      <div className="flex items-center justify-center h-full">
                        <div className="w-20 h-20 bg-gray-200 rounded-full mb-2"></div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {barbers?.map((barber) => (
                    <Card 
                      key={barber.id}
                      className="card-minimal p-4 cursor-pointer"
                      onClick={() => handleSelectBarber(barber)}
                    >
                      <CardContent className="p-0 text-center">
                        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-3">
                          <img 
                            src={barber.imageUrl} 
                            alt={barber.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="font-bold text-lg">{barber.name}</h3>
                        <p className="text-sm text-gray-500">{barber.title}</p>
                        
                        <div className="flex items-center justify-center text-sm mt-2">
                          <div className="flex items-center text-yellow-500 mr-1">
                            <i className="ri-star-fill"></i>
                          </div>
                          <span>{barber.rating}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Step 2: Select Service */}
          {step === "service" && selectedBarber && (
            <div className="fade-in">
              <div className="flex items-center mb-6">
                <Button 
                  onClick={handleBack}
                  variant="ghost" 
                  size="sm" 
                  className="mr-2"
                >
                  <i className="ri-arrow-left-line mr-1"></i>
                </Button>
                <h2 className="text-xl font-bold">Escolha um serviço</h2>
              </div>
              
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={selectedBarber.imageUrl} 
                      alt={selectedBarber.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">Barbeiro: {selectedBarber.name}</h3>
                    <p className="text-sm text-gray-500">{selectedBarber.title}</p>
                  </div>
                </div>
              </div>
              
              {loadingServices ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="p-4 animate-pulse">
                      <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {services?.map((service) => (
                    <Card
                      key={service.id}
                      className="card-minimal p-4 cursor-pointer flex justify-between items-center"
                      onClick={() => handleSelectService(service)}
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary mr-4">
                          <i className={service.icon}></i>
                        </div>
                        <div>
                          <h3 className="font-bold">{service.name}</h3>
                          <p className="text-sm text-gray-500">{service.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-primary">{formatPrice(service.price)}</span>
                        <p className="text-xs text-gray-500">{service.duration} min</p>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Step 3: Select Date and Time */}
          {step === "datetime" && selectedBarber && selectedService && (
            <div className="fade-in">
              <div className="flex items-center mb-6">
                <Button 
                  onClick={handleBack}
                  variant="ghost" 
                  size="sm" 
                  className="mr-2"
                >
                  <i className="ri-arrow-left-line mr-1"></i>
                </Button>
                <h2 className="text-xl font-bold">Escolha data e horário</h2>
              </div>
              
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <img 
                        src={selectedBarber.imageUrl} 
                        alt={selectedBarber.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Barbeiro</p>
                      <p className="font-medium">{selectedBarber.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary mr-3">
                      <i className={selectedService.icon}></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Serviço</p>
                      <p className="font-medium">{selectedService.name} ({formatPrice(selectedService.price)})</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Calendar */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="font-medium mb-4">Data</h3>
                  
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="border-none"
                    locale={ptBR}
                    disabled={{ before: new Date() }}
                  />
                </div>
                
                {/* Time Slots */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="font-medium mb-4">Horário</h3>
                  
                  {selectedDate ? (
                    <>
                      <p className="text-sm text-gray-500 mb-4">
                        Data selecionada: {formattedDate}
                      </p>
                      
                      {loadingTimeSlots ? (
                        <div className="flex justify-center py-6">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                        </div>
                      ) : availableTimeSlots.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2">
                          {availableTimeSlots.map((slot) => (
                            <Button
                              key={slot.id}
                              variant={selectedTime === slot.time ? "default" : "outline"}
                              className={`py-2 px-3 text-sm ${
                                selectedTime === slot.time
                                  ? "bg-primary text-white"
                                  : "hover:border-primary hover:text-primary"
                              }`}
                              onClick={() => handleSelectTime(slot.time)}
                            >
                              {slot.time}
                            </Button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center py-6 text-gray-500">
                          Não há horários disponíveis para esta data.
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-center py-6 text-gray-500">
                      Selecione uma data primeiro
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Step 4: Confirm Appointment */}
          {step === "confirm" && selectedBarber && selectedService && selectedTime && (
            <div className="fade-in">
              <div className="flex items-center mb-6">
                <Button 
                  onClick={handleBack}
                  variant="ghost" 
                  size="sm" 
                  className="mr-2"
                >
                  <i className="ri-arrow-left-line mr-1"></i>
                </Button>
                <h2 className="text-xl font-bold">Confirmar agendamento</h2>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-4">Resumo do agendamento</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Barbeiro</p>
                      <p className="font-bold">{selectedBarber.name}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Serviço</p>
                      <p className="font-bold">{selectedService.name}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Data</p>
                      <p className="font-bold">{formattedDate}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Horário</p>
                      <p className="font-bold">{selectedTime}</p>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <h3 className="text-lg font-bold mb-4">Suas informações</h3>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="customerName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                  <Input placeholder="Seu nome completo" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="customerPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Telefone</FormLabel>
                                <FormControl>
                                  <Input placeholder="(00) 00000-0000" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="customerEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>E-mail</FormLabel>
                              <FormControl>
                                <Input placeholder="seu@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="notes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Observações (opcional)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Alguma observação importante?" 
                                  className="resize-none" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex justify-between items-center pt-4">
                          <div>
                            <span className="block text-sm text-gray-600">Valor total</span>
                            <span className="text-xl font-bold text-primary">{formatPrice(selectedService.price)}</span>
                          </div>
                          <Button 
                            type="submit" 
                            className="bg-primary hover:bg-primary/90"
                            disabled={createAppointment.isPending}
                          >
                            {createAppointment.isPending ? (
                              <>
                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                Processando...
                              </>
                            ) : (
                              "Confirmar Agendamento"
                            )}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Success Step */}
          {step === "success" && createdAppointment && (
            <div className="fade-in">
              <div className="bg-white rounded-lg shadow-sm max-w-md mx-auto overflow-hidden">
                <div className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-green-500 text-3xl"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Agendamento Confirmado!</h3>
                  <p className="text-gray-600 mb-6">Seu horário foi agendado com sucesso.</p>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500">Barbeiro</p>
                        <p className="font-medium">{selectedBarber?.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Serviço</p>
                        <p className="font-medium">{selectedService?.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Data</p>
                        <p className="font-medium">{createdAppointment.date}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Horário</p>
                        <p className="font-medium">{createdAppointment.time}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mb-2"
                    onClick={handleNewAppointment}
                  >
                    Fazer Novo Agendamento
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <i className="ri-calendar-line mr-2"></i>
                    Adicionar ao Calendário
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnePageAppointment;