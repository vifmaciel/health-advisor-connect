
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MessageCircle, Calendar, TrendingUp } from 'lucide-react';
import DailySchedule from '@/components/dashboard/DailySchedule';
import NewLeads from '@/components/dashboard/NewLeads';
import UrgentEvents from '@/components/dashboard/UrgentEvents';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Clientes Ativos',
      value: '127',
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Conversas Hoje',
      value: '43',
      change: '+8%',
      icon: MessageCircle,
      color: 'bg-green-500'
    },
    {
      title: 'Agendamentos',
      value: '18',
      change: '+15%',
      icon: Calendar,
      color: 'bg-purple-500'
    },
    {
      title: 'Taxa Conversão',
      value: '68%',
      change: '+5%',
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-health-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Visão geral do seu sistema de atendimento</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-health-800">{stat.value}</p>
                  <p className="text-xs text-green-600 font-medium">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center`}>
                  <stat.icon size={24} className="text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-health-800">Agenda do Dia</CardTitle>
          </CardHeader>
          <CardContent>
            <DailySchedule />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-health-800">Novos Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <NewLeads />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-health-800">Eventos Urgentes</CardTitle>
            </CardHeader>
            <CardContent>
              <UrgentEvents />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
