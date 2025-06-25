
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings, User, Bell, Palette, Shield } from 'lucide-react';

const Configuracoes: React.FC = () => {
  const configSections = [
    {
      title: 'Perfil do Usuário',
      icon: User,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input id="name" defaultValue="João Silva" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="joao@empresa.com" />
            </div>
          </div>
          <div>
            <Label htmlFor="phone">Telefone</Label>
            <Input id="phone" defaultValue="(11) 99999-9999" />
          </div>
          <Button className="bg-health-600 hover:bg-health-700">
            Salvar Perfil
          </Button>
        </div>
      )
    },
    {
      title: 'Notificações',
      icon: Bell,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Notificações de Email</Label>
              <p className="text-sm text-gray-600">Receber emails sobre novos leads</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Notificações Push</Label>
              <p className="text-sm text-gray-600">Notificações no navegador</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Alertas de Chat</Label>
              <p className="text-sm text-gray-600">Som quando receber mensagens</p>
            </div>
            <Switch />
          </div>
        </div>
      )
    },
    {
      title: 'Aparência',
      icon: Palette,
      content: (
        <div className="space-y-4">
          <div>
            <Label>Tema do Sistema</Label>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm">Claro</Button>
              <Button variant="outline" size="sm">Escuro</Button>
              <Button variant="outline" size="sm">Automático</Button>
            </div>
          </div>
          <div>
            <Label>Cor Primária</Label>
            <div className="flex gap-2 mt-2">
              <div className="w-8 h-8 rounded bg-health-600 border-2 border-gray-300 cursor-pointer"></div>
              <div className="w-8 h-8 rounded bg-blue-600 border-2 border-gray-300 cursor-pointer"></div>
              <div className="w-8 h-8 rounded bg-green-600 border-2 border-gray-300 cursor-pointer"></div>
              <div className="w-8 h-8 rounded bg-purple-600 border-2 border-gray-300 cursor-pointer"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Segurança',
      icon: Shield,
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="current-password">Senha Atual</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="new-password">Nova Senha</Label>
              <Input id="new-password" type="password" />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirmar Senha</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Autenticação de Dois Fatores</Label>
              <p className="text-sm text-gray-600">Adicione uma camada extra de segurança</p>
            </div>
            <Switch />
          </div>
          <Button className="bg-health-600 hover:bg-health-700">
            Atualizar Senha
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-health-800 mb-2">Configurações</h1>
        <p className="text-gray-600">Gerencie suas preferências e configurações do sistema</p>
      </div>

      <div className="space-y-6">
        {configSections.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <section.icon size={20} className="text-health-600" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {section.content}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Configuracoes;
