
import React, { useState } from 'react';
import ChatInterface from '@/components/chat/ChatInterface';
import ClientSelector from '@/components/client/ClientSelector';
import MinimizedClientsBar from '@/components/client/MinimizedClientsBar';

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

const Atendimento: React.FC = () => {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [isClientSelectorMinimized, setIsClientSelectorMinimized] = useState(false);

  const mockClients: Client[] = [
    {
      id: '1',
      name: 'João Silva',
      phone: '(11) 99999-9999',
      email: 'joao@email.com',
      leadCode: 'LD001',
      status: 'novo',
      lastContact: '2024-01-15T10:30:00',
      interests: ['Plano Familiar']
    },
    {
      id: '2',
      name: 'Maria Santos',
      phone: '(11) 88888-8888',
      email: 'maria@email.com',
      leadCode: 'LD002',
      status: 'em_negociacao',
      lastContact: '2024-01-15T09:15:00',
      interests: ['Plano Individual', 'Odontológico']
    }
  ];

  const selectedClient = mockClients.find(client => client.id === selectedClientId);

  const handleSelectClient = (clientId: string) => {
    setSelectedClientId(clientId);
    setIsClientSelectorMinimized(true);
  };

  const handleExpandClientSelector = () => {
    setIsClientSelectorMinimized(false);
  };

  return (
    <div className="h-full flex">
      {!isClientSelectorMinimized && (
        <div className="w-80 border-r border-gray-200 bg-white">
          <ClientSelector
            clients={mockClients}
            selectedClientId={selectedClientId}
            onSelectClient={handleSelectClient}
            onMinimize={() => setIsClientSelectorMinimized(true)}
          />
        </div>
      )}
      
      <div className="flex-1 flex flex-col">
        {selectedClient ? (
          <ChatInterface 
            selectedClient={selectedClient}
            onClientUpdate={(updatedClient) => {
              console.log('Cliente atualizado:', updatedClient);
            }}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-health-800 mb-2">
                Selecione um cliente
              </h2>
              <p className="text-gray-600">
                Escolha um cliente na barra lateral para iniciar o atendimento
              </p>
            </div>
          </div>
        )}
      </div>

      {isClientSelectorMinimized && (
        <MinimizedClientsBar
          clients={mockClients}
          onSelectClient={handleSelectClient}
          onExpand={handleExpandClientSelector}
        />
      )}
    </div>
  );
};

export default Atendimento;
