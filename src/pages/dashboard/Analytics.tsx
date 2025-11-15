import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { TrendingUp, TrendingDown, Download, Filter, Calendar, DollarSign, Package, Truck, AlertTriangle } from 'lucide-react';
import { carrierPerformanceData, regionDistributionData, riskTrendData } from '@/lib/mockData';
import { toast } from 'sonner';

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const revenueData = [
    { month: 'Jan', revenue: 2400000, cost: 1800000, profit: 600000 },
    { month: 'Feb', revenue: 2600000, cost: 1900000, profit: 700000 },
    { month: 'Mar', revenue: 2800000, cost: 2000000, profit: 800000 },
    { month: 'Apr', revenue: 3200000, cost: 2200000, profit: 1000000 },
    { month: 'May', revenue: 3400000, cost: 2300000, profit: 1100000 },
    { month: 'Jun', revenue: 3600000, cost: 2400000, profit: 1200000 },
  ];

  const deliveryMetrics = [
    { name: 'On Time', value: 85, color: '#22c55e' },
    { name: 'Delayed', value: 12, color: '#f59e0b' },
    { name: 'Failed', value: 3, color: '#ef4444' },
  ];

  const topRoutes = [
    { route: 'Shanghai → Los Angeles', volume: 1250, revenue: '$2.4M', growth: 12 },
    { route: 'Hamburg → New York', volume: 980, revenue: '$1.8M', growth: 8 },
    { route: 'Singapore → Miami', volume: 750, revenue: '$1.2M', growth: -3 },
    { route: 'Tokyo → Seattle', volume: 650, revenue: '$1.1M', growth: 15 },
  ];

  const exportData = () => {
    toast.success('Analytics data exported successfully!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive performance metrics and insights
          </p>
        </div>

        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-primary">$18.2M</p>
                <div className="flex items-center gap-1 text-sm text-success">
                  <TrendingUp className="h-3 w-3" />
                  <span>+12.5%</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Shipments</p>
                <p className="text-2xl font-bold text-primary">3,847</p>
                <div className="flex items-center gap-1 text-sm text-success">
                  <TrendingUp className="h-3 w-3" />
                  <span>+8.2%</span>
                </div>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Fleet Utilization</p>
                <p className="text-2xl font-bold text-primary">89%</p>
                <div className="flex items-center gap-1 text-sm text-warning">
                  <TrendingDown className="h-3 w-3" />
                  <span>-2.1%</span>
                </div>
              </div>
              <Truck className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Risk Score</p>
                <p className="text-2xl font-bold text-warning">2.3</p>
                <div className="flex items-center gap-1 text-sm text-success">
                  <TrendingDown className="h-3 w-3" />
                  <span>-0.5</span>
                </div>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue & Profit Analysis */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Revenue & Profit Analysis</CardTitle>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span>Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <span>Profit</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={revenueData} margin={{ top: 30, right: 40, left: 40, bottom: 30 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00bcd4" stopOpacity={0.9}/>
                  <stop offset="50%" stopColor="#00bcd4" stopOpacity={0.4}/>
                  <stop offset="100%" stopColor="#00bcd4" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.9}/>
                  <stop offset="50%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.05}/>
                </linearGradient>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.1"/>
                </filter>
              </defs>
              <CartesianGrid 
                strokeDasharray="1 3" 
                stroke="#e2e8f0" 
                strokeOpacity={0.6}
                horizontal={true}
                vertical={false}
              />
              <XAxis 
                dataKey="month" 
                stroke="#64748b" 
                fontSize={13}
                fontWeight={500}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={13}
                fontWeight={500}
                tickLine={false}
                axisLine={false}
                dx={-10}
                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: 'none',
                  borderRadius: '16px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  padding: '16px',
                }}
                formatter={(value, name) => [
                  `$${(value / 1000000).toFixed(1)}M`, 
                  name === 'revenue' ? 'Revenue' : 'Profit'
                ]}
                labelStyle={{ color: '#1f2937', fontWeight: 600, marginBottom: '8px' }}
                itemStyle={{ color: '#374151', fontWeight: 500 }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#00bcd4"
                strokeWidth={4}
                fill="url(#revenueGradient)"
                dot={false}
                activeDot={{ 
                  r: 8, 
                  stroke: '#00bcd4', 
                  strokeWidth: 3, 
                  fill: '#ffffff',
                  filter: 'url(#shadow)'
                }}
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#10b981"
                strokeWidth={4}
                fill="url(#profitGradient)"
                dot={false}
                activeDot={{ 
                  r: 8, 
                  stroke: '#10b981', 
                  strokeWidth: 3, 
                  fill: '#ffffff',
                  filter: 'url(#shadow)'
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Risk Trend Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={riskTrendData} margin={{ top: 30, right: 40, left: 40, bottom: 30 }}>
                  <defs>
                    <linearGradient id="riskAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.2}/>
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid 
                    strokeDasharray="1 3" 
                    stroke="#e2e8f0" 
                    strokeOpacity={0.6}
                    horizontal={true}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    stroke="#64748b"
                    fontSize={13}
                    fontWeight={500}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                    tickFormatter={(value) =>
                      new Date(value).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })
                    }
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={13}
                    fontWeight={500}
                    tickLine={false}
                    axisLine={false}
                    dx={-10}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: 'none',
                      borderRadius: '16px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                      padding: '16px',
                    }}
                    labelStyle={{ color: '#1f2937', fontWeight: 600, marginBottom: '8px' }}
                    itemStyle={{ color: '#374151', fontWeight: 500 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="risk"
                    stroke="#ef4444"
                    strokeWidth={0}
                    fill="url(#riskAreaGradient)"
                  />
                  <Line
                    type="monotone"
                    dataKey="risk"
                    stroke="#f59e0b"
                    strokeWidth={4}
                    dot={false}
                    activeDot={{ 
                      r: 8, 
                      stroke: '#f59e0b', 
                      strokeWidth: 3, 
                      fill: '#ffffff'
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Carrier Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Carrier Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={carrierPerformanceData} margin={{ top: 30, right: 40, left: 40, bottom: 30 }}>
                  <defs>
                    <linearGradient id="modernBarGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00bcd4" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#0891b2" stopOpacity={0.8}/>
                    </linearGradient>
                    <filter id="barShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#00bcd4" floodOpacity="0.2"/>
                    </filter>
                  </defs>
                  <CartesianGrid 
                    strokeDasharray="1 3" 
                    stroke="#e2e8f0" 
                    strokeOpacity={0.6}
                    horizontal={true}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#64748b"
                    fontSize={13}
                    fontWeight={500}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={13}
                    fontWeight={500}
                    tickLine={false}
                    axisLine={false}
                    dx={-10}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: 'none',
                      borderRadius: '16px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                      padding: '16px',
                    }}
                    cursor={{ fill: 'rgba(99, 102, 241, 0.05)', radius: 8 }}
                    labelStyle={{ color: '#1f2937', fontWeight: 600, marginBottom: '8px' }}
                    itemStyle={{ color: '#374151', fontWeight: 500 }}
                  />
                  <Bar 
                    dataKey="performance" 
                    fill="url(#modernBarGradient)" 
                    radius={[16, 16, 0, 0]}
                    filter="url(#barShadow)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Region Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Route Distribution by Region</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={regionDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={90}
                    innerRadius={40}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="#fff"
                    strokeWidth={3}
                  >
                    {regionDistributionData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    iconType="circle"
                    wrapperStyle={{ fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Delivery Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Delivery Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deliveryMetrics.map((metric, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: metric.color }}
                      />
                      <span className="text-sm font-medium">{metric.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={metric.value} className="w-20 h-2" />
                      <span className="text-sm font-semibold w-8">{metric.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Top Routes Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Routes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topRoutes.map((route, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex-1">
                  <p className="font-semibold">{route.route}</p>
                  <p className="text-sm text-muted-foreground">{route.volume} shipments</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{route.revenue}</p>
                  <div className="flex items-center gap-1">
                    {route.growth > 0 ? (
                      <TrendingUp className="h-3 w-3 text-success" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-destructive" />
                    )}
                    <span className={`text-sm ${
                      route.growth > 0 ? 'text-success' : 'text-destructive'
                    }`}>
                      {route.growth > 0 ? '+' : ''}{route.growth}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cost Analysis & Predictive Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cost Breakdown Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Fuel', value: 35, color: '#ef4444' },
                    { name: 'Labor', value: 28, color: '#3b82f6' },
                    { name: 'Maintenance', value: 15, color: '#f59e0b' },
                    { name: 'Insurance', value: 12, color: '#10b981' },
                    { name: 'Other', value: 10, color: '#8b5cf6' },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {[
                    { name: 'Fuel', value: 35, color: '#ef4444' },
                    { name: 'Labor', value: 28, color: '#3b82f6' },
                    { name: 'Maintenance', value: 15, color: '#f59e0b' },
                    { name: 'Insurance', value: 12, color: '#10b981' },
                    { name: 'Other', value: 10, color: '#8b5cf6' },
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Predictive Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold text-blue-800">Revenue Forecast</span>
                </div>
                <p className="text-sm text-blue-700">Expected 15% increase in Q4 based on seasonal trends</p>
              </div>
              
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="font-semibold text-yellow-800">Risk Alert</span>
                </div>
                <p className="text-sm text-yellow-700">Shanghai route showing increased delay probability</p>
              </div>
              
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="font-semibold text-green-800">Cost Optimization</span>
                </div>
                <p className="text-sm text-green-700">Potential $2.3M savings through route optimization</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Alerts & Performance Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Real-time Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { type: 'Critical', message: 'Port congestion in Los Angeles', time: '2 min ago', color: 'destructive' },
                { type: 'Warning', message: 'Weather delay on EU routes', time: '15 min ago', color: 'warning' },
                { type: 'Info', message: 'New carrier partnership active', time: '1 hour ago', color: 'primary' },
              ].map((alert, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <Badge variant={alert.color as any} className="mt-0.5">{alert.type}</Badge>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance vs Target</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { metric: 'On-time Delivery', current: 85, target: 90 },
                { metric: 'Cost per TEU', current: 92, target: 95 },
                { metric: 'Customer Satisfaction', current: 88, target: 85 },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.metric}</span>
                    <span>{item.current}% / {item.target}%</span>
                  </div>
                  <Progress value={item.current} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {item.current >= item.target ? '✓ Target achieved' : `${item.target - item.current}% to target`}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Generate Monthly Report
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Create Custom Filter
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Analysis
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Set Alert Thresholds
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
