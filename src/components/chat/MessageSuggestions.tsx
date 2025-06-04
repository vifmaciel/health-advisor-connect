
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MessageSuggestionsProps {
  lastClientMessage: string;
  onSelectSuggestion: (message: string) => void;
}

const MessageSuggestions: React.FC<MessageSuggestionsProps> = ({ 
  lastClientMessage, 
  onSelectSuggestion 
}) => {
  // Gerar sugestões baseadas na última mensagem do cliente
  const generateSuggestions = (message: string): string[] => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('cobertura') || lowerMessage.includes('opções')) {
      return [
        'Temos três tipos de cobertura: básica, intermediária e premium. Qual seria do seu interesse?',
        'Nossa cobertura nacional inclui mais de 2.000 hospitais credenciados. Gostaria de saber mais?',
        'Posso explicar as diferenças entre cada tipo de cobertura para você.',
        'Você tem alguma preferência de rede hospitalar específica?'
      ];
    }
    
    if (lowerMessage.includes('preço') || lowerMessage.includes('valor') || lowerMessage.includes('quanto')) {
      return [
        'Vou preparar um orçamento personalizado para sua família. Preciso confirmar as idades.',
        'O valor varia conforme as idades e tipo de cobertura. Posso calcular para vocês agora.',
        'Temos planos a partir de R$ 180,00 por pessoa. Quer que eu faça uma simulação?',
        'Oferecemos desconto para família. Vou calcular o valor exato para vocês.'
      ];
    }
    
    if (lowerMessage.includes('família') || lowerMessage.includes('filhos') || lowerMessage.includes('dependentes')) {
      return [
        'Para plano familiar, preciso das idades de todos os dependentes. Pode me informar?',
        'Temos condições especiais para famílias com filhos. Quantos anos eles têm?',
        'O plano familiar oferece economia significativa. Vou calcular para vocês.',
        'Filhos até 18 anos têm desconto especial. Qual a idade deles?'
      ];
    }
    
    if (lowerMessage.includes('hospital') || lowerMessage.includes('rede') || lowerMessage.includes('médico')) {
      return [
        'Nossa rede inclui os principais hospitais da região. Tem algum de preferência?',
        'Posso verificar se seu médico atual está na nossa rede credenciada.',
        'Temos parcerias com Hospital Albert Einstein, Sírio-Libanês e outros. Interesse em algum?',
        'A rede varia por tipo de plano. Qual cobertura você considera?'
      ];
    }
    
    // Sugestões padrão
    return [
      'Posso esclarecer alguma dúvida específica sobre nossos planos?',
      'Gostaria que eu prepare um orçamento personalizado para você?',
      'Tem alguma preferência de rede hospitalar ou cobertura?',
      'Quer que eu explique melhor algum benefício dos nossos planos?'
    ];
  };

  const suggestions = generateSuggestions(lastClientMessage);

  return (
    <Card className="p-3 bg-white border border-gray-200 shadow-sm">
      <div className="mb-2">
        <span className="text-xs font-medium text-gray-600">Sugestões de resposta:</span>
      </div>
      <div className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full text-left justify-start h-auto p-2 text-sm text-gray-700 hover:bg-gray-50 whitespace-normal"
            onClick={() => onSelectSuggestion(suggestion)}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default MessageSuggestions;
