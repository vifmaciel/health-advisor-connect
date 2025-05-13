
import React from 'react';
import { Home, Calendar, MessageCircle, Users, Bell, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <div className={cn('bg-sidebar h-screen w-16 flex flex-col items-center py-6 gap-8', className)}>
      <div className="w-10 h-10 rounded-full bg-health-600 flex items-center justify-center">
        <span className="text-white font-bold text-lg">HS</span>
      </div>
      
      <div className="flex flex-col gap-6 items-center mt-8">
        <SidebarIcon icon={<Home size={20} />} active />
        <SidebarIcon icon={<Calendar size={20} />} />
        <SidebarIcon icon={<MessageCircle size={20} />} />
        <SidebarIcon icon={<Users size={20} />} />
        <SidebarIcon icon={<Bell size={20} />} />
      </div>
      
      <div className="mt-auto">
        <SidebarIcon icon={<Settings size={20} />} />
      </div>
    </div>
  );
};

interface SidebarIconProps {
  icon: React.ReactNode;
  active?: boolean;
}

const SidebarIcon: React.FC<SidebarIconProps> = ({ icon, active }) => {
  return (
    <div className={cn(
      'w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors',
      active ? 'bg-health-600 text-white' : 'bg-sidebar-accent text-gray-400 hover:bg-health-700 hover:text-white'
    )}>
      {icon}
    </div>
  );
};

export default Sidebar;
