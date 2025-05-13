
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Check, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const QuotationGenerator: React.FC = () => {
  const [age, setAge] = useState(35);
  const [dependents, setDependents] = useState(2);
  const [planType, setPlanType] = useState('standard');
  
  const [generatedQuotes, setGeneratedQuotes] = useState<Array<{
    name: string;
    price: number;
    coverage: string;
    hospital: string;
    benefits: string[];
    recommended?: boolean;
  }>>([
    {
      name: "Plano Essencial",
      price: 450.90,
      coverage: "Nacional",
      hospital: "Rede Básica",
      benefits: ["Consultas", "Emergências", "Exames básicos"],
    }
  ]);
  
  const generateQuote = () => {
    const newQuotes = [
      {
        name: "Plano Essencial",
        price: 450.90 * (dependents + 1),
        coverage: "Nacional",
        hospital: "Rede Básica",
        benefits: ["Consultas", "Emergências", "Exames básicos"],
      },
      {
        name: "Plano Premium",
        price: 789.90 * (dependents + 1),
        coverage: "Nacional",
        hospital: "Rede Ampliada",
        benefits: ["Consultas", "Emergências", "Exames completos", "Fisioterapia", "Terapias"],
        recommended: true
      },
      {
        name: "Plano Master",
        price: 1250.50 * (dependents + 1),
        coverage: "Internacional",
        hospital: "Rede Exclusiva",
        benefits: ["Consultas", "Emergências", "Exames completos", "Fisioterapia", "Terapias", "Odontologia", "Telemedicina 24h"],
      }
    ];
    
    setGeneratedQuotes(newQuotes);
  };
  
  return (
    <div className="h-full flex flex-col">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-health-800">Gerador de Orçamentos</CardTitle>
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
                  <SelectItem value="basic">Básico</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="executive">Executivo</SelectItem>
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
                    <p className="text-gray-500 text-sm">Cobertura {quote.coverage} • {quote.hospital}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-health-800">
                      R$ {quote.price.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">por mês</div>
                  </div>
                </div>
                
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
                  <Button variant="outline" size="sm" className="text-health-600 border-health-200 hover:border-health-300 hover:bg-health-50">
                    Ver detalhes
                  </Button>
                  <Button size="sm" className="bg-health-600 hover:bg-health-700">
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
    </div>
  );
};

export default QuotationGenerator;

