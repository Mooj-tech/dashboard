import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  MapPin,
  Users,
  AlertTriangle,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Truck,
  Package,
  LogOut,
  FileText,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import logo from '@/assets/logo.svg';
import favicon from '@/assets/favicon.svg';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Route Risks', href: '/dashboard/routes', icon: MapPin },
  { name: 'Supplier Insights', href: '/dashboard/suppliers', icon: Users },
  { name: 'Fleet Management', href: '/dashboard/fleet', icon: Truck },
  { name: 'Shipment Tracking', href: '/dashboard/tracking', icon: Package },
  { name: 'Predictive Alerts', href: '/dashboard/alerts', icon: AlertTriangle },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Reports', href: '/dashboard/reports', icon: FileText },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

const Sidebar = () => {
  const { sidebarCollapsed, toggleSidebar, user, logout, setMobileMenuOpen } = useAppStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout && logout();
    toast.success('Logged out successfully');
    navigate('/auth');
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 64 : 256 }}
      transition={{ duration: 0.3 }}
      className="bg-sidebar border-r border-sidebar-border fixed left-0 top-0 h-screen z-40"
    >
      <div className="h-full flex flex-col overflow-hidden">
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-sidebar-border">
          {/* Expanded: show full logo */}
          {!sidebarCollapsed && (
            <motion.img
              src={logo}
              alt="Mooj-Tech"
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="h-20 w-40"
            />
          )}

          {/* Collapsed / mobile: show favicon */}
          {sidebarCollapsed && (
            <img src={favicon} alt="M" className="h-12 w-auto" />
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === '/dashboard'}
              onClick={() => setMobileMenuOpen && setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-sidebar-accent text-primary'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`
              }
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-medium"
                >
                  {item.name}
                </motion.span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User footer + Toggle Button */}
        <div className="p-3 border-t border-sidebar-border">
          {!sidebarCollapsed ? (
            <>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate text-white">{user?.name || 'User'}</p>
                  <p className="text-xs truncate text-white opacity-70">{user?.email || ''}</p>
                </div>
              </div>

              {/* Logout on next line */}
              <div className="mt-3">
                <Button variant="outline" onClick={handleLogout} className="w-full bg-primary text-primary-foreground border-primary hover:bg-primary/90">
                  Logout
                </Button>
              </div>

              {/* Toggle Button (kept below user area) */}
              <div className="mt-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className="w-full hover:bg-sidebar-accent"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={handleLogout} className="text-primary hover:text-primary/80 hover:bg-primary/10">
                  <LogOut className="h-4 w-4" />
                </Button>

                <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hover:bg-sidebar-accent">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
