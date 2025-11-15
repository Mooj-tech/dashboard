export interface Route {
  id: string;
  name: string;
  origin: string;
  destination: string;
  carrier: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  status: 'Active' | 'Delayed' | 'Completed';
}

export interface Supplier {
  id: string;
  name: string;
  location: string;
  riskScore: number;
  status: 'Active' | 'Warning' | 'Critical';
  details: {
    onTimeDelivery: number;
    qualityScore: number;
    complianceRate: number;
  };
}

export interface Alert {
  id: string;
  severity: 'High' | 'Medium' | 'Low';
  title: string;
  description: string;
  timestamp: string;
  affectedRoutes: string[];
  acknowledged: boolean;
}

export interface Metric {
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
}

export const routes: Route[] = [
  { id: 'R001', name: 'Pacific Express', origin: 'Shanghai', destination: 'Los Angeles', carrier: 'MSC', riskLevel: 'Low', status: 'Active' },
  { id: 'R002', name: 'Atlantic Bridge', origin: 'Rotterdam', destination: 'New York', carrier: 'Maersk', riskLevel: 'Medium', status: 'Active' },
  { id: 'R003', name: 'Euro Connect', origin: 'Hamburg', destination: 'Singapore', carrier: 'CMA CGM', riskLevel: 'High', status: 'Delayed' },
  { id: 'R004', name: 'Asian Gateway', origin: 'Hong Kong', destination: 'Seattle', carrier: 'COSCO', riskLevel: 'Low', status: 'Active' },
  { id: 'R005', name: 'Mediterranean Link', origin: 'Barcelona', destination: 'Dubai', carrier: 'Hapag-Lloyd', riskLevel: 'Medium', status: 'Active' },
  { id: 'R006', name: 'South Pacific Route', origin: 'Sydney', destination: 'Tokyo', carrier: 'ONE', riskLevel: 'Low', status: 'Completed' },
  { id: 'R007', name: 'Trans-Siberian', origin: 'Moscow', destination: 'Beijing', carrier: 'FESCO', riskLevel: 'High', status: 'Delayed' },
  { id: 'R008', name: 'Caribbean Corridor', origin: 'Miami', destination: 'Santos', carrier: 'MSC', riskLevel: 'Medium', status: 'Active' },
  { id: 'R009', name: 'North Star', origin: 'Oslo', destination: 'Montreal', carrier: 'Maersk', riskLevel: 'Low', status: 'Active' },
  { id: 'R010', name: 'Indian Ocean Express', origin: 'Mumbai', destination: 'Cape Town', carrier: 'CMA CGM', riskLevel: 'Medium', status: 'Active' },
  { id: 'R011', name: 'Panama Passage', origin: 'Busan', destination: 'Charleston', carrier: 'Yang Ming', riskLevel: 'High', status: 'Active' },
  { id: 'R012', name: 'Baltic Bridge', origin: 'Gdansk', destination: 'Stockholm', carrier: 'DFDS', riskLevel: 'Low', status: 'Completed' },
  { id: 'R013', name: 'Red Sea Route', origin: 'Jeddah', destination: 'Port Said', carrier: 'Evergreen', riskLevel: 'High', status: 'Delayed' },
  { id: 'R014', name: 'Southeast Passage', origin: 'Manila', destination: 'Vancouver', carrier: 'COSCO', riskLevel: 'Medium', status: 'Active' },
  { id: 'R015', name: 'African Gateway', origin: 'Lagos', destination: 'Durban', carrier: 'MSC', riskLevel: 'Low', status: 'Active' },
  { id: 'R016', name: 'Arctic Circle', origin: 'Murmansk', destination: 'Reykjavik', carrier: 'Maersk', riskLevel: 'High', status: 'Active' },
  { id: 'R017', name: 'Gulf Stream', origin: 'Houston', destination: 'Marseille', carrier: 'CMA CGM', riskLevel: 'Medium', status: 'Active' },
  { id: 'R018', name: 'East Coast Express', origin: 'Savannah', destination: 'London', carrier: 'Hapag-Lloyd', riskLevel: 'Low', status: 'Completed' },
];

