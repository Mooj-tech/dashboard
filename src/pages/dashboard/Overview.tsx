import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, MapPin, Package, Truck, AlertTriangle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { metrics, riskTrendData } from '@/lib/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const MetricCard = ({ metric, index }: { metric: any; index: number }) => {
  const Icon = metric.trend === 'up' ? TrendingUp : TrendingDown;
  const trendColor = metric.trend === 'up' ? 'text-success' : 'text-destructive';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="hover-scale">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {metric.label}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl font-bold">{metric.value}</div>
          {metric.change !== undefined && (
            <div className={`flex items-center gap-1 text-xs sm:text-sm ${trendColor} mt-1`}>
              <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{Math.abs(metric.change)}%</span>
              <span className="text-muted-foreground hidden sm:inline">vs last month</span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Overview = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Real-time insights into your global logistics operations
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={metric.label} metric={metric} index={index} />
        ))}
      </div>

      {/* Risk Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Risk Trend Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={riskTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="risk"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Global Map Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Global Route Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative min-h-[400px] sm:min-h-[500px] rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d25903124.043273926!2d-95.677068!3d37.6000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
              <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <h3 className="text-sm font-semibold mb-1">142 Active Routes</h3>
                <p className="text-xs text-muted-foreground">Tracking shipments across 6 continents</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Shipments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Recent Shipments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 'SHP-2501', status: 'in-transit', route: 'Shanghai → Los Angeles', progress: 65 },
                { id: 'SHP-2502', status: 'delivered', route: 'Hamburg → New York', progress: 100 },
                { id: 'SHP-2503', status: 'pending', route: 'Tokyo → Seattle', progress: 10 },
                { id: 'SHP-2504', status: 'delayed', route: 'Mumbai → Houston', progress: 45 }
              ].map((shipment, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{shipment.id}</p>
                      <p className="text-xs text-muted-foreground">{shipment.route}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={shipment.status === 'delivered' ? 'default' : shipment.status === 'delayed' ? 'destructive' : 'secondary'}>
                      {shipment.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{shipment.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Fleet Status & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                Fleet Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Vehicles</span>
                  <span className="font-semibold">142/160</span>
                </div>
                <Progress value={89} className="h-2" />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-2 bg-success/10 rounded">
                    <p className="font-semibold text-success">128</p>
                    <p className="text-muted-foreground">On Route</p>
                  </div>
                  <div className="text-center p-2 bg-warning/10 rounded">
                    <p className="font-semibold text-warning">14</p>
                    <p className="text-muted-foreground">Maintenance</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.75 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">98.5%</p>
                <p className="text-sm text-muted-foreground">On-Time Delivery</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-success">$2.4M</p>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.85 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Active Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { type: 'Weather', message: 'Storm warning: Route SH-LA', severity: 'high' },
                  { type: 'Delay', message: 'Traffic congestion: Route HB-NY', severity: 'medium' },
                  { type: 'Maintenance', message: 'Vehicle TK-001 scheduled', severity: 'low' }
                ].map((alert, i) => (
                  <div key={i} className="flex items-start gap-3 p-2 rounded-lg bg-muted/30">
                    <AlertTriangle className={`h-4 w-4 mt-0.5 ${
                      alert.severity === 'high' ? 'text-destructive' : 
                      alert.severity === 'medium' ? 'text-warning' : 'text-muted-foreground'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{alert.type}</p>
                      <p className="text-xs text-muted-foreground">{alert.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Overview;
