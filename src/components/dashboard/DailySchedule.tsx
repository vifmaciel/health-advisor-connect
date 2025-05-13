
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const DailySchedule: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const schedule = [
    {
      time: '09:00',
      title: 'Reunião com Cliente',
      client: 'Ana Beatriz',
      type: 'meeting',
      completed: true,
    },
    {
      time: '11:30',
      title: 'Apresentação de Proposta',
      client: 'Roberto Carlos',
      type: 'presentation',
      completed: false,
    },
    {
      time: '14:00',
      title: 'Atendimento',
      client: 'Fernanda Lima',
      type: 'meeting',
      completed: false,
    },
    {
      time: '16:30',
      title: 'Assinatura de Contrato',
      client: 'João Pedro',
      type: 'contract',
      completed: false,
    },
  ];

  // Automatically advance the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % schedule.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [schedule.length]);

  const currentTime = new Date();
  const formattedDate = currentTime.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar size={18} className="text-health-600" />
            Agenda do Dia
          </CardTitle>
          <span className="text-sm text-gray-500">
            {formattedDate}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <Carousel className="w-full">
          <CarouselContent>
            {schedule.map((item, index) => (
              <CarouselItem key={index}>
                <div 
                  className={cn(
                    "p-3 rounded-md border-l-4 h-[90px] flex flex-col justify-between",
                    item.completed ? 'border-green-500 bg-green-50' : 'border-health-500 bg-health-50',
                    item.type === 'contract' ? 'bg-blue-50 border-blue-500' : '',
                    item.type === 'presentation' ? 'bg-yellow-50 border-yellow-500' : '',
                  )}
                >
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-sm">{item.title}</h4>
                    <span className={cn(
                      "flex items-center gap-1 text-xs px-2 py-0.5 rounded-full",
                      item.completed ? 'bg-green-100 text-green-700' : 'bg-health-100 text-health-700'
                    )}>
                      <Clock size={10} />
                      {item.time}
                    </span>
                  </div>
                  <div className="flex items-center mt-2 text-xs text-gray-600">
                    <User size={12} className="mr-1" />
                    <span>{item.client}</span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        
        {/* Pagination dots */}
        <div className="flex justify-center gap-1 mt-2">
          {schedule.map((_, index) => (
            <div 
              key={index}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all",
                activeIndex === index ? "bg-health-600 w-3" : "bg-gray-300"
              )} 
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailySchedule;
