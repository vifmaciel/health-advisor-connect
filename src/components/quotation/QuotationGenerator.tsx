
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Check, Plus, Send, MessageSquare, ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { QuotationData } from '../chat/ChatInterface';

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

const QuotationGenerator: React.FC<QuotationGeneratorProps> = ({ clientInfo }) => {
  const [age, setAge] = useState(clientInfo.age || 35);
  const [dependents, setDependents] = useState(clientInfo.dependents || 2);
  const [planType, setPlanType] = useState('pf');
  const [showAllPlans, setShowAllPlans] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  
  const dependentAges = [
    { relation: 'Cônjuge', age: 38 },
    { relation: 'Filho(a)', age: 12 },
    { relation: 'Filho(a)', age: 8 }
  ];
  
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
  
  const generateQuote = () => {
    const totalDependents = dependents + 1;
    const newQuotes = [
      {
        name: "Plano Essencial",
        price: 450.90,
        coverage: "Nacional",
        hospital: "Rede Básica",
        benefits: ["Consultas", "Emergências", "Exames básicos"],
        ages: [
          { age: age, price: 220.90 },
          ...dependentAges.slice(0, dependents).map((dep, i) => ({ 
            age: dep.age, 
            price: 150.00 - (i * 15) 
          }))
        ],
        totalPrice: 450.90 + (dependents * 110),
        participation: true,
        planType: planType
      },
      {
        name: "Plano Premium",
        price: 789.90,
        coverage: "Nacional",
        hospital: "Rede Ampliada",
        benefits: ["Consultas", "Emergências", "Exames completos", "Fisioterapia", "Terapias"],
        ages: [
          { age: age, price: 320.90 },
          ...dependentAges.slice(0, dependents).map((dep, i) => ({ 
            age: dep.age, 
            price: 230.00 - (i * 20) 
          }))
        ],
        totalPrice: 789.90 + (dependents * 195),
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
        ages: [
          { age: age, price: 420.90 },
          ...dependentAges.slice(0, dependents).map((dep, i) => ({ 
            age: dep.age, 
            price: 290.00 - (i * 25) 
          }))
        ],
        totalPrice: 1250.50 + (dependents * 305),
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
  
  return (
    <div className="h-full flex flex-col">
      {/* Client Info Section */}
      <Collapsible open={isDetailsOpen} onOpenChange={setIsDetailsOpen} className="mb-4">
        <Card>
          <div className="flex justify-between items-center p-4 pb-2">
            <CardTitle className="text-health-800">Detalhes do Cliente</CardTitle>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                {isDetailsOpen ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Nome</p>
                  <p className="font-medium">{clientInfo.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Idade</p>
                  <p className="font-medium">{clientInfo.age} anos</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Telefone</p>
                  <p className="font-medium">{clientInfo.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{clientInfo.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Localização</p>
                  <p className="font-medium">{clientInfo.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Plano Atual</p>
                  <p className="font-medium">{clientInfo.healthPlan || 'Nenhum'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Dependentes</p>
                  <p className="font-medium">{clientInfo.dependents || 0}</p>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-health-800">Simulação de Planos</CardTitle>
          <CardDescription>Configure os parâmetros para gerar propostas personalizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-1 block">Idade do titular</label>
              <div className="flex items-center gap-4">
                <Slider 
                  value={[age]}
                  min={18}
                  max={85}
                  step={1}
                  className="flex-1"
                  onValueChange={(values) => setAge(values[0])}
                />
                <span className="text-sm font-medium w-8 text-center">{age}</span>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Número de dependentes</label>
              <div className="flex items-center gap-4">
                <Slider 
                  value={[dependents]}
                  min={0}
                  max={10}
                  step={1}
                  className="flex-1"
                  onValueChange={(values) => setDependents(values[0])}
                />
                <span className="text-sm font-medium w-8 text-center">{dependents}</span>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Tipo de plano</label>
              <Select value={planType} onValueChange={setPlanType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pf">Pessoa Física</SelectItem>
                  <SelectItem value="pj">Pessoa Jurídica</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Região</label>
              <Select defaultValue="sp">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sp">São Paulo</SelectItem>
                  <SelectItem value="rj">Rio de Janeiro</SelectItem>
                  <SelectItem value="mg">Minas Gerais</SelectItem>
                  <SelectItem value="other">Outras regiões</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            className="w-full mt-6 bg-health-600 hover:bg-health-700"
            onClick={generateQuote}
          >
            Gerar Orçamentos
          </Button>
        </CardContent>
      </Card>
      
      <h3 className="text-lg font-semibold mb-3">Top 3 Planos Compatíveis</h3>
      
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 gap-4">
          {generatedQuotes.map((quote, index) => (
            <Card 
              key={index} 
              className={cn(
                "border-l-4",
                quote.recommended ? "border-l-health-600" : "border-l-gray-200"
              )}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{quote.name}</h3>
                    <p className="text-gray-500 text-sm">
                      Cobertura {quote.coverage} • {quote.hospital} • 
                      {quote.planType === 'pf' ? ' Pessoa Física' : ' Pessoa Jurídica'} • 
                      {quote.participation ? ' Com' : ' Sem'} coparticipação
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-health-800">
                      R$ {quote.totalPrice?.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">por mês</div>
                  </div>
                </div>
                
                {/* Age breakdown */}
                {quote.ages && (
                  <div className="mt-3 border-t border-gray-100 pt-2">
                    <h4 className="text-sm font-medium mb-1">Valores por idade:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {quote.ages.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span>{idx === 0 ? 'Titular' : `Dependente ${idx}`} ({item.age} anos)</span>
                          <span className="font-medium">R$ {item.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-3">
                  <h4 className="text-sm font-medium mb-1">Benefícios inclusos:</h4>
                  <div className="flex flex-wrap gap-2">
                    {quote.benefits.map((benefit, idx) => (
                      <div key={idx} className="bg-health-50 text-health-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Check size={12} />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-health-600 border-health-200 hover:border-health-300 hover:bg-health-50 flex items-center gap-1"
                    onClick={() => sendToChat(quote)}
                  >
                    <MessageSquare size={14} />
                    Enviar no Chat
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-health-600 hover:bg-health-700 flex items-center gap-1"
                  >
                    <Send size={14} />
                    Selecionar Plano
                  </Button>
                </div>
                
                {quote.recommended && (
                  <div className="absolute top-2 right-2 bg-health-600 text-white text-xs px-2 py-0.5 rounded">
                    Recomendado
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Button 
        variant="outline"
        className="mt-4 text-health-700 border-health-200 hover:bg-health-50 hover:border-health-300"
        onClick={() => setShowAllPlans(!showAllPlans)}
      >
        {showAllPlans ? "Ver menos planos" : "Ver todos os planos disponíveis"}
      </Button>
    </div>
  );
};

export default QuotationGenerator;
