
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';
import BackgroundController from './BackgroundController';

const AppLayout: React.FC = () => {
  const [background, setBackground] = useState('#f8fafc');

  const backgroundStyle = {
    background: background.includes('gradient') || background.includes('url') 
      ? background 
      : background,
    backgroundSize: background.includes('url') ? 'cover' : 'auto',
    backgroundPosition: background.includes('url') ? 'center' : 'initial',
    backgroundRepeat: background.includes('url') ? 'no-repeat' : 'initial',
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full" style={backgroundStyle}>
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <header className="h-14 border-b border-gray-200 bg-white/95 backdrop-blur-sm flex items-center justify-between px-6">
            <h1 className="text-xl font-semibold text-health-800">NEURA + ORUS</h1>
            <BackgroundController onBackgroundChange={setBackground} />
          </header>
          <div className="flex-1 overflow-hidden">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
