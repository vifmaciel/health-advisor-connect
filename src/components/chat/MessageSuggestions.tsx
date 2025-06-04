
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, MessageSquare } from 'lucide-react';

interface MessageSuggestionsProps {
  lastClientMessage: string;
  onSelectSuggestion: (message: string) => void;
}

const MessageSuggestions: React.FC<MessageSuggestionsProps> = ({ 
  lastClientMessage, 
  onSelectSuggestion 
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Gerar tópicos principais baseados na última mensagem
  const generateTopics = (message: string): {title: string, key: string}[] => {
    const lowerMessage = message.toLowerCase();
    
    const allTopics = [
      { title: 'Cobertura e Rede', key: 'coverage' },
      { title: 'Preços e Valores', key: 'pricing' },
      { title: 'Coparticipação', key: 'coparticipation' },
      { title: 'Família e Dependentes', key: 'family' },
      { title: 'Documentação', key: 'documentation' },
      { title: 'Contratação', key: 'contracting' }
    ];

    // Priorizar tópicos baseados na mensagem
    if (lowerMessage.includes('cobertura') || lowerMessage.includes('hospital')) {
      return [allTopics[0], ...allTopics.slice(1)];
    }
    if (lowerMessage.includes('preço') || lowerMessage.includes('valor')) {
      return [allTopics[1], ...allTopics.filter((_, i) => i !== 1)];
    }
    if (lowerMessage.includes('coparticipação')) {
      return [allTopics[2], ...allTopics.filter((_, i) => i !== 2)];
    }
    
    return allTopics;
  };

  // Gerar mensagens para cada tópico
  const getTopicMessages = (topicKey: string): string[] => {
    const messages = {
      coverage: [
        'Nossa rede inclui mais de 2.000 hospitais credenciados nacionalmente.',
        'Temos cobertura em hospitais como Albert Einstein, Sírio-Libanês e Hospital das Clínicas.',
        'A cobertura nacional permite atendimento em qualquer estado do Brasil.',
        'Posso verificar se seu médico atual está na nossa rede credenciada.'
      ],
      pricing: [
        'O valor varia conforme idade e tipo de cobertura. Posso calcular para sua família.',
        'Temos planos a partir de R$ 180,00 por pessoa com desconto familiar.',
        'Oferecemos condições especiais para pagamento anual.',
        'Posso preparar um orçamento personalizado considerando suas necessidades.'
      ],
      coparticipation: [
        'A coparticipação é um valor fixo pago a cada consulta ou exame.',
        'Planos sem coparticipação têm mensalidade um pouco maior, mas sem custos extras.',
        'Com coparticipação: consulta R$ 25, exames simples R$ 35, exames complexos R$ 65.',
        'Internações e emergências nunca têm coparticipação, independente do plano.'
      ],
      family: [
        'Filhos até 18 anos têm desconto de até 50% na mensalidade.',
        'Cônjuge tem desconto de 15% quando incluído no plano familiar.',
        'Máximo de 6 dependentes por titular.',
        'Preciso das idades exatas para calcular o valor familiar correto.'
      ],
      documentation: [
        'Para contratação: RG, CPF, comprovante de renda e residência.',
        'Dependentes: certidão de nascimento ou casamento.',
        'Declaração de saúde obrigatória para todos os beneficiários.',
        'Processo de análise leva até 7 dias úteis.'
      ],
      contracting: [
        'Posso enviar a proposta por WhatsApp para assinatura digital.',
        'Plano fica ativo em até 2 dias úteis após aprovação.',
        'Primeira mensalidade pode ser paga via PIX, cartão ou boleto.',
        'Você recebe as carteirinhas por email e correio em até 5 dias.'
      ]
    };
    
    return messages[topicKey as keyof typeof messages] || [];
  };

  const topics = generateTopics(lastClientMessage);

  if (selectedTopic) {
    const messages = getTopicMessages(selectedTopic);
    return (
      <Card className="p-3 bg-white border border-gray-200 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-600">
            {topics.find(t => t.key === selectedTopic)?.title}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => setSelectedTopic(null)}
          >
            ×
          </Button>
        </div>
        <div className="space-y-2">
          {messages.map((message, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full text-left justify-start h-auto p-2 text-sm text-gray-700 hover:bg-gray-50 whitespace-normal"
              onClick={() => onSelectSuggestion(message)}
            >
              <MessageSquare size={14} className="mr-2 flex-shrink-0" />
              {message}
            </Button>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-3 bg-white border border-gray-200 shadow-sm">
      <div className="mb-2">
        <span className="text-xs font-medium text-gray-600">Tópicos de resposta:</span>
      </div>
      <div className="space-y-2">
        {topics.slice(0, 4).map((topic, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full text-left justify-between h-auto p-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() => setSelectedTopic(topic.key)}
          >
            <span>{topic.title}</span>
            <ChevronRight size={14} />
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default MessageSuggestions;
