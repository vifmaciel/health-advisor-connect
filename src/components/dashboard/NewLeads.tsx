
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const NewLeads: React.FC = () => {
  const leads = [
    {
      name: 'Ricardo Santos',
      time: '10:30',
      isToday: true,
    },
    {
      name: 'Mariana Costa',
      time: '09:15',
      isToday: true,
    },
    {
      name: 'Alexandre Nunes',
      time: '16:45',
      isToday: false,
    },
    {
      name: 'Juliana Pereira',
      time: '14:20',
      isToday: false,
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users size={18} className="text-health-600" />
            Novos Leads
          </CardTitle>
          <span className="text-sm font-medium bg-health-100 text-health-700 px-2 py-0.5 rounded">
            {leads.length} novos
          </span>
        </div>
      </CardHeader>
      <CardContent className="overflow-y-auto max-h-[calc(100%-60px)] p-2">
        {leads.map((lead, index) => (
          <div 
            key={index} 
            className="p-2 mb-2 rounded-md border border-gray-100 hover:border-health-200 hover:bg-health-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">{lead.name}</span>
              <span className="text-xs text-gray-500">
                {lead.isToday ? 'Hoje' : 'Ontem'}, {lead.time}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default NewLeads;
