
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

const UrgentEvents: React.FC = () => {
  const urgentEvents = [
    {
      title: 'Renovação de plano expirando',
      client: 'José da Silva',
      priority: 'high',
      overdue: true,
    },
    {
      title: 'Pendência de documentação',
      client: 'Maria Oliveira',
      priority: 'medium',
      overdue: false,
    },
    {
      title: 'Solicitação de alteração',
      client: 'Carlos Eduardo',
      priority: 'low',
      overdue: false,
    }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell size={18} className="text-health-600" />
            Eventos Urgentes
          </CardTitle>
          <span className="text-sm font-medium bg-health-100 text-health-700 px-2 py-0.5 rounded">
            {urgentEvents.length}
          </span>
        </div>
      </CardHeader>
      <CardContent className="overflow-y-auto max-h-[calc(100%-60px)] p-2">
        {urgentEvents.map((event, index) => (
          <div 
            key={index} 
            className={cn(
              "p-2 mb-2 rounded-md cursor-pointer hover:bg-health-50 transition-colors border-l-4",
              event.priority === 'high' ? 'border-red-500' : 
              event.priority === 'medium' ? 'border-yellow-500' : 
              'border-green-500',
              event.overdue && 'animate-pulse'
            )}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">{event.client}</span>
              <span className={cn(
                "w-3 h-3 rounded-full",
                event.priority === 'high' ? 'bg-red-500' : 
                event.priority === 'medium' ? 'bg-yellow-500' : 
                'bg-green-500'
              )} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UrgentEvents;
