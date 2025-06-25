
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Plus, Users } from 'lucide-react';

const Agenda: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const mockEvents = [
    {
      id: '1',
      title: 'Reunião com João Silva',
      time: '09:00',
      duration: '30 min',
      type: 'consulta',
      client: 'João Silva',
      status: 'confirmado'
    },
    {
      id: '2',
      title: 'Follow-up Maria Santos',
      time: '10:30',
      duration: '15 min',
      type: 'follow-up',
      client: 'Maria Santos',
      status: 'pendente'
    },
    {
      id: '3',
      title: 'Apresentação de Proposta',
      time: '14:00',
      duration: '45 min',
      type: 'proposta',
      client: 'Pedro Costa',
      status: 'confirmado'
    }
  ];

  const getEventColor = (type: string) => {
    const colors = {
      consulta: 'border-l-blue-500 bg-blue-50',
      'follow-up': 'border-l-yellow-500 bg-yellow-50',
      proposta: 'border-l-green-500 bg-green-50'
    };
    return colors[type as keyof typeof colors] || 'border-l-gray-500 bg-gray-50';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-health-800 mb-2">Agenda</h1>
          <p className="text-gray-600">Gerencie seus compromissos e reuniões</p>
        </div>
        <Button className="bg-health-600 hover:bg-health-700">
          <Plus size={16} className="mr-2" />
          Novo Agendamento
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar size={20} />
              Calendário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-health-800 mb-2">
                {selectedDate.toLocaleDateString('pt-BR', { 
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
              <p className="text-gray-600">
                {selectedDate.toLocaleDateString('pt-BR', { weekday: 'long' })}
              </p>
            </div>
            
            {/* Mini calendar would go here */}
            <div className="grid grid-cols-7 gap-2 text-center text-sm">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                <div key={day} className="p-2 font-medium text-gray-600">
                  {day}
                </div>
              ))}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <button
                  key={day}
                  className={`p-2 rounded hover:bg-health-100 ${
                    day === selectedDate.getDate() 
                      ? 'bg-health-600 text-white' 
                      : 'text-gray-700'
                  }`}
                  onClick={() => setSelectedDate(new Date(2024, 0, day))}
                >
                  {day}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Events List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock size={20} />
              Compromissos de Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockEvents.map((event) => (
                <div
                  key={event.id}
                  className={`border-l-4 p-4 rounded-r-lg ${getEventColor(event.type)}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-health-800 mb-1">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{event.time} ({event.duration})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={14} />
                          <span>{event.client}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                      <Button size="sm" className="bg-health-600 hover:bg-health-700">
                        Iniciar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Agenda;
