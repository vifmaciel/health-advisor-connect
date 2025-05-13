
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Bell, AlertTriangle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const UrgentEvents: React.FC = () => {
  const urgentEvents = [
    {
      title: 'Renovação de plano expirando',
      client: 'José da Silva',
      deadline: 'Hoje',
      priority: 'high',
    },
    {
      title: 'Pendência de documentação',
      client: 'Maria Oliveira',
      deadline: 'Amanhã',
      priority: 'medium',
    },
    {
      title: 'Solicitação de alteração',
      client: 'Carlos Eduardo',
      deadline: '2 dias',
      priority: 'low',
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
              "p-3 mb-2 rounded-md cursor-pointer hover:bg-health-50 transition-colors",
              event.priority === 'high' ? 'border-l-4 border-red-500' : 
              event.priority === 'medium' ? 'border-l-4 border-yellow-500' : 
              'border-l-4 border-blue-500'
            )}
          >
            <div className="flex items-start justify-between">
              <h4 className="font-medium text-sm">{event.title}</h4>
              <span className={cn(
                "text-xs px-2 py-0.5 rounded",
                event.priority === 'high' ? 'bg-red-100 text-red-700' : 
                event.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
                'bg-blue-100 text-blue-700'
              )}>
                {event.priority === 'high' ? 'Alta' : 
                 event.priority === 'medium' ? 'Média' : 'Baixa'}
              </span>
            </div>
            <p className="text-xs text-gray-600 mt-1">Cliente: {event.client}</p>
            <div className="flex items-center mt-2 text-xs text-gray-500">
              <Clock size={12} className="mr-1" />
              <span>Prazo: {event.deadline}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UrgentEvents;
