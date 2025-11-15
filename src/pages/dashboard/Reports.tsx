import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FileText, Download, Calendar, TrendingUp, Truck, Package, Users, AlertTriangle, DollarSign, Clock } from 'lucide-react';
import { toast } from 'sonner';

const Reports = () => {
  const generateReport = (reportName: string) => {
    toast.success(`${reportName} generated successfully!`);
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(`${reportName} - Generated on ${new Date().toLocaleDateString()}`);
    link.download = `${reportName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">
          Generate and download comprehensive logistics reports
        </p>
      </div>

      {/* Performance Reports */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Performance Reports</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Report
              </CardTitle>
              <CardDescription>
                Monthly logistics performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => generateReport('Performance Report')}>
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Delivery Summary
              </CardTitle>
              <CardDescription>
                Weekly delivery status overview
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => generateReport('Delivery Summary')}>
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                On-Time Delivery
              </CardTitle>
              <CardDescription>
                Delivery punctuality analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => generateReport('On-Time Delivery')}>
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator />

      {/* Operational Reports */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Operational Reports</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Fleet Utilization
              </CardTitle>
              <CardDescription>
                Vehicle usage and efficiency metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => generateReport('Fleet Utilization')}>
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Shipment Analysis
              </CardTitle>
              <CardDescription>
                Detailed shipment tracking data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => generateReport('Shipment Analysis')}>
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Supplier Performance
              </CardTitle>
              <CardDescription>
                Supplier reliability and metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => generateReport('Supplier Performance')}>
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator />

      {/* Risk & Financial Reports */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Risk & Financial Reports</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Risk Assessment
              </CardTitle>
              <CardDescription>
                Route and operational risk analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => generateReport('Risk Assessment')}>
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Cost Analysis
              </CardTitle>
              <CardDescription>
                Transportation and operational costs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => generateReport('Cost Analysis')}>
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Compliance Report
              </CardTitle>
              <CardDescription>
                Regulatory compliance status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => generateReport('Compliance Report')}>
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;