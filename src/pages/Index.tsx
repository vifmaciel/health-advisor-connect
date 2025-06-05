
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import ChatInterface from '@/components/chat/ChatInterface';
import QuotationGenerator from '@/components/quotation/QuotationGenerator';
import UrgentEvents from '@/components/dashboard/UrgentEvents';
import DailySchedule from '@/components/dashboard/DailySchedule';
import NewLeads from '@/components/dashboard/NewLeads';
import ClientSelector from '@/components/client/ClientSelector';
import MinimizedClientsBar from '@/components/client/MinimizedClientsBar';
import BackgroundController from '@/components/layout/BackgroundController';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ArrowDown, ArrowUp, Minimize, Maximize, Users } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const Index = () => {
  // Lista de clientes para teste
  const clients = [
    {
      id: '1',
      name: "João da Silva",
      phone: "(11) 98765-4321",
      email: "joao.silva@email.com",
      leadCode: "LD-001",
      status: 'em_negociacao' as const,
      lastContact: "Há 2 horas",
      interests: ['Plano Familiar', 'Cobertura Nacional']
    },
    {
      id: '2',
      name: "Maria Santos",
      phone: "(11) 97654-3210",
      email: "maria.santos@email.com",
      leadCode: "LD-002",
      status: 'novo' as const,
      lastContact: "Há 1 dia",
      interests: ['Plano Individual', 'Preço']
    },
    {
      id: '3',
      name: "Carlos Oliveira",
      phone: "(11) 96543-2109",
      email: "carlos.oliveira@email.com",
      leadCode: "LD-003",
      status: 'proposta_enviada' as const,
      lastContact: "Há 3 horas",
      interests: ['Plano Empresarial', 'Cobertura Premium']
    }
  ];

  const [selectedClientId, setSelectedClientId] = useState('1');
  const [isClientAreaMinimized, setIsClientAreaMinimized] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isMainContentMinimized, setIsMainContentMinimized] = useState(false);
  const [showClientSelector, setShowClientSelector] = useState(false);
  const [backgroundStyle, setBackgroundStyle] = useState('#f8fafc');

  const selectedClient = clients.find(client => client.id === selectedClientId) || clients[0];
  
  const clientInfo = {
    name: selectedClient.name,
    age: 42,
    email: selectedClient.email,
    phone: selectedClient.phone,
    healthPlan: "Básico",
    dependents: 3,
    location: "São Paulo, SP"
  };

  const handleBackgroundChange = (background: string) => {
    setBackgroundStyle(background);
  };

  const getBackgroundStyle = () => {
    if (backgroundStyle.includes('linear-gradient') || backgroundStyle.includes('url(')) {
      return { background: backgroundStyle };
    }
    return { backgroundColor: backgroundStyle };
  };

  return (
    <div className="flex h-screen w-full" style={getBackgroundStyle()}>
      {/* Left Sidebar with Icons */}
      <Sidebar />
      
      {/* Main Layout */}
      <div className="flex flex-1 flex-col h-full">
        {/* Header with Controls */}
        <div className="bg-white/90 backdrop-blur-sm border-b border-gray-100 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowClientSelector(!showClientSelector)}
              className="flex items-center gap-2"
            >
              <Users size={16} />
              {selectedClient.name}
              <ArrowDown size={14} />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <BackgroundController onBackgroundChange={handleBackgroundChange} />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsClientAreaMinimized(!isClientAreaMinimized)}
              className="h-8 w-8"
              title="Minimizar área do cliente"
            >
              {isClientAreaMinimized ? <Maximize size={18} /> : <Minimize size={18} />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMainContentMinimized(!isMainContentMinimized)}
              className="h-8 w-8"
              title="Minimizar conteúdo principal"
            >
              {isMainContentMinimized ? <Maximize size={18} /> : <Minimize size={18} />}
            </Button>
          </div>
        </div>

        {/* Client Selector Dropdown */}
        {showClientSelector && (
          <div className="absolute top-12 left-20 z-50 w-80 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-4">
            <div className="mb-3">
              <h3 className="font-medium text-gray-900">Selecionar Cliente</h3>
            </div>
            <ClientSelector 
              clients={clients}
              selectedClientId={selectedClientId}
              onSelectClient={(id) => {
                setSelectedClientId(id);
                setShowClientSelector(false);
              }}
            />
          </div>
        )}
      
        {/* Main Content Area - Collapsible */}
        <Collapsible 
          open={!isMainContentMinimized} 
          onOpenChange={(open) => setIsMainContentMinimized(!open)}
          className="flex flex-1 h-full"
        >
          <CollapsibleContent className="flex flex-1 h-full">
            <div className="flex flex-1 h-full">
              {/* Client Area - Chat + Quotation */}
              <div className={cn(
                "h-full flex transition-all duration-300",
                isClientAreaMinimized ? "w-16" : "w-3/4"
              )}>
                <Collapsible 
                  open={!isClientAreaMinimized} 
                  onOpenChange={(open) => setIsClientAreaMinimized(!open)}
                  className="flex flex-1 h-full"
                >
                  <CollapsibleContent className="flex flex-1 h-full">
                    <div className="flex flex-1 h-full">
                      {/* Left Panel - Chat Interface */}
                      <div className="w-1/2 h-full flex flex-col">
                        <Collapsible open={isChatOpen} onOpenChange={setIsChatOpen} className="flex-1">
                          <div className="p-4 pb-0">
                            <div className="flex items-center justify-between">
                              <h3 className="text-xl font-bold text-health-800">Chat com Cliente</h3>
                              <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm" className="ml-auto h-8 w-8 p-0">
                                  {isChatOpen ? <ArrowDown className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />}
                                </Button>
                              </CollapsibleTrigger>
                            </div>
                          </div>
                          <CollapsibleContent className="h-full">
                            <div className="p-4 pt-0 h-full">
                              <ChatInterface 
                                clientInfo={clientInfo} 
                                onMinimize={() => setIsClientAreaMinimized(true)}
                              />
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                      
                      {/* Right Panel - Quotation Generator */}
                      <div className="w-1/2 h-full bg-white/50 backdrop-blur-sm border-l border-gray-100">
                        <div className="p-4 pb-0">
                          <h3 className="text-xl font-bold text-health-800 mb-4">Gerador de Orçamentos</h3>
                        </div>
                        <div className="h-full">
                          <QuotationGenerator clientInfo={clientInfo} />
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Minimized Client Area */}
                {isClientAreaMinimized && (
                  <div className="w-16 h-full bg-white/50 backdrop-blur-sm border-r border-gray-200 flex flex-col items-center justify-center">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setIsClientAreaMinimized(false)}
                      className="mb-4"
                    >
                      <Users size={20} />
                    </Button>
                    <div className="text-xs text-gray-500 writing-mode-vertical transform rotate-180">
                      {selectedClient.name}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Right Panel - Dashboard Widgets */}
              <div className={cn(
                "h-full overflow-y-auto bg-white/50 backdrop-blur-sm border-l border-gray-100 transition-all duration-300",
                isClientAreaMinimized ? "w-full" : "w-1/4"
              )}>
                <div className="p-4 space-y-4">
                  <h3 className="text-xl font-bold text-health-800">Dashboard</h3>
                  
                  {/* Urgent Events Widget */}
                  <div className="mb-4">
                    <UrgentEvents />
                  </div>
                  
                  {/* Daily Schedule Widget */}
                  <div className="mb-4">
                    <DailySchedule />
                  </div>
                  
                  {/* New Leads Widget */}
                  <div>
                    <h3 className="text-lg font-bold text-health-800 mb-2">Novos Leads</h3>
                    <NewLeads />
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        {/* Minimized View - Shows when content is minimized */}
        {isMainContentMinimized && (
          <div className="flex-1 flex items-center justify-center">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 bg-white/80 backdrop-blur-sm"
              onClick={() => setIsMainContentMinimized(false)}
            >
              <Maximize size={16} />
              Expandir Conteúdo
            </Button>
          </div>
        )}
      </div>

      {/* Minimized Clients Bar */}
      {isClientAreaMinimized && (
        <MinimizedClientsBar
          clients={clients}
          onSelectClient={setSelectedClientId}
          onExpand={() => setIsClientAreaMinimized(false)}
        />
      )}
    </div>
  );
};

export default Index;
