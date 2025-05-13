
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Users, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const NewLeads: React.FC = () => {
  const leads = [
    {
      name: 'Ricardo Santos',
      interest: 'Plano Familiar',
      source: 'Website',
      date: 'Hoje, 10:30',
      avatar: 'RS',
    },
    {
      name: 'Mariana Costa',
      interest: 'Plano Individual',
      source: 'Facebook',
      date: 'Hoje, 09:15',
      avatar: 'MC',
    },
    {
      name: 'Alexandre Nunes',
      interest: 'Plano Empresarial',
      source: 'Indicação',
      date: 'Ontem, 16:45',
      avatar: 'AN',
    },
    {
      name: 'Juliana Pereira',
      interest: 'Plano Familiar',
      source: 'Instagram',
      date: 'Ontem, 14:20',
      avatar: 'JP',
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
            className="p-3 mb-3 rounded-md border border-gray-100 hover:border-health-200 hover:bg-health-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border-2 border-health-200">
                <div className="bg-health-100 h-full w-full flex items-center justify-center text-health-800 text-sm font-medium">
                  {lead.avatar}
                </div>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-medium text-sm">{lead.name}</h4>
                <p className="text-xs text-gray-600 mt-0.5">Interesse: {lead.interest}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500">Origem: {lead.source}</span>
                  <span className="text-xs text-gray-500">{lead.date}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-1 mt-3">
              <Button size="sm" variant="outline" className="flex-1 h-8 text-xs">
                <Phone size={14} className="mr-1" /> Ligar
              </Button>
              <Button size="sm" className="flex-1 h-8 bg-health-600 hover:bg-health-700 text-xs">
                <MessageCircle size={14} className="mr-1" /> Mensagem
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default NewLeads;
