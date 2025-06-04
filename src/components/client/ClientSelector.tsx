
import React from 'react';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, Mail } from 'lucide-react';

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

interface ClientSelectorProps {
  clients: Client[];
  selectedClientId: string;
  onSelectClient: (clientId: string) => void;
}

const ClientSelector: React.FC<ClientSelectorProps> = ({ 
  clients, 
  selectedClientId, 
  onSelectClient 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'novo': return 'bg-blue-100 text-blue-800';
      case 'em_negociacao': return 'bg-yellow-100 text-yellow-800';
      case 'proposta_enviada': return 'bg-purple-100 text-purple-800';
      case 'fechado': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-2 max-h-80 overflow-y-auto">
      {clients.map((client) => (
        <Card 
          key={client.id}
          className={`p-3 cursor-pointer transition-all hover:shadow-md ${
            selectedClientId === client.id 
              ? 'ring-2 ring-health-500 bg-health-50' 
              : 'bg-white hover:bg-gray-50'
          }`}
          onClick={() => onSelectClient(client.id)}
        >
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10 border-2 border-health-200">
              <div className="bg-health-100 h-full w-full flex items-center justify-center text-health-800 text-sm font-medium">
                {client.name.charAt(0)}
              </div>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-sm truncate">{client.name}</h4>
                <Badge className={`text-xs ${getStatusColor(client.status)}`}>
                  {client.leadCode}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Phone size={10} />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Mail size={10} />
                  <span className="truncate">{client.email}</span>
                </div>
              </div>
              
              <div className="mt-2 text-xs text-gray-500">
                Último contato: {client.lastContact}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ClientSelector;
