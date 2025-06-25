
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Download, TrendingUp, Users, MessageCircle, Calculator } from 'lucide-react';

const Relatorios: React.FC = () => {
  const reportCards = [
    {
      title: 'Relatório de Vendas',
      description: 'Análise completa das vendas por período',
      icon: TrendingUp,
      color: 'bg-green-500',
      data: 'R$ 45.230 em vendas este mês'
    },
    {
      title: 'Relatório de Clientes',
      description: 'Estatísticas de clientes e conversões',
      icon: Users,
      color: 'bg-blue-500',
      data: '127 clientes ativos'
    },
    {
      title: 'Relatório de Atendimento',
      description: 'Métricas de chat e suporte',
      icon: MessageCircle,
      color: 'bg-purple-500',
      data: '89% taxa de satisfação'
    },
    {
      title: 'Relatório de Cotações',
      description: 'Análise de cotações e propostas',
      icon: Calculator,
      color: 'bg-orange-500',
      data: '68% taxa de conversão'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-health-800 mb-2">Relatórios</h1>
          <p className="text-gray-600">Análises e métricas do seu negócio</p>
        </div>
        <Button className="bg-health-600 hover:bg-health-700">
          <Download size={16} className="mr-2" />
          Exportar Dados
        </Button>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportCards.map((report, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${report.color} flex items-center justify-center`}>
                  <report.icon size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-health-800">{report.title}</h3>
                  <p className="text-sm text-gray-600 font-normal">{report.description}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-2xl font-bold text-health-800 mb-1">{report.data}</p>
                <p className="text-sm text-green-600">+12% vs mês anterior</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <BarChart3 size={14} className="mr-1" />
                  Ver Gráficos
                </Button>
                <Button size="sm" className="flex-1 bg-health-600 hover:bg-health-700">
                  <Download size={14} className="mr-1" />
                  Exportar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo Mensal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-health-800 mb-1">127</div>
              <div className="text-sm text-gray-600">Clientes Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-health-800 mb-1">R$ 45.2k</div>
              <div className="text-sm text-gray-600">Faturamento</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-health-800 mb-1">68%</div>
              <div className="text-sm text-gray-600">Taxa Conversão</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-health-800 mb-1">4.8</div>
              <div className="text-sm text-gray-600">Avaliação Média</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Relatorios;
