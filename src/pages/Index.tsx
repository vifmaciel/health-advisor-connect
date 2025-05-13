
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
        {/* Left Panel - Chat Interface and Dashboard Widgets */}
        <div className="w-1/3 h-full flex flex-col overflow-hidden">
          {/* Chat Section */}
          <Collapsible open={isChatOpen} onOpenChange={setIsChatOpen} className="flex-shrink-0">
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
            <CollapsibleContent>
              <div className="p-4 pt-0 h-[40vh]">
                <ChatInterface clientInfo={clientInfo} />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Dashboard Widgets */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <h3 className="text-xl font-bold text-health-800 mb-4">Dashboard</h3>
            
            {/* Urgent Events Widget */}
            <div className="h-[28%]">
              <UrgentEvents />
            </div>
            
            {/* Daily Schedule Widget */}
            <div className="h-[28%]">
              <DailySchedule />
            </div>
            
            {/* New Leads Widget */}
            <div className="h-[28%]">
              <NewLeads />
            </div>
          </div>
        </div>
        
        {/* Right Panel - Quotation Generator (Wider) */}
        <div className="w-2/3 h-full bg-gray-50 border-x border-gray-100 p-4 overflow-y-auto">
          <h3 className="text-xl font-bold text-health-800 mb-4">Gerador de Orçamentos</h3>
          <QuotationGenerator clientInfo={clientInfo} />
        </div>
      </div>
    </div>
  );
};

export default Index;
