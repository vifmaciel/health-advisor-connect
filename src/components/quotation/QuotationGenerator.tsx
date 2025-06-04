import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp } from 'lucide-react';
import SimulationFilters from './SimulationFilters';
import AutoPopulationService from './AutoPopulationService';
import { QuotationData } from '../chat/ChatInterface';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Check, Plus, Send, MessageSquare, ArrowDown as ArrowDownIcon, ArrowUp as ArrowUpIcon, X } from 'lucide-react';
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

interface QuotationGeneratorProps {
  clientInfo: ClientInfo;
}

interface AgeTag {
  id: string;
  age: number;
  relation: string;
}

const QuotationGenerator: React.FC<QuotationGeneratorProps> = ({ clientInfo }) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [chatHistory, setChatHistory] = useState([
    { sender: 'client', text: 'Olá, estou interessado em um plano de saúde para minha família.' },
    { sender: 'advisor', text: 'Olá! Ficarei feliz em ajudar você a encontrar o plano ideal. Poderia me dizer quantas pessoas seriam incluídas no plano?' },
    { sender: 'client', text: 'Eu, minha esposa e nossos dois filhos, totalizando 4 pessoas.' },
  ]);
  
  const [newAge, setNewAge] = useState('');
  const [newRelation, setNewRelation] = useState('Titular');
  const [ageTags, setAgeTags] = useState<AgeTag[]>([
    { id: '1', age: clientInfo.age || 35, relation: 'Titular' }
  ]);
  const [planType, setPlanType] = useState('pf');
  const [region, setRegion] = useState('sp');
  const [companySize, setCompanySize] = useState('1-10');
  const [showAllPlans, setShowAllPlans] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  
  const [generatedQuotes, setGeneratedQuotes] = useState<Array<QuotationData>>([
    {
      name: "Plano Essencial",
      price: 450.90,
      coverage: "Nacional",
      hospital: "Rede Básica",
      benefits: ["Consultas", "Emergências", "Exames básicos"],
      ages: [
        { age: 42, price: 220.90 },
        { age: 38, price: 190.00 },
        { age: 12, price: 120.00 },
        { age: 8, price: 100.00 },
      ],
      totalPrice: 630.90,
      participation: true,
      planType: 'pf'
    },
    {
      name: "Plano Premium",
      price: 789.90,
      coverage: "Nacional",
      hospital: "Rede Ampliada",
      benefits: ["Consultas", "Emergências", "Exames completos", "Fisioterapia", "Terapias"],
      ages: [
        { age: 42, price: 320.90 },
        { age: 38, price: 290.00 },
        { age: 12, price: 140.00 },
        { age: 8, price: 115.00 },
      ],
      totalPrice: 865.90,
      participation: false,
      planType: 'pf',
      recommended: true
    },
    {
      name: "Plano Master",
      price: 1250.50,
      coverage: "Internacional",
      hospital: "Rede Exclusiva",
      benefits: ["Consultas", "Emergências", "Exames completos", "Fisioterapia", "Terapias", "Odontologia", "Telemedicina 24h"],
      ages: [
        { age: 42, price: 420.90 },
        { age: 38, price: 390.00 },
        { age: 12, price: 190.00 },
        { age: 8, price: 165.00 },
      ],
      totalPrice: 1165.90,
      participation: false,
      planType: 'pf'
    }
  ]);

  const addAgeTag = () => {
    if (newAge && parseInt(newAge) > 0) {
      const newTag: AgeTag = {
        id: Date.now().toString(),
        age: parseInt(newAge),
        relation: newRelation
      };
      setAgeTags([...ageTags, newTag]);
      setNewAge('');
      setNewRelation(ageTags.length === 0 ? 'Titular' : 'Dependente');
    }
  };

  const removeAgeTag = (id: string) => {
    setAgeTags(ageTags.filter(tag => tag.id !== id));
  };
  
  const generateQuote = () => {
    // Create age entries for the quotes based on the tags
    const ageEntries = ageTags.map(tag => ({
      age: tag.age,
      price: 150 + (tag.age / 2) // Simple calculation for demo purposes
    }));

    const newQuotes = [
      {
        name: "Plano Essencial",
        price: 450.90,
        coverage: "Nacional",
        hospital: "Rede Básica",
        benefits: ["Consultas", "Emergências", "Exames básicos"],
        ages: ageEntries.map(entry => ({ 
          age: entry.age, 
          price: entry.price * 0.8
        })),
        totalPrice: 450.90 + ageEntries.reduce((sum, entry) => sum + entry.price * 0.8, 0),
        participation: true,
        planType: planType
      },
      {
        name: "Plano Premium",
        price: 789.90,
        coverage: "Nacional",
        hospital: "Rede Ampliada",
        benefits: ["Consultas", "Emergências", "Exames completos", "Fisioterapia", "Terapias"],
        ages: ageEntries.map(entry => ({ 
          age: entry.age, 
          price: entry.price * 1.2
        })),
        totalPrice: 789.90 + ageEntries.reduce((sum, entry) => sum + entry.price * 1.2, 0),
        participation: false,
        planType: planType,
        recommended: true
      },
      {
        name: "Plano Master",
        price: 1250.50,
        coverage: "Internacional",
        hospital: "Rede Exclusiva",
        benefits: ["Consultas", "Emergências", "Exames completos", "Fisioterapia", "Terapias", "Odontologia", "Telemedicina 24h"],
        ages: ageEntries.map(entry => ({ 
          age: entry.age, 
          price: entry.price * 1.5
        })),
        totalPrice: 1250.50 + ageEntries.reduce((sum, entry) => sum + entry.price * 1.5, 0),
        participation: false,
        planType: planType
      }
    ];
    
    setGeneratedQuotes(newQuotes);
  };

  // Send quotation to chat
  const sendToChat = (quote: QuotationData) => {
    // @ts-ignore - Access the global function from ChatInterface
    if (window.sendQuotationToChat) {
      // @ts-ignore
      window.sendQuotationToChat(quote);
    }
  };

  const handleAutoPopulation = (extractedData: any) => {
    console.log('Dados extraídos do chat:', extractedData);
    // Aqui você pode atualizar os filtros automaticamente baseado nos dados extraídos
  };

  const handleSimulate = () => {
    console.log('Executando simulação...');
    generateQuote();
  };

  const handleClearFilters = () => {
    console.log('Limpando filtros...');
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        {/* Auto-population Service */}
        <AutoPopulationService 
          chatHistory={chatHistory}
          onDataExtracted={handleAutoPopulation}
        />

        {/* Simulation Filters */}
        <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-health-800">Simulação de Planos</h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                {isFiltersOpen ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <SimulationFilters 
              onSimulate={handleSimulate}
              onClear={handleClearFilters}
            />
          </CollapsibleContent>
        </Collapsible>

        {/* Generated Plans Section */}
        {generatedQuotes.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-health-800">Planos Disponíveis</h3>
            
            <div className="space-y-4">
              {generatedQuotes.map((quote, index) => (
                <Card 
                key={index} 
                className={cn(
                  "border-l-4 relative",
                  quote.recommended ? "border-l-health-600 shadow-md" : "border-l-gray-200"
                )}
              >
                {quote.recommended && (
                  <div className="absolute top-2 right-2 bg-health-600 text-white text-xs px-2 py-0.5 rounded">
                    Recomendado
                  </div>
                )}
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-health-800">{quote.name}</h3>
                      <p className="text-gray-500 text-sm">
                        Cobertura {quote.coverage} • {quote.hospital} • 
                        {quote.planType === 'pf' ? ' Pessoa Física' : ' Pessoa Jurídica'} • 
                        {quote.participation ? ' Com' : ' Sem'} coparticipação
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-xl font-bold text-health-800">
                        R$ {quote.totalPrice?.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500">por mês</div>
                    </div>
                  </div>
                  
                  {/* Age breakdown */}
                  {quote.ages && (
                    <div className="mb-3 border-t border-gray-100 pt-3">
                      <h4 className="text-sm font-medium mb-2 text-health-700">Valores por beneficiário:</h4>
                      <div className="grid grid-cols-1 gap-1">
                        {quote.ages.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm py-1">
                            <span className="text-gray-600">
                              {idx === 0 ? 'Titular' : `Dependente ${idx}`} ({item.age} anos)
                            </span>
                            <span className="font-medium text-health-800">R$ {item.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2 text-health-700">Benefícios inclusos:</h4>
                    <div className="flex flex-wrap gap-2">
                      {quote.benefits.map((benefit, idx) => (
                        <div key={idx} className="bg-health-50 text-health-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <Check size={12} />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-health-600 border-health-200 hover:border-health-300 hover:bg-health-50 flex items-center gap-1 flex-1"
                      onClick={() => sendToChat(quote)}
                    >
                      <MessageSquare size={14} />
                      Enviar no Chat
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-health-600 hover:bg-health-700 flex items-center gap-1 flex-1"
                    >
                      <Send size={14} />
                      Selecionar Plano
                    </Button>
                  </div>
                </CardContent>
              </Card>
              ))}
            </div>

            <Button 
              variant="outline"
              className="w-full mt-4 text-health-700 border-health-200 hover:bg-health-50 hover:border-health-300"
              onClick={() => setShowAllPlans(!showAllPlans)}
            >
              {showAllPlans ? "Ver menos planos" : "Ver todos os planos disponíveis"}
            </Button>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default QuotationGenerator;
