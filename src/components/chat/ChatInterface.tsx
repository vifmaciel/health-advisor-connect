
import React, { useState } from 'react';
import { Send, Paperclip, Phone, Video } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ClientInfo {
  name: string;
  age?: number;
  email?: string;
  phone?: string;
  healthPlan?: string;
  dependents?: number;
  location?: string;
}

interface ChatInterfaceProps {
  clientInfo: ClientInfo;
}

export interface QuotationData {
  name: string;
  price: number;
  coverage: string;
  hospital: string;
  benefits: string[];
  ages?: {age: number, price: number}[];
  totalPrice?: number;
  participation?: boolean;
  planType?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ clientInfo }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'client', text: 'Olá, estou interessado em um plano de saúde para minha família.' },
    { sender: 'advisor', text: 'Olá! Ficarei feliz em ajudar você a encontrar o plano ideal. Poderia me dizer quantas pessoas seriam incluídas no plano?' },
    { sender: 'client', text: 'Eu, minha esposa e nossos dois filhos, totalizando 4 pessoas.' },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      setChatHistory([...chatHistory, { sender: 'advisor', text: message }]);
      setMessage('');
      
      // Simulate client response after a delay
      setTimeout(() => {
        setChatHistory(prev => [...prev, { 
          sender: 'client', 
          text: 'Entendo. E quais seriam as opções de cobertura disponíveis?' 
        }]);
      }, 3000);
    }
  };

  // Function to be called from QuotationGenerator
  const sendQuotationToChat = (quotation: QuotationData) => {
    const quotationText = `
      *Orçamento - ${quotation.name}*
      ${quotation.coverage === 'Nacional' ? 'Cobertura Nacional' : 'Cobertura Regional'}
      ${quotation.planType === 'pf' ? 'Pessoa Física' : 'Pessoa Jurídica'}
      ${quotation.participation ? 'Com coparticipação' : 'Sem coparticipação'}
      Valor total: R$ ${quotation.totalPrice?.toFixed(2)}
      
      Rede hospitalar: ${quotation.hospital}
    `;
    
    setChatHistory([...chatHistory, { sender: 'advisor', text: quotationText }]);
  };

  // Make the function available globally
  React.useEffect(() => {
    window.sendQuotationToChat = sendQuotationToChat;
    return () => {
      // @ts-ignore
      delete window.sendQuotationToChat;
    };
  }, [chatHistory]);

  return (
    <div className="flex flex-col h-full">
      {/* Client Info Panel - Simplified */}
      <Card className="p-3 mb-3 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-health-500">
            <div className="bg-health-100 h-full w-full flex items-center justify-center text-health-800 text-md font-medium">
              {clientInfo.name.charAt(0)}
            </div>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-medium">{clientInfo.name}</h3>
            <div className="text-xs text-gray-500">{clientInfo.location}</div>
          </div>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
              <Phone size={16} className="text-health-600" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
              <Video size={16} className="text-health-600" />
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-2 mb-3 space-y-3">
        {chatHistory.map((chat, index) => (
          <div 
            key={index} 
            className={cn(
              "flex", 
              chat.sender === 'advisor' ? "justify-end" : "justify-start"
            )}
          >
            <div className={cn(
              "max-w-[80%] whitespace-pre-line",
              chat.sender === 'advisor' ? "bg-health-600 text-white rounded-lg rounded-tr-none px-3 py-2" : "bg-gray-100 rounded-lg rounded-tl-none px-3 py-2"
            )}>
              {chat.text}
            </div>
          </div>
        ))}
      </div>
      
      {/* Message Input */}
      <div className="mt-auto">
        <div className="flex gap-2 items-center">
          <Button size="icon" variant="ghost" className="rounded-full h-8 w-8">
            <Paperclip size={16} className="text-gray-500" />
          </Button>
          <Input
            className="rounded-full bg-gray-50 h-9"
            placeholder="Digite uma mensagem..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button 
            size="icon" 
            className="rounded-full bg-health-600 hover:bg-health-700 h-9 w-9"
            onClick={sendMessage}
          >
            <Send size={16} className="text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
