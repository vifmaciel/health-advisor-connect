import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import ChatInterface from '@/components/chat/ChatInterface';
import QuotationGenerator from '@/components/quotation/QuotationGenerator';
import UrgentEvents from '@/components/dashboard/UrgentEvents';
import DailySchedule from '@/components/dashboard/DailySchedule';
import NewLeads from '@/components/dashboard/NewLeads';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ArrowDown, ArrowUp, Minimize, Maximize } from 'lucide-react';

const Index = () => {
  const clientInfo = {
    name: "João da Silva",
    age: 42,
    email: "joao.silva@email.com",
    phone: "(11) 98765-4321",
    healthPlan: "Básico",
    dependents: 3,
    location: "São Paulo, SP"
  };

  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isMainContentMinimized, setIsMainContentMinimized] = useState(false);

  return (
    <div className="flex h-screen w-full">
      {/* Left Sidebar with Icons */}
      <Sidebar />
      
      {/* Main Layout */}
      <div className="flex flex-1 flex-col h-full">
        {/* Header with Minimize/Maximize Button */}
        <div className="bg-white border-b border-gray-100 px-4 py-2 flex items-center justify-end">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMainContentMinimized(!isMainContentMinimized)}
            className="h-8 w-8"
          >
            {isMainContentMinimized ? <Maximize size={18} /> : <Minimize size={18} />}
          </Button>
        </div>
      
        {/* Main Content Area - Collapsible */}
        <Collapsible 
          open={!isMainContentMinimized} 
          onOpenChange={(open) => setIsMainContentMinimized(!open)}
          className="flex flex-1 h-full"
        >
          <CollapsibleContent className="flex flex-1 h-full">
            <div className="flex flex-1 h-full">
              {/* Left Panel - Chat Interface (expanded) */}
              <div className="w-1/4 h-full flex flex-col">
                {/* Chat Section - Now takes up full left panel */}
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
                      <ChatInterface clientInfo={clientInfo} />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
              
              {/* Middle Panel - Quotation Generator */}
              <div className="w-2/4 h-full bg-gray-50 border-x border-gray-100">
                <div className="p-4 pb-0">
                  <h3 className="text-xl font-bold text-health-800 mb-4">Gerador de Orçamentos</h3>
                </div>
                <div className="h-full">
                  <QuotationGenerator clientInfo={clientInfo} />
                </div>
              </div>
              
              {/* Right Panel - Dashboard Widgets and New Leads */}
              <div className="w-1/4 h-full overflow-y-auto">
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
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setIsMainContentMinimized(false)}
            >
              <Maximize size={16} />
              Expandir Conteúdo
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
