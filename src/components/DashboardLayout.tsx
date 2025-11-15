import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from './ui/sheet';
import { useAppStore } from '@/lib/store';

const DashboardLayout = () => {
  const isMobile = useIsMobile();
  const { mobileMenuOpen, setMobileMenuOpen } = useAppStore();

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Desktop Sidebar */}
      {!isMobile && <Sidebar />}
      
      {/* Mobile Sidebar Sheet */}
      {isMobile && (
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>
      )}
      
      <div className={`flex-1 flex flex-col min-w-0 ${!isMobile ? 'ml-64' : ''}`}>
        <Header />
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
      

    </div>
  );
};

export default DashboardLayout;
