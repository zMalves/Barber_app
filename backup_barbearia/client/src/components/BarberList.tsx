import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Barber } from "@shared/schema";

interface BarberListProps {
  onSelectBarber: (barber: Barber) => void;
}

const BarberList: React.FC<BarberListProps> = ({ onSelectBarber }) => {
  const { data: barbers, isLoading, error } = useQuery<Barber[]>({
    queryKey: ['/api/barbers'],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardContent className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <div className="flex items-center">
                <Skeleton className="h-4 w-24 mr-2" />
                <Skeleton className="h-4 w-20" />
              </div>
            </CardContent>
            <div className="px-4 py-3 bg-gray-50 border-t">
              <Skeleton className="h-5 w-48" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Erro ao carregar barbeiros. Por favor, tente novamente.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {barbers?.map((barber) => (
        <div 
          key={barber.id}
          onClick={() => onSelectBarber(barber)}
          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition group"
        >
          <div className="relative">
            <img 
              src={barber.imageUrl} 
              alt={`Barbeiro ${barber.name}`} 
              className="w-full h-48 object-cover" 
            />
            <div className={`absolute top-3 right-3 ${barber.available ? 'bg-green-500' : 'bg-red-500'} text-white text-xs px-2 py-1 rounded-full flex items-center`}>
              {barber.available && <span className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>}
              {barber.available ? 'Disponível' : 'Ocupado'}
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg mb-1">{barber.name}</h3>
            <p className="text-gray-600 text-sm mb-3">{barber.title} • {barber.experience}</p>
            <div className="flex items-center text-sm">
              <div className="flex items-center text-yellow-500 mr-2">
                {[...Array(5)].map((_, i) => {
                  const rating = parseFloat(barber.rating);
                  // Full star
                  if (i < Math.floor(rating)) {
                    return <i key={i} className="ri-star-fill"></i>;
                  }
                  // Half star
                  else if (i === Math.floor(rating) && rating % 1 !== 0) {
                    return <i key={i} className="ri-star-half-fill"></i>;
                  }
                  // Empty star
                  else {
                    return <i key={i} className="ri-star-line"></i>;
                  }
                })}
              </div>
              <span>{barber.rating} ({barber.reviewCount} avaliações)</span>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 border-t group-hover:bg-secondary group-hover:text-white transition-colors">
            <span className="font-medium">Próximo horário: Hoje, 14:30</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BarberList;
