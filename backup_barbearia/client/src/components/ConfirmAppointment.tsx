import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Barber, Service, Appointment } from "@shared/schema";

interface ConfirmAppointmentProps {
  selectedBarber: Barber;
  selectedService: Service;
  selectedDate: string;
  selectedTime: string;
  onAppointmentConfirmed: (appointment: Appointment) => void;
}

const formSchema = z.object({
  customerName: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  customerPhone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  customerEmail: z.string().email("E-mail inválido"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ConfirmAppointment: React.FC<ConfirmAppointmentProps> = ({
  selectedBarber,
  selectedService,
  selectedDate,
  selectedTime,
  onAppointmentConfirmed,
}) => {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      notes: "",
    },
  });

  const createAppointment = useMutation({
    mutationFn: (data: FormValues) => {
      const appointmentData = {
        barberId: selectedBarber.id,
        serviceId: selectedService.id,
        date: selectedDate,
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
      onAppointmentConfirmed(appointment);
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

  const onSubmit = (data: FormValues) => {
    createAppointment.mutate(data);
  };

  // Format price from cents to reais
  const formatPrice = (price: number) => {
    return `R$ ${(price / 100).toFixed(2).replace(".", ",")}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="p-6">
        <h3 className="text-lg font-bold mb-4">Resumo do agendamento</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex items-start">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white mr-4 mt-1">
              <i className="ri-user-3-line text-xl"></i>
            </div>
            <div>
              <h4 className="font-medium text-gray-500">Barbeiro</h4>
              <p className="font-bold text-lg">{selectedBarber.name}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white mr-4 mt-1">
              <i className="ri-scissors-line text-xl"></i>
            </div>
            <div>
              <h4 className="font-medium text-gray-500">Serviço</h4>
              <p className="font-bold text-lg">{selectedService.name}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white mr-4 mt-1">
              <i className="ri-calendar-line text-xl"></i>
            </div>
            <div>
              <h4 className="font-medium text-gray-500">Data</h4>
              <p className="font-bold text-lg">{selectedDate}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white mr-4 mt-1">
              <i className="ri-time-line text-xl"></i>
            </div>
            <div>
              <h4 className="font-medium text-gray-500">Horário</h4>
              <p className="font-bold text-lg">{selectedTime}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t">
          <h3 className="text-lg font-bold mb-4">Suas informações</h3>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              
              <FormField
                control={form.control}
                name="customerEmail"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
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
                  <FormItem className="md:col-span-2">
                    <FormLabel>Observações</FormLabel>
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
              
              <div className="md:col-span-2 mt-4">
                <div className="bg-gray-50 px-6 py-3 -mx-6 -mb-6 flex justify-between items-center">
                  <div>
                    <span className="block text-sm text-gray-600">Valor total</span>
                    <span className="text-2xl font-bold text-secondary">{formatPrice(selectedService.price)}</span>
                  </div>
                  <Button 
                    type="submit" 
                    className="bg-secondary hover:bg-secondary/90 text-white"
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
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAppointment;
