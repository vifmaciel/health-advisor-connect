
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Search, RotateCcw } from 'lucide-react';

interface SimulationFiltersProps {
  onSimulate: () => void;
  onClear: () => void;
}

const SimulationFilters: React.FC<SimulationFiltersProps> = ({ onSimulate, onClear }) => {
  return (
    <div className="space-y-4">
      {/* Seleção Principal */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-health-800 uppercase tracking-wide">
            SELEÇÃO
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label className="text-xs text-gray-600">Localização</Label>
              <Select defaultValue="sp">
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sp">São Paulo - SP</SelectItem>
                  <SelectItem value="rj">Rio de Janeiro - RJ</SelectItem>
                  <SelectItem value="mg">Minas Gerais - MG</SelectItem>
                  <SelectItem value="pr">Paraná - PR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-gray-600">Segmento</Label>
              <Select defaultValue="saude">
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saude">Saúde</SelectItem>
                  <SelectItem value="odonto">Odontológico</SelectItem>
                  <SelectItem value="ambos">Saúde + Odonto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-gray-600">Tipo de Plano</Label>
              <Select defaultValue="individual">
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="familiar">Familiar</SelectItem>
                  <SelectItem value="empresarial">Empresarial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtros */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-health-800 uppercase tracking-wide">
            FILTROS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label className="text-xs text-gray-600">Padrão de Conforto</Label>
              <Select defaultValue="">
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Rede (Múltiplas opções)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basico">Básico</SelectItem>
                  <SelectItem value="intermediario">Intermediário</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-gray-600">Reembolso</Label>
              <Select defaultValue="">
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Operadoras" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="com">Com Reembolso</SelectItem>
                  <SelectItem value="sem">Sem Reembolso</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-gray-600">Atendimento</Label>
              <Select defaultValue="">
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Abrangência" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="municipal">Municipal</SelectItem>
                  <SelectItem value="estadual">Estadual</SelectItem>
                  <SelectItem value="nacional">Nacional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-gray-600">Coparticipação</Label>
              <Select defaultValue="">
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Produtos da operadora" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="com">Com Coparticipação</SelectItem>
                  <SelectItem value="sem">Sem Coparticipação</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-gray-600">MEI</Label>
              <Select defaultValue="">
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sim">Sim</SelectItem>
                  <SelectItem value="nao">Não</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Faixas por Quantidade */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-health-800 uppercase tracking-wide">
            FAIXAS (por quantidade)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="grid grid-cols-10 gap-2 text-xs text-gray-600">
              <div className="text-center">0 a 18</div>
              <div className="text-center">19 a 23</div>
              <div className="text-center">24 a 28</div>
              <div className="text-center">29 a 33</div>
              <div className="text-center">34 a 38</div>
              <div className="text-center">39 a 43</div>
              <div className="text-center">44 a 48</div>
              <div className="text-center">49 a 53</div>
              <div className="text-center">54 a 58</div>
              <div className="text-center">59 ou +</div>
            </div>
            <div className="grid grid-cols-10 gap-2">
              {Array.from({ length: 10 }).map((_, index) => (
                <Input
                  key={index}
                  type="number"
                  min="0"
                  placeholder="0"
                  className="h-8 text-center text-sm"
                  defaultValue={index === 4 ? "1" : index === 5 ? "1" : index === 6 ? "2" : ""}
                />
              ))}
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-medium">Titulares</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Total:</span>
                <Input
                  type="number"
                  value="4"
                  readOnly
                  className="h-8 w-16 text-center text-sm bg-gray-50"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personalizar Modo de Exibição */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-health-800 uppercase tracking-wide">
            PERSONALIZAR O MODO DE EXIBIÇÃO
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="valores" defaultChecked />
                <Label htmlFor="valores" className="text-sm">Valores</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="tabela" defaultChecked />
                <Label htmlFor="tabela" className="text-sm">Tabela Per Capita</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="redes" defaultChecked />
                <Label htmlFor="redes" className="text-sm">Redes</Label>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="resumo" defaultChecked />
                <Label htmlFor="resumo" className="text-sm">Resumo Total de Redes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="reembolso" defaultChecked />
                <Label htmlFor="reembolso" className="text-sm">Reembolso</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="carencia" defaultChecked />
                <Label htmlFor="carencia" className="text-sm">Carência</Label>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="docs" defaultChecked />
                <Label htmlFor="docs" className="text-sm">Docs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="info" defaultChecked />
                <Label htmlFor="info" className="text-sm">+ Info</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="arquivos" defaultChecked />
                <Label htmlFor="arquivos" className="text-sm">Arquivos</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botões de Ação */}
      <div className="flex gap-3 pt-2">
        <Button
          variant="outline"
          onClick={onClear}
          className="flex-1 h-10 text-sm"
        >
          <RotateCcw size={16} className="mr-2" />
          Limpar
        </Button>
        <Button
          onClick={onSimulate}
          className="flex-1 h-10 bg-red-600 hover:bg-red-700 text-white"
        >
          <Search size={16} className="mr-2" />
          Buscar
        </Button>
      </div>
    </div>
  );
};

export default SimulationFilters;
