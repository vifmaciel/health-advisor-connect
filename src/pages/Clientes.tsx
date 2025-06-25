
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Phone, Mail, Eye } from 'lucide-react';

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

const Clientes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

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
    },
    {
      id: '3',
      name: 'Pedro Costa',
      phone: '(11) 77777-7777',
      email: 'pedro@email.com',
      leadCode: 'LD003',
      status: 'proposta_enviada',
      lastContact: '2024-01-14T16:20:00',
      interests: ['Plano Empresarial']
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      novo: 'bg-blue-100 text-blue-800',
      em_negociacao: 'bg-yellow-100 text-yellow-800',
      proposta_enviada: 'bg-purple-100 text-purple-800',
      fechado: 'bg-green-100 text-green-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const texts = {
      novo: 'Novo',
      em_negociacao: 'Em Negociação',
      proposta_enviada: 'Proposta Enviada',
      fechado: 'Fechado'
    };
    return texts[status as keyof typeof texts] || status;
  };

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.leadCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-health-800 mb-2">Clientes</h1>
          <p className="text-gray-600">Gerencie seus clientes e leads</p>
        </div>
        <Button className="bg-health-600 hover:bg-health-700">
          <Plus size={16} className="mr-2" />
          Novo Cliente
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar por nome, email ou código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filtros</Button>
          </div>
        </CardContent>
      </Card>

      {/* Clients List */}
      <div className="grid gap-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="font-semibold text-health-800">{client.name}</h3>
                    <Badge className={getStatusColor(client.status)}>
                      {getStatusText(client.status)}
                    </Badge>
                    <span className="text-sm text-gray-500">#{client.leadCode}</span>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Phone size={14} />
                      <span>{client.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={14} />
                      <span>{client.email}</span>
                    </div>
                    <div>
                      Último contato: {new Date(client.lastContact).toLocaleDateString('pt-BR')}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-2">
                    {client.interests.map((interest, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye size={14} className="mr-1" />
                    Ver Detalhes
                  </Button>
                  <Button size="sm" className="bg-health-600 hover:bg-health-700">
                    Atender
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Clientes;