export const suppliers: Supplier[] = [
  {
    id: 'S001',
    name: 'Pacific Manufacturing Ltd',
    location: 'Shanghai, China',
    riskScore: 25,
    status: 'Active',
    details: { onTimeDelivery: 95, qualityScore: 92, complianceRate: 98 }
  },
  {
    id: 'S002',
    name: 'European Logistics GmbH',
    location: 'Hamburg, Germany',
    riskScore: 45,
    status: 'Warning',
    details: { onTimeDelivery: 78, qualityScore: 85, complianceRate: 90 }
  },
  {
    id: 'S003',
    name: 'Global Freight Solutions',
    location: 'Singapore',
    riskScore: 15,
    status: 'Active',
    details: { onTimeDelivery: 98, qualityScore: 96, complianceRate: 99 }
  },
  {
    id: 'S004',
    name: 'Trans-Atlantic Shipping',
    location: 'Rotterdam, Netherlands',
    riskScore: 72,
    status: 'Critical',
    details: { onTimeDelivery: 65, qualityScore: 70, complianceRate: 75 }
  },
  {
    id: 'S005',
    name: 'Asia-Pacific Traders',
    location: 'Hong Kong',
    riskScore: 30,
    status: 'Active',
    details: { onTimeDelivery: 90, qualityScore: 88, complianceRate: 94 }
  },
  {
    id: 'S006',
    name: 'Middle East Cargo Co',
    location: 'Dubai, UAE',
    riskScore: 55,
    status: 'Warning',
    details: { onTimeDelivery: 75, qualityScore: 80, complianceRate: 85 }
  },
  {
    id: 'S007',
    name: 'Nordic Supply Chain',
    location: 'Oslo, Norway',
    riskScore: 20,
    status: 'Active',
    details: { onTimeDelivery: 94, qualityScore: 91, complianceRate: 97 }
  },
  {
    id: 'S008',
    name: 'South American Exports',
    location: 'Santos, Brazil',
    riskScore: 68,
    status: 'Critical',
    details: { onTimeDelivery: 68, qualityScore: 72, complianceRate: 78 }
  },
  {
    id: 'S009',
    name: 'Mediterranean Trading',
    location: 'Barcelona, Spain',
    riskScore: 38,
    status: 'Warning',
    details: { onTimeDelivery: 82, qualityScore: 86, complianceRate: 88 }
  },
  {
    id: 'S010',
    name: 'Australian Logistics Pty',
    location: 'Sydney, Australia',
    riskScore: 22,
    status: 'Active',
    details: { onTimeDelivery: 93, qualityScore: 90, complianceRate: 96 }
  },
  {
    id: 'S011',
    name: 'African Trade Partners',
    location: 'Lagos, Nigeria',
    riskScore: 80,
    status: 'Critical',
    details: { onTimeDelivery: 60, qualityScore: 65, complianceRate: 70 }
  },
  {
    id: 'S012',
    name: 'North American Freight',
    location: 'Vancouver, Canada',
    riskScore: 18,
    status: 'Active',
    details: { onTimeDelivery: 96, qualityScore: 94, complianceRate: 98 }
  },
];

export const alerts: Alert[] = [
  {
    id: 'A001',
    severity: 'High',
    title: 'Port Congestion Alert',
    description: 'Severe delays expected at Los Angeles port due to labor disputes. Estimated 5-7 day delays.',
    timestamp: '2 hours ago',
    affectedRoutes: ['R001', 'R004'],
    acknowledged: false
  },
  {
    id: 'A002',
    severity: 'Medium',
    title: 'Weather Disruption',
    description: 'Tropical storm forming in South China Sea. May affect routes to Singapore.',
    timestamp: '5 hours ago',
    affectedRoutes: ['R003'],
    acknowledged: false
  },
  {
    id: 'A003',
    severity: 'High',
    title: 'Supplier Compliance Issue',
    description: 'Trans-Atlantic Shipping failed recent quality audit. Immediate review recommended.',
    timestamp: '8 hours ago',
    affectedRoutes: ['R002', 'R018'],
    acknowledged: true
  },
  {
    id: 'A004',
    severity: 'Low',
    title: 'Route Optimization Opportunity',
    description: 'Alternative route via Suez Canal could reduce transit time by 2 days for R005.',
    timestamp: '12 hours ago',
    affectedRoutes: ['R005'],
    acknowledged: false
  },
  {
    id: 'A005',
    severity: 'Medium',
    title: 'Customs Delay',
    description: 'New documentation requirements in Dubai causing 24-48 hour processing delays.',
    timestamp: '1 day ago',
    affectedRoutes: ['R005', 'R006'],
    acknowledged: true
  },
  {
    id: 'A006',
    severity: 'High',
    title: 'Geopolitical Risk',
    description: 'Increased security concerns in Red Sea region. Consider alternative routes.',
    timestamp: '1 day ago',
    affectedRoutes: ['R013'],
    acknowledged: false
  },
  {
    id: 'A007',
    severity: 'Low',
    title: 'Carrier Schedule Change',
    description: 'MSC has updated departure times for Pacific routes. Review affected schedules.',
    timestamp: '2 days ago',
    affectedRoutes: ['R001', 'R008', 'R015'],
    acknowledged: true
  },
  {
    id: 'A008',
    severity: 'Medium',
    title: 'Fuel Price Surge',
    description: 'Bunker fuel prices increased 15%. Cost implications for all active routes.',
    timestamp: '2 days ago',
    affectedRoutes: ['R001', 'R002', 'R003', 'R004'],
    acknowledged: false
  },
];

export const metrics: Metric[] = [
  { label: 'Total Routes', value: '142', change: 8, trend: 'up' },
  { label: 'Active Alerts', value: '12', change: -3, trend: 'down' },
  { label: 'Avg Risk Score', value: '38%', change: -5, trend: 'down' },
  { label: 'On-Time Delivery', value: '94.2%', change: 2.1, trend: 'up' },
];

export const riskTrendData = [
  { date: '2024-10-01', risk: 42 },
  { date: '2024-10-05', risk: 45 },
  { date: '2024-10-10', risk: 38 },
  { date: '2024-10-15', risk: 51 },
  { date: '2024-10-20', risk: 35 },
  { date: '2024-10-25', risk: 40 },
  { date: '2024-10-30', risk: 33 },
  { date: '2024-11-04', risk: 38 },
];

export const carrierPerformanceData = [
  { name: 'MSC', performance: 92 },
  { name: 'Maersk', performance: 88 },
  { name: 'CMA CGM', performance: 85 },
  { name: 'COSCO', performance: 90 },
  { name: 'Hapag-Lloyd', performance: 87 },
];

export const regionDistributionData = [
  { region: 'Asia-Pacific', value: 35 },
  { region: 'Europe', value: 28 },
  { region: 'Americas', value: 22 },
  { region: 'Middle East', value: 10 },
  { region: 'Africa', value: 5 },
];
