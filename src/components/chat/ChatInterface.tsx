
import React, { useState } from 'react';
import { Send, Paperclip, Phone, Video } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ClientInfo {
  name: string;
  age: number;
  email: string;
  phone: string;
  healthPlan?: string;
  dependents?: number;
}

interface ChatInterfaceProps {
  clientInfo: ClientInfo;
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

  return (
    <div className="flex flex-col h-full">
      {/* Client Info Panel */}
      <Card className="p-4 mb-4 bg-white shadow-sm">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-health-500">
            <div className="bg-health-100 h-full w-full flex items-center justify-center text-health-800 text-lg font-medium">
              {clientInfo.name.charAt(0)}
            </div>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-medium text-lg">{clientInfo.name}</h3>
            <div className="text-sm text-gray-500">{clientInfo.age} anos | {clientInfo.email}</div>
          </div>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" className="rounded-full">
              <Phone size={18} className="text-health-600" />
            </Button>
            <Button size="icon" variant="ghost" className="rounded-full">
              <Video size={18} className="text-health-600" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
          <div className="bg-health-50 p-2 rounded">
            <span className="text-health-600 font-medium">Telefone:</span> {clientInfo.phone}
          </div>
          <div className="bg-health-50 p-2 rounded">
            <span className="text-health-600 font-medium">Plano Atual:</span> {clientInfo.healthPlan || 'Nenhum'}
          </div>
          <div className="bg-health-50 p-2 rounded">
            <span className="text-health-600 font-medium">Dependentes:</span> {clientInfo.dependents || 0}
          </div>
          <div className="bg-health-50 p-2 rounded">
            <span className="text-health-600 font-medium">Status:</span> <span className="text-green-600">Ativo</span>
          </div>
        </div>
      </Card>
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-2 mb-4 space-y-4">
        {chatHistory.map((chat, index) => (
          <div 
            key={index} 
            className={cn(
              "flex", 
              chat.sender === 'advisor' ? "justify-end" : "justify-start"
            )}
          >
            <div className={cn(
              "max-w-[80%]",
              chat.sender === 'advisor' ? "chat-bubble-advisor" : "chat-bubble-client"
            )}>
              {chat.text}
            </div>
          </div>
        ))}
      </div>
      
      {/* Message Input */}
      <div className="mt-auto">
        <div className="flex gap-2 items-center">
          <Button size="icon" variant="ghost" className="rounded-full">
            <Paperclip size={18} className="text-gray-500" />
          </Button>
          <Input
            className="rounded-full bg-gray-50"
            placeholder="Digite uma mensagem..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button 
            size="icon" 
            className="rounded-full bg-health-600 hover:bg-health-700"
            onClick={sendMessage}
          >
            <Send size={18} className="text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
