
import React, { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Brain, MessageSquare } from 'lucide-react';

interface AutoPopulationServiceProps {
  chatHistory: any[];
  onDataExtracted: (data: any) => void;
}

interface ExtractedData {
  location: string;
  ages: number[];
  planType: string;
  dependents: number;
  coverage: string;
  lastUpdated: string;
}

const AutoPopulationService: React.FC<AutoPopulationServiceProps> = ({ 
  chatHistory, 
  onDataExtracted 
}) => {
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Simular extração de dados do chat
  const extractDataFromChat = (messages: any[]) => {
    setIsProcessing(true);
    
    // Simular processamento com delay
    setTimeout(() => {
      // Análise simples baseada nas mensagens do chat
      const chatText = messages.map(m => m.text).join(' ').toLowerCase();
      
      let location = 'São Paulo - SP';
      if (chatText.includes('rio')) location = 'Rio de Janeiro - RJ';
      if (chatText.includes('minas')) location = 'Minas Gerais - MG';
      
      let planType = 'individual';
      if (chatText.includes('família') || chatText.includes('esposa') || chatText.includes('filhos')) {
        planType = 'familiar';
      }
      if (chatText.includes('empresa') || chatText.includes('funcionários')) {
        planType = 'empresarial';
      }
      
      // Extrair idades mencionadas
      const ageMatches = chatText.match(/(\d+)\s*anos?/g);
      const ages = ageMatches ? ageMatches.map(match => parseInt(match)) : [42];
      
      // Contar dependentes
      let dependents = 0;
      if (chatText.includes('dois filhos')) dependents = 2;
      if (chatText.includes('três filhos')) dependents = 3;
      if (chatText.includes('esposa')) dependents += 1;
      
      const data: ExtractedData = {
        location,
        ages,
        planType,
        dependents,
        coverage: 'nacional',
        lastUpdated: new Date().toLocaleTimeString()
      };
      
      setExtractedData(data);
      onDataExtracted(data);
      setIsProcessing(false);
    }, 1500);
  };

  useEffect(() => {
    if (chatHistory.length > 0) {
      extractDataFromChat(chatHistory);
    }
  }, [chatHistory]);

  if (!extractedData && !isProcessing) return null;

  return (
    <Alert className="mb-4 bg-blue-50 border-blue-200">
      <Brain className="h-4 w-4 text-blue-600" />
      <AlertDescription>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare size={14} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-800">
              {isProcessing ? 'Analisando conversa...' : 'Dados extraídos do chat'}
            </span>
          </div>
          {extractedData && (
            <Badge variant="secondary" className="text-xs">
              Atualizado às {extractedData.lastUpdated}
            </Badge>
          )}
        </div>
        
        {extractedData && (
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-blue-700">
            <div>Localização: {extractedData.location}</div>
            <div>Tipo: {extractedData.planType}</div>
            <div>Dependentes: {extractedData.dependents}</div>
            <div>Idades: {extractedData.ages.join(', ')} anos</div>
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default AutoPopulationService;
