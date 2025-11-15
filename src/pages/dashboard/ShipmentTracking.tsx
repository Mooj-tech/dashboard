import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Package,
  MapPin,
  Clock,
  Truck,
  CheckCircle,
  AlertCircle,
  Search,

} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const shipments = [
  {
    id: 'SHP-2501',
    status: 'in-transit',
    origin: 'Shanghai, China',
    destination: 'Los Angeles, USA',
    progress: 65,
    eta: '2025-11-15',
    carrier: 'Ocean Freight Ltd',
    trackingSteps: [
      { label: 'Order Placed', completed: true, date: '2025-10-20' },
      { label: 'Picked Up', completed: true, date: '2025-10-22' },
      { label: 'In Transit', completed: true, date: '2025-10-25' },
      { label: 'Customs Clearance', completed: false, date: 'TBD' },
      { label: 'Out for Delivery', completed: false, date: 'TBD' },
      { label: 'Delivered', completed: false, date: 'TBD' },
    ],
  },
  {
    id: 'SHP-2502',
    status: 'delivered',
    origin: 'Hamburg, Germany',
    destination: 'New York, USA',
    progress: 100,
    eta: '2025-11-05',
    carrier: 'Euro Logistics',
    trackingSteps: [
      { label: 'Order Placed', completed: true, date: '2025-10-01' },
      { label: 'Picked Up', completed: true, date: '2025-10-03' },
      { label: 'In Transit', completed: true, date: '2025-10-08' },
      { label: 'Customs Clearance', completed: true, date: '2025-10-28' },
      { label: 'Out for Delivery', completed: true, date: '2025-11-04' },
      { label: 'Delivered', completed: true, date: '2025-11-05' },
    ],
  },
  {
    id: 'SHP-2503',
    status: 'pending',
    origin: 'Tokyo, Japan',
    destination: 'Seattle, USA',
    progress: 10,
    eta: '2025-11-20',
    carrier: 'Pacific Shipping Co',
    trackingSteps: [
      { label: 'Order Placed', completed: true, date: '2025-11-06' },
      { label: 'Picked Up', completed: false, date: 'TBD' },
      { label: 'In Transit', completed: false, date: 'TBD' },
      { label: 'Customs Clearance', completed: false, date: 'TBD' },
      { label: 'Out for Delivery', completed: false, date: 'TBD' },
      { label: 'Delivered', completed: false, date: 'TBD' },
    ],
  },
  {
    id: 'SHP-2504',
    status: 'delayed',
    origin: 'Mumbai, India',
    destination: 'Houston, USA',
    progress: 45,
    eta: '2025-11-18',
    carrier: 'Global Express',
    trackingSteps: [
      { label: 'Order Placed', completed: true, date: '2025-10-15' },
      { label: 'Picked Up', completed: true, date: '2025-10-17' },
      { label: 'In Transit', completed: true, date: '2025-10-20' },
      { label: 'Customs Clearance', completed: false, date: 'Delayed' },
      { label: 'Out for Delivery', completed: false, date: 'TBD' },
      { label: 'Delivered', completed: false, date: 'TBD' },
    ],
  },
  {
    id: 'SHP-2505',
    status: 'in-transit',
    origin: 'Singapore',
    destination: 'Miami, USA',
    progress: 78,
    eta: '2025-11-12',
    carrier: 'Southeast Cargo',
    trackingSteps: [
      { label: 'Order Placed', completed: true, date: '2025-10-18' },
      { label: 'Picked Up', completed: true, date: '2025-10-20' },
      { label: 'In Transit', completed: true, date: '2025-10-23' },
      { label: 'Customs Clearance', completed: true, date: '2025-11-04' },
      { label: 'Out for Delivery', completed: false, date: 'TBD' },
      { label: 'Delivered', completed: false, date: 'TBD' },
    ],
  },
];

const ShipmentTracking = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShipment, setSelectedShipment] = useState<string | null>(null);

  const filteredShipments = shipments.filter((shipment) =>
    shipment.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-transit':
        return <Badge className="bg-primary text-primary-foreground">In Transit</Badge>;
      case 'delivered':
        return <Badge className="bg-success text-success-foreground">Delivered</Badge>;
      case 'pending':
        return <Badge className="bg-muted text-muted-foreground">Pending</Badge>;
      case 'delayed':
        return <Badge className="bg-destructive text-destructive-foreground">Delayed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const stats = [
    {
      label: 'Total Shipments',
      value: shipments.length,
      icon: Package,
    },
    {
      label: 'In Transit',
      value: shipments.filter((s) => s.status === 'in-transit').length,
      icon: Truck,
    },
    {
      label: 'Delivered',
      value: shipments.filter((s) => s.status === 'delivered').length,
      icon: CheckCircle,
    },
    {
      label: 'Delayed',
      value: shipments.filter((s) => s.status === 'delayed').length,
      icon: AlertCircle,
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Shipment Tracking</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Real-time tracking of all shipments
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

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by shipment ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Embedded World Map */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Global Shipment Map</h3>
        <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d25903124.043273926!2d-95.677068!3d37.6000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
          />
        </div>
      </Card>

      {/* Shipment List */}
      <div className="space-y-4">
        {filteredShipments.map((shipment, index) => (
          <motion.div
            key={shipment.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card
              className={`p-4 cursor-pointer transition-all ${
                selectedShipment === shipment.id
                  ? 'ring-2 ring-primary shadow-lg'
                  : 'hover:shadow-md'
              }`}
              onClick={() =>
                setSelectedShipment(selectedShipment === shipment.id ? null : shipment.id)
              }
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{shipment.id}</h3>
                      <p className="text-sm text-muted-foreground">{shipment.carrier}</p>
                    </div>
                  </div>
                  {getStatusBadge(shipment.status)}
                </div>

                {/* Route */}
                <div className="flex items-center gap-2 text-sm flex-wrap">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{shipment.origin}</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="text-foreground">{shipment.destination}</span>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground">{shipment.progress}%</span>
                  </div>
                  <Progress value={shipment.progress} className="h-2" />
                </div>

                {/* ETA */}
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">ETA:</span>
                  <span className="text-foreground">{shipment.eta}</span>
                </div>

                {/* Expandable Tracking Steps */}
                <motion.div
                  initial={false}
                  animate={{
                    height: selectedShipment === shipment.id ? 'auto' : 0,
                    opacity: selectedShipment === shipment.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-border space-y-4">
                    <h4 className="font-semibold text-sm text-foreground">Tracking History</h4>
                    <div className="space-y-3">
                      {shipment.trackingSteps.map((step, stepIndex) => (
                        <motion.div
                          key={stepIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: stepIndex * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <div
                            className={`mt-1 w-4 h-4 rounded-full border-2 ${
                              step.completed
                                ? 'bg-success border-success'
                                : 'bg-background border-muted-foreground'
                            }`}
                          >
                            {step.completed && (
                              <CheckCircle className="h-3 w-3 text-success-foreground" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p
                              className={`text-sm font-medium ${
                                step.completed ? 'text-foreground' : 'text-muted-foreground'
                              }`}
                            >
                              {step.label}
                            </p>
                            <p className="text-xs text-muted-foreground">{step.date}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <Button className="w-full mt-3" size="sm">
                      View Full Details
                    </Button>
                  </div>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredShipments.length === 0 && (
        <Card className="p-8 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No shipments found</p>
        </Card>
      )}
    </div>
  );
};

export default ShipmentTracking;
