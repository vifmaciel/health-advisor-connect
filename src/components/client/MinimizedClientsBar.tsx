
import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  leadCode: string;
  status: 'novo' | 'em_negociacao' | 'proposta_enviada' | 'fechado';
  lastContact: string;
  interests: string[];
}

interface MinimizedClientsBarProps {
  clients: Client[];
  onSelectClient: (clientId: string) => void;
  onExpand: () => void;
}

const MinimizedClientsBar: React.FC<MinimizedClientsBarProps> = ({
  clients,
  onSelectClient,
  onExpand
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'novo': return 'border-blue-500';
      case 'em_negociacao': return 'border-yellow-500';
      case 'proposta_enviada': return 'border-purple-500';
      case 'fechado': return 'border-green-500';
      default: return 'border-gray-300';
    }
  };

  return (
    <Card className="fixed bottom-4 left-20 right-4 bg-white shadow-lg border border-gray-200 p-3 z-50">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onExpand}
          className="text-xs text-gray-600 hover:text-gray-800"
        >
          Expandir ({clients.length} clientes)
        </Button>
        
        <div className="flex gap-3 flex-1 overflow-x-auto">
          {clients.map((client) => (
            <div
              key={client.id}
              className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
              onClick={() => onSelectClient(client.id)}
            >
              <Avatar className={`h-12 w-12 border-2 ${getStatusColor(client.status)}`}>
                <div className="bg-health-100 h-full w-full flex items-center justify-center text-health-800 text-sm font-medium">
                  {client.name.charAt(0)}
                </div>
              </Avatar>
              <span className="text-xs text-gray-600 truncate max-w-16">
                {client.name.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default MinimizedClientsBar;
