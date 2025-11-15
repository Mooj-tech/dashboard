import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
// user menu moved to Sidebar
import { useAppStore } from '@/lib/store';
// user menu moved to Sidebar
import NotificationDropdown from './NotificationDropdown';
import GlobalSearch from './GlobalSearch';

const Header = () => {
  const { setMobileMenuOpen } = useAppStore();
  const isMobile = useIsMobile();

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 sm:px-6">
      {/* Mobile Menu Button */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(true)}
          className="mr-2"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* Global Search */}
      <div className="hidden sm:block flex-1">
        <GlobalSearch />
      </div>
      
      {/* Mobile spacer */}
      <div className="flex-1 sm:hidden" />

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Notifications */}
        <NotificationDropdown />

        {/* user menu moved into Sidebar footer */}
      </div>
    </header>
  );
};

export default Header;
