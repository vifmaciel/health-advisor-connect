import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp } from 'lucide-react';
import SimulationFilters from './SimulationFilters';
import AutoPopulationService from './AutoPopulationService';
import { QuotationData } from '../chat/ChatInterface';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, Send, MessageSquare, X } from 'lucide-react';
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
  const [selectedInsurance, setSelectedInsurance] = useState('bradesco');
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

  // Operadoras disponíveis
  const insuranceOptions = [
    { value: 'bradesco', label: 'Bradesco Saúde' },
    { value: 'amil', label: 'Amil' },
    { value: 'sulamérica', label: 'SulAmérica' }
  ];

  // Gerar cotações baseadas na operadora selecionada
  const generateQuotesForInsurance = (insurance: string) => {
    const ageEntries = ageTags.map(tag => ({
      age: tag.age,
      price: 150 + (tag.age / 2)
    }));

    const baseQuotes = {
      bradesco: [
        {
          name: "Bradesco Saúde Nacional Flex",
          basePrice: 420.90,
          coverage: "Nacional",
          hospital: "Rede Bradesco + Hospitais Premium",
          benefits: ["Consultas", "Emergências", "Exames completos", "Fisioterapia"],
          participation: true,
          multiplier: 0.8
        },
        {
          name: "Bradesco Saúde Nacional Plus",
          basePrice: 680.90,
          coverage: "Nacional", 
          hospital: "Rede Completa + Albert Einstein",
          benefits: ["Consultas", "Emergências", "Exames completos", "Fisioterapia", "Terapias", "Check-up"],
          participation: false,
          multiplier: 1.1,
          recommended: true
        },
        {
          name: "Bradesco Saúde Top Premium",
          basePrice: 980.50,
          coverage: "Internacional",
          hospital: "Rede Exclusiva Premium",
          benefits: ["Consultas", "Emergências", "Exames completos", "Fisioterapia", "Terapias", "Odontologia", "Telemedicina 24h", "Medicina Preventiva"],
          participation: false,
          multiplier: 1.4
        }
      ],
      amil: [
        {
          name: "Amil Fácil",
          basePrice: 380.90,
          coverage: "Regional",
          hospital: "Rede Amil Básica",
          benefits: ["Consultas", "Emergências", "Exames básicos"],
          participation: true,
          multiplier: 0.7
        },
        {
          name: "Amil Blue",
          basePrice: 620.90,
          coverage: "Nacional",
          hospital: "Rede Amil + Hospitais Conveniados",
          benefits: ["Consultas", "Emergências", "Exames completos", "Fisioterapia", "Psicologia"],
          participation: false,
          multiplier: 1.0,
          recommended: true
        },
        {
          name: "Amil One",
          basePrice: 1180.50,
          coverage: "Internacional",
          hospital: "Rede Premium + Sírio-Libanês",
          benefits: ["Consultas", "Emergências", "Exames completos", "Fisioterapia", "Terapias", "Odontologia", "Medicina Preventiva", "Concierge"],
          participation: false,
          multiplier: 1.5
        }
      ],
      sulamérica: [
        {
          name: "SulAmérica Clássico",
          basePrice: 450.90,
          coverage: "Regional",
          hospital: "Rede SulAmérica",
          benefits: ["Consultas", "Emergências", "Exames básicos", "Fisioterapia"],
          participation: true,
          multiplier: 0.8
        },
        {
          name: "SulAmérica Especial",
          basePrice: 720.90,
          coverage: "Nacional",
          hospital: "Rede Ampliada + Hospital das Clínicas",
          benefits: ["Consultas", "Emergências", "Exames completos", "Fisioterapia", "Terapias", "Psicologia"],
          participation: false,
          multiplier: 1.2,
          recommended: true
        },
        {
          name: "SulAmérica Executivo",
          basePrice: 1050.50,
          coverage: "Internacional",
          hospital: "Rede Premium Exclusiva",
          benefits: ["Consultas", "Emergências", "Exames completos", "Fisioterapia", "Terapias", "Odontologia", "Medicina Preventiva", "Telemedicina"],
          participation: false,
          multiplier: 1.3
        }
      ]
    };

    const quotes = baseQuotes[insurance as keyof typeof baseQuotes] || baseQuotes.bradesco;
    
    return quotes.map(quote => ({
      name: quote.name,
      price: quote.basePrice,
      coverage: quote.coverage,
      hospital: quote.hospital,
      benefits: quote.benefits,
      ages: ageEntries.map(entry => ({ 
        age: entry.age, 
        price: entry.price * quote.multiplier
      })),
      totalPrice: quote.basePrice + ageEntries.reduce((sum, entry) => sum + entry.price * quote.multiplier, 0),
      participation: quote.participation,
      planType: planType,
      recommended: quote.recommended,
      insuranceName: insuranceOptions.find(ins => ins.value === insurance)?.label
    }));
  };
  
  const [generatedQuotes, setGeneratedQuotes] = useState<Array<QuotationData>>(
    generateQuotesForInsurance('bradesco')
  );

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
    const newQuotes = generateQuotesForInsurance(selectedInsurance);
    setGeneratedQuotes(newQuotes);
  };

  // Send quotation to chat
  const sendToChat = (quote: QuotationData) => {
    // @ts-ignore
    if (window.sendQuotationToChat) {
      // @ts-ignore
      window.sendQuotationToChat(quote);
    }
  };

  const handleAutoPopulation = (extractedData: any) => {
    console.log('Dados extraídos do chat:', extractedData);
  };

  const handleSimulate = () => {
    console.log('Executando simulação...');
    generateQuote();
  };

  const handleClearFilters = () => {
    console.log('Limpando filtros...');
  };

  // Atualizar cotações quando a operadora mudar
  React.useEffect(() => {
    const newQuotes = generateQuotesForInsurance(selectedInsurance);
    setGeneratedQuotes(newQuotes);
  }, [selectedInsurance, ageTags, planType]);

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        {/* Auto-population Service */}
        <AutoPopulationService 
          chatHistory={chatHistory}
          onDataExtracted={handleAutoPopulation}
        />

        {/* Insurance Selector */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-health-800">Operadora:</h4>
          <Select value={selectedInsurance} onValueChange={setSelectedInsurance}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione a operadora" />
            </SelectTrigger>
            <SelectContent>
              {insuranceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
            <h3 className="text-lg font-semibold text-health-800">
              Planos {insuranceOptions.find(ins => ins.value === selectedInsurance)?.label}
            </h3>
            
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
