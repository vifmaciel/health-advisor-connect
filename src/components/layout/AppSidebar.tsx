
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  MessageCircle, 
  Users, 
  Calculator,
  Calendar,
  BarChart3,
  Settings
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

const menuItems = [
  { title: 'Dashboard', url: '/', icon: Home },
  { title: 'Atendimento', url: '/atendimento', icon: MessageCircle },
  { title: 'Clientes', url: '/clientes', icon: Users },
  { title: 'Cotações', url: '/cotacoes', icon: Calculator },
  { title: 'Agenda', url: '/agenda', icon: Calendar },
  { title: 'Relatórios', url: '/relatorios', icon: BarChart3 },
];

const AppSidebar: React.FC = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  const getNavClass = (active: boolean) => 
    active 
      ? 'bg-health-100 text-health-800 font-medium border-r-2 border-health-600' 
      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900';

  return (
    <Sidebar className={collapsed ? 'w-16' : 'w-64'} collapsible>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-health-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">HS</span>
          </div>
          {!collapsed && (
            <div>
              <p className="font-semibold text-health-800 text-sm">Health System</p>
              <p className="text-xs text-gray-500">Versão 2.0</p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent>
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Menu Principal
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === '/'}
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${getNavClass(isActive)}`
                      }
                    >
                      <item.icon size={20} className="flex-shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4 border-t border-gray-200">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to="/configuracoes" 
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${getNavClass(isActive)}`
                      }
                    >
                      <Settings size={20} className="flex-shrink-0" />
                      {!collapsed && <span>Configurações</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>

      <SidebarTrigger className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1" />
    </Sidebar>
  );
};

export default AppSidebar;
