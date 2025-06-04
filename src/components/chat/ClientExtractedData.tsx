
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, User, MessageCircle } from 'lucide-react';

interface ClientData {
  name: string;
  phone: string;
  email: string;
  leadCode: string;
  conversationSummary: string;
  status: 'novo' | 'em_negociacao' | 'proposta_enviada' | 'fechado';
  interests: string[];
}

interface ClientExtractedDataProps {
  clientData: ClientData;
}

const ClientExtractedData: React.FC<ClientExtractedDataProps> = ({ clientData }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'novo': return 'bg-blue-100 text-blue-800';
      case 'em_negociacao': return 'bg-yellow-100 text-yellow-800';
      case 'proposta_enviada': return 'bg-purple-100 text-purple-800';
      case 'fechado': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'novo': return 'Novo Lead';
      case 'em_negociacao': return 'Em Negociação';
      case 'proposta_enviada': return 'Proposta Enviada';
      case 'fechado': return 'Fechado';
      default: return 'Indefinido';
    }
  };

  return (
    <Card className="mb-3 bg-white shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Dados do Cliente</CardTitle>
          <Badge className={getStatusColor(clientData.status)}>
            {getStatusText(clientData.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        {/* Informações de contato */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <User size={14} className="text-gray-500" />
            <span className="text-gray-600">Lead:</span>
            <span className="font-medium">{clientData.leadCode}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Phone size={14} className="text-gray-500" />
            <span className="text-gray-600">Tel:</span>
            <span className="font-medium">{clientData.phone}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Mail size={14} className="text-gray-500" />
            <span className="text-gray-600">Email:</span>
            <span className="font-medium text-xs">{clientData.email}</span>
          </div>
        </div>

        {/* Interesses */}
        <div>
          <div className="text-xs font-medium text-gray-600 mb-2">Interesses identificados:</div>
          <div className="flex flex-wrap gap-1">
            {clientData.interests.map((interest, index) => (
              <Badge key={index} variant="outline" className="text-xs px-2 py-0.5">
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        {/* Resumo da conversa */}
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-gray-600 mb-2">
            <MessageCircle size={12} />
            Resumo da conversa:
          </div>
          <p className="text-xs text-gray-700 leading-relaxed bg-gray-50 p-2 rounded">
            {clientData.conversationSummary}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientExtractedData;
