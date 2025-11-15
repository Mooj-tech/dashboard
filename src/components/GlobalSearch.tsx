import { useState, useMemo } from 'react';
import { Search, MapPin, Users, AlertTriangle, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Badge } from './ui/badge';
import { routes, suppliers, alerts } from '@/lib/mockData';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const GlobalSearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const searchResults = useMemo(() => {
    if (!query.trim()) return { routes: [], suppliers: [], alerts: [] };

    const lowerQuery = query.toLowerCase();

    const filteredRoutes = routes.filter(
      (route) =>
        route.id.toLowerCase().includes(lowerQuery) ||
        route.name.toLowerCase().includes(lowerQuery) ||
        route.origin.toLowerCase().includes(lowerQuery) ||
        route.destination.toLowerCase().includes(lowerQuery) ||
        route.carrier.toLowerCase().includes(lowerQuery)
    );

    const filteredSuppliers = suppliers.filter(
      (supplier) =>
        supplier.id.toLowerCase().includes(lowerQuery) ||
        supplier.name.toLowerCase().includes(lowerQuery) ||
        supplier.location.toLowerCase().includes(lowerQuery)
    );

    const filteredAlerts = alerts.filter(
      (alert) =>
        alert.id.toLowerCase().includes(lowerQuery) ||
        alert.title.toLowerCase().includes(lowerQuery) ||
        alert.description.toLowerCase().includes(lowerQuery)
    );

    return {
      routes: filteredRoutes.slice(0, 5),
      suppliers: filteredSuppliers.slice(0, 5),
      alerts: filteredAlerts.slice(0, 5),
    };
  }, [query]);

  const hasResults =
    searchResults.routes.length > 0 ||
    searchResults.suppliers.length > 0 ||
    searchResults.alerts.length > 0;

  const handleRouteClick = (routeId: string) => {
    navigate('/dashboard/routes');
    toast.success(`Viewing route ${routeId}`);
    setOpen(false);
    setQuery('');
  };

  const handleSupplierClick = (supplierId: string) => {
    navigate('/dashboard/suppliers');
    toast.success(`Viewing supplier ${supplierId}`);
    setOpen(false);
    setQuery('');
  };

  const handleAlertClick = (alertId: string) => {
    navigate('/dashboard/alerts');
    toast.success(`Viewing alert ${alertId}`);
    setOpen(false);
    setQuery('');
  };

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'High':
        return <Badge className="bg-destructive text-destructive-foreground text-xs">High</Badge>;
      case 'Medium':
        return <Badge className="bg-warning text-warning-foreground text-xs">Medium</Badge>;
      case 'Low':
        return <Badge className="bg-success text-success-foreground text-xs">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Search routes, suppliers, alerts..."
            className="pl-10 pr-10"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-7 w-7"
              onClick={() => {
                setQuery('');
                setOpen(false);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0 bg-card" align="start">
        <Command>
          <CommandList>
            {!query.trim() ? (
              <div className="p-8 text-center text-muted-foreground text-sm">
                <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Start typing to search routes, suppliers, and alerts</p>
              </div>
            ) : !hasResults ? (
              <CommandEmpty>No results found for "{query}"</CommandEmpty>
            ) : (
              <>
                {searchResults.routes.length > 0 && (
                  <CommandGroup heading="Routes">
                    {searchResults.routes.map((route) => (
                      <CommandItem
                        key={route.id}
                        onSelect={() => handleRouteClick(route.id)}
                        className="cursor-pointer"
                      >
                        <MapPin className="mr-2 h-4 w-4 text-primary" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{route.name}</span>
                            {getRiskBadge(route.riskLevel)}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {route.origin} → {route.destination}
                          </p>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}

                {searchResults.suppliers.length > 0 && (
                  <CommandGroup heading="Suppliers">
                    {searchResults.suppliers.map((supplier) => (
                      <CommandItem
                        key={supplier.id}
                        onSelect={() => handleSupplierClick(supplier.id)}
                        className="cursor-pointer"
                      >
                        <Users className="mr-2 h-4 w-4 text-primary" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{supplier.name}</span>
                            <span className="text-xs text-muted-foreground">
                              Risk: {supplier.riskScore}%
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">{supplier.location}</p>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}

                {searchResults.alerts.length > 0 && (
                  <CommandGroup heading="Alerts">
                    {searchResults.alerts.map((alert) => (
                      <CommandItem
                        key={alert.id}
                        onSelect={() => handleAlertClick(alert.id)}
                        className="cursor-pointer"
                      >
                        <AlertTriangle className="mr-2 h-4 w-4 text-primary" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{alert.title}</span>
                            {getRiskBadge(alert.severity)}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {alert.description}
                          </p>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default GlobalSearch;
