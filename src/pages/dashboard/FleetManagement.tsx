import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Truck,
  MapPin,
  Calendar,
  User,
  Settings,
  AlertCircle,
  CheckCircle,
  Clock,
  Search,
} from 'lucide-react';

const vehicles = [
  {
    id: 'VH-001',
    type: 'Heavy Truck',
    driver: 'John Mitchell',
    location: 'Los Angeles, CA',
    status: 'active',
    capacity: '24 tons',
    currentLoad: '18 tons',
    mileage: '145,230 km',
    lastService: '2025-10-15',
    nextService: '2025-12-15',
  },
  {
    id: 'VH-002',
    type: 'Cargo Van',
    driver: 'Sarah Johnson',
    location: 'Seattle, WA',
    status: 'maintenance',
    capacity: '3 tons',
    currentLoad: '0 tons',
    mileage: '98,450 km',
    lastService: '2025-11-01',
    nextService: '2026-01-01',
  },
  {
    id: 'VH-003',
    type: 'Container Truck',
    driver: 'Mike Chen',
    location: 'Chicago, IL',
    status: 'active',
    capacity: '30 tons',
    currentLoad: '28 tons',
    mileage: '203,890 km',
    lastService: '2025-09-20',
    nextService: '2025-11-20',
  },
  {
    id: 'VH-004',
    type: 'Refrigerated Truck',
    driver: 'Emma Davis',
    location: 'Miami, FL',
    status: 'idle',
    capacity: '20 tons',
    currentLoad: '0 tons',
    mileage: '87,320 km',
    lastService: '2025-10-28',
    nextService: '2025-12-28',
  },
  {
    id: 'VH-005',
    type: 'Heavy Truck',
    driver: 'David Rodriguez',
    location: 'New York, NY',
    status: 'active',
    capacity: '25 tons',
    currentLoad: '22 tons',
    mileage: '167,540 km',
    lastService: '2025-10-05',
    nextService: '2025-12-05',
  },
  {
    id: 'VH-006',
    type: 'Cargo Van',
    driver: 'Lisa Anderson',
    location: 'Houston, TX',
    status: 'active',
    capacity: '2.5 tons',
    currentLoad: '1.8 tons',
    mileage: '54,120 km',
    lastService: '2025-11-03',
    nextService: '2026-01-03',
  },
];

const FleetManagement = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesStatus = selectedStatus === 'all' || vehicle.status === selectedStatus;
    const matchesSearch =
      vehicle.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success text-success-foreground">Active</Badge>;
      case 'maintenance':
        return <Badge className="bg-warning text-warning-foreground">Maintenance</Badge>;
      case 'idle':
        return <Badge className="bg-muted text-muted-foreground">Idle</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const stats = [
    { label: 'Total Vehicles', value: vehicles.length, icon: Truck },
    {
      label: 'Active',
      value: vehicles.filter((v) => v.status === 'active').length,
      icon: CheckCircle,
    },
    {
      label: 'In Maintenance',
      value: vehicles.filter((v) => v.status === 'maintenance').length,
      icon: Settings,
    },
    {
      label: 'Idle',
      value: vehicles.filter((v) => v.status === 'idle').length,
      icon: Clock,
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Fleet Management</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Monitor and manage your logistics fleet
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by ID, driver, or vehicle type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="idle">Idle</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredVehicles.map((vehicle, index) => (
          <motion.div
            key={vehicle.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card
              className={`p-4 cursor-pointer transition-all ${
                selectedVehicle === vehicle.id
                  ? 'ring-2 ring-primary shadow-lg'
                  : 'hover:shadow-md'
              }`}
              onClick={() =>
                setSelectedVehicle(selectedVehicle === vehicle.id ? null : vehicle.id)
              }
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{vehicle.id}</h3>
                      <p className="text-sm text-muted-foreground">{vehicle.type}</p>
                    </div>
                  </div>
                  {getStatusBadge(vehicle.status)}
                </div>

                {/* Driver */}
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{vehicle.driver}</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{vehicle.location}</span>
                </div>

                {/* Capacity */}
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Load</span>
                    <span className="text-foreground">
                      {vehicle.currentLoad} / {vehicle.capacity}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${
                          (parseFloat(vehicle.currentLoad) / parseFloat(vehicle.capacity)) * 100
                        }%`,
                      }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>

                {/* Expandable Details */}
                <motion.div
                  initial={false}
                  animate={{
                    height: selectedVehicle === vehicle.id ? 'auto' : 0,
                    opacity: selectedVehicle === vehicle.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 border-t border-border space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Mileage</span>
                      <span className="text-foreground">{vehicle.mileage}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Last Service:</span>
                      <span className="text-foreground">{vehicle.lastService}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Next Service:</span>
                      <span className="text-foreground">{vehicle.nextService}</span>
                    </div>
                    <Button className="w-full mt-3" size="sm">
                      View Details
                    </Button>
                  </div>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredVehicles.length === 0 && (
        <Card className="p-8 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No vehicles found matching your filters</p>
        </Card>
      )}
    </div>
  );
};

export default FleetManagement;
