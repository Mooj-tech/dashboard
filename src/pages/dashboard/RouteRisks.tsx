import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { routes } from '@/lib/mockData';

const getRiskBadgeVariant = (risk: string) => {
  switch (risk) {
    case 'High':
      return 'destructive';
    case 'Medium':
      return 'default';
    case 'Low':
      return 'secondary';
    default:
      return 'default';
  }
};

const RouteRisks = () => {
  const [filterRegion, setFilterRegion] = useState('all');
  const [filterCarrier, setFilterCarrier] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');

  const filteredRoutes = routes.filter((route) => {
    if (filterRegion !== 'all' && !route.origin.includes(filterRegion) && !route.destination.includes(filterRegion)) {
      return false;
    }
    if (filterCarrier !== 'all' && route.carrier !== filterCarrier) {
      return false;
    }
    if (filterRisk !== 'all' && route.riskLevel !== filterRisk) {
      return false;
    }
    return true;
  });

  const carriers = [...new Set(routes.map((r) => r.carrier))];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Route Risk Management</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and analyze shipping route risk levels
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-5 w-5 text-muted-foreground hidden sm:block" />
          <Select value={filterRegion} onValueChange={setFilterRegion}>
            <SelectTrigger className="w-[120px] sm:w-[140px]">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="Asia">Asia</SelectItem>
              <SelectItem value="Europe">Europe</SelectItem>
              <SelectItem value="America">Americas</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterCarrier} onValueChange={setFilterCarrier}>
            <SelectTrigger className="w-[120px] sm:w-[140px]">
              <SelectValue placeholder="Carrier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Carriers</SelectItem>
              {carriers.map((carrier) => (
                <SelectItem key={carrier} value={carrier}>
                  {carrier}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterRisk} onValueChange={setFilterRisk}>
            <SelectTrigger className="w-[120px] sm:w-[140px]">
              <SelectValue placeholder="Risk Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Shipping Routes ({filteredRoutes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-muted-foreground">
                    Route ID
                  </th>
                  <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-muted-foreground">
                    Name
                  </th>
                  <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-muted-foreground">
                    Origin
                  </th>
                  <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-muted-foreground">
                    Destination
                  </th>
                  <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-muted-foreground hidden lg:table-cell">
                    Carrier
                  </th>
                  <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-muted-foreground">
                    Risk Level
                  </th>
                  <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-muted-foreground hidden md:table-cell">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRoutes.map((route, index) => (
                  <motion.tr
                    key={route.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium">{route.id}</td>
                    <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm">{route.name}</td>
                    <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm">{route.origin}</td>
                    <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm">{route.destination}</td>
                    <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm hidden lg:table-cell">{route.carrier}</td>
                    <td className="py-3 px-2 sm:px-4">
                      <Badge variant={getRiskBadgeVariant(route.riskLevel)} className="text-xs">
                        {route.riskLevel}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm hidden md:table-cell">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs ${
                          route.status === 'Active'
                            ? 'bg-success/10 text-success'
                            : route.status === 'Delayed'
                            ? 'bg-warning/10 text-warning'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {route.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteRisks;
