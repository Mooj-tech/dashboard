import { create } from 'zustand';
import { Alert, alerts } from './mockData';

interface User {
  name: string;
  email: string;
  company: string;
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
  alerts: Alert[];
  unreadNotifications: number;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  toggleSidebar: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  acknowledgeAlert: (alertId: string) => void;
  markNotificationsAsRead: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  sidebarCollapsed: false,
  mobileMenuOpen: false,
  alerts: alerts,
  unreadNotifications: alerts.filter(a => !a.acknowledged).length,
  login: (email: string, password: string) => {
    // Get registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Check if user exists with correct password
    const user = registeredUsers.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      set({
        isAuthenticated: true,
        user: {
          name: user.name,
          email: user.email,
          company: 'Mooj-Tech Logistics',
        },
      });
      return true;
    }
    return false;
  },
  signup: (name: string, email: string, password: string) => {
    // Get existing users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Check if user already exists
    const existingUser = registeredUsers.find((u: any) => u.email === email);
    if (existingUser) {
      return false; // User already exists
    }
    
    // Add new user
    const newUser = { name, email, password };
    registeredUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    
    // Auto login after signup
    set({
      isAuthenticated: true,
      user: {
        name: name,
        email: email,
        company: 'Mooj-Tech Logistics',
      },
    });
    return true;
  },
  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
    });
  },
  toggleSidebar: () => {
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
  },
  setMobileMenuOpen: (open: boolean) => {
    set({ mobileMenuOpen: open });
  },
  acknowledgeAlert: (alertId: string) => 
    set((state) => ({
      alerts: state.alerts.map((alert) =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      ),
      unreadNotifications: state.alerts.filter(a => !a.acknowledged && a.id !== alertId).length,
    })),
  markNotificationsAsRead: () =>
    set((state) => ({
      alerts: state.alerts.map((alert) => ({ ...alert, acknowledged: true })),
      unreadNotifications: 0,
    })),
}));
