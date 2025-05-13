
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
import { ArrowDown, ArrowUp } from 'lucide-react';

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

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left Sidebar with Icons */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex flex-1 h-full overflow-hidden">
        {/* Left Panel - Chat Interface (expanded) */}
        <div className="w-1/4 h-full flex flex-col overflow-hidden">
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
        <div className="w-2/4 h-full bg-gray-50 border-x border-gray-100 p-4 overflow-y-auto">
          <h3 className="text-xl font-bold text-health-800 mb-4">Gerador de Orçamentos</h3>
          <QuotationGenerator clientInfo={clientInfo} />
        </div>
        
        {/* Right Panel - Dashboard Widgets and New Leads */}
        <div className="w-1/4 h-full overflow-y-auto">
          <div className="p-4 space-y-4">
            <h3 className="text-xl font-bold text-health-800">Dashboard</h3>
            
            {/* Urgent Events Widget */}
            <div className="h-[30%] mb-4">
              <UrgentEvents />
            </div>
            
            {/* Daily Schedule Widget */}
            <div className="h-[30%] mb-4">
              <DailySchedule />
            </div>
            
            {/* New Leads Widget - Moved to right panel */}
            <div className="h-[30%]">
              <h3 className="text-lg font-bold text-health-800 mb-2">Novos Leads</h3>
              <NewLeads />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
