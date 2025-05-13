
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import ChatInterface from '@/components/chat/ChatInterface';
import QuotationGenerator from '@/components/quotation/QuotationGenerator';
import UrgentEvents from '@/components/dashboard/UrgentEvents';
import DailySchedule from '@/components/dashboard/DailySchedule';
import NewLeads from '@/components/dashboard/NewLeads';
import { cn } from '@/lib/utils';

const Index = () => {
  const clientInfo = {
    name: "João da Silva",
    age: 42,
    email: "joao.silva@email.com",
    phone: "(11) 98765-4321",
    healthPlan: "Básico",
    dependents: 3,
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left Sidebar with Icons */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex flex-1 h-full overflow-hidden">
        {/* Left Panel - Dashboard Widgets */}
        <div className="w-1/4 h-full p-4 overflow-y-auto space-y-4">
          <h3 className="text-xl font-bold text-health-800 mb-4">Dashboard</h3>
          
          {/* Urgent Events Widget */}
          <div className="h-[30%]">
            <UrgentEvents />
          </div>
          
          {/* Daily Schedule Widget */}
          <div className="h-[30%]">
            <DailySchedule />
          </div>
          
          {/* New Leads Widget */}
          <div className="h-[40%]">
            <NewLeads />
          </div>
        </div>
        
        {/* Middle Panel - Quotation Generator */}
        <div className="w-2/4 h-full bg-gray-50 border-x border-gray-100 p-4 overflow-y-auto">
          <h3 className="text-xl font-bold text-health-800 mb-4">Gerador de Orçamentos</h3>
          <QuotationGenerator />
        </div>
        
        {/* Right Panel - Chat Interface */}
        <div className="w-1/4 h-full p-4">
          <h3 className="text-xl font-bold text-health-800 mb-4">Chat com Cliente</h3>
          <div className="h-[calc(100%-2.5rem)]">
            <ChatInterface clientInfo={clientInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
