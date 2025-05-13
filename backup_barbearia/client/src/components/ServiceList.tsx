import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { Service } from "@shared/schema";

interface ServiceListProps {
  onSelectService: (service: Service) => void;
  selectedBarber: { id: number; name: string };
}

const ServiceList: React.FC<ServiceListProps> = ({ onSelectService, selectedBarber }) => {
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  const formatPrice = (price: number) => {
    return `R$ ${(price / 100).toFixed(2).replace('.', ',')}`;
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-4 border border-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Skeleton className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
              <div className="flex flex-col items-end">
                <Skeleton className="h-5 w-16 mb-1" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Erro ao carregar serviços. Por favor, tente novamente.</div>;
  }

  return (
    <>
      <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white mr-4">
            <i className="ri-user-3-line text-xl"></i>
          </div>
          <div>
            <h3 className="font-bold">Barbeiro: {selectedBarber.name}</h3>
            <p className="text-gray-600 text-sm">Classico Barber Shop</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {services?.map((service) => (
          <div 
            key={service.id}
            onClick={() => onSelectService(service)}
            className="bg-white rounded-lg shadow-sm p-4 cursor-pointer border border-transparent hover:border-secondary transition flex items-center justify-between"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-primary mr-4">
                <i className={`${service.icon} text-xl`}></i>
              </div>
              <div>
                <h3 className="font-bold">{service.name}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-bold text-secondary">{formatPrice(service.price)}</span>
              <span className="text-sm text-gray-500">{service.duration} min</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ServiceList;
