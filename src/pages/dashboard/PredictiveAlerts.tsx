import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, AlertCircle, Info, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { alerts as mockAlerts } from '@/lib/mockData';
import { toast } from 'sonner';

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'High':
      return AlertTriangle;
    case 'Medium':
      return AlertCircle;
    case 'Low':
      return Info;
    default:
      return Info;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'High':
      return 'text-destructive';
    case 'Medium':
      return 'text-warning';
    case 'Low':
      return 'text-primary';
    default:
      return 'text-muted-foreground';
  }
};

const PredictiveAlerts = () => {
  const [alerts, setAlerts] = useState(mockAlerts);

  const acknowledgeAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, acknowledged: true } : alert
    ));
    toast.success('Alert acknowledged successfully');
  };

  const unacknowledgedCount = alerts.filter(a => !a.acknowledged).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Predictive Alerts</h1>
          <p className="text-muted-foreground mt-1">
            AI-powered early warning system for supply chain disruptions
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="destructive" className="text-base px-4 py-2">
            {unacknowledgedCount} Unacknowledged
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {alerts.map((alert, index) => {
          const Icon = getSeverityIcon(alert.severity);
          const iconColor = getSeverityColor(alert.severity);

          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className={`hover-scale ${alert.acknowledged ? 'opacity-60' : ''}`}>
                <CardContent className="p-6">
                    <div className="flex items-start gap-2 sm:gap-4">
                    <div className={`p-2 sm:p-3 rounded-lg flex-shrink-0 ${
                      alert.severity === 'High' ? 'bg-destructive/10' :
                      alert.severity === 'Medium' ? 'bg-warning/10' :
                      'bg-primary/10'
                    }`}>
                      <Icon className={`h-4 w-4 sm:h-6 sm:w-6 ${iconColor}`} />
                    </div>

                    <div className="flex-1 space-y-3 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="text-base sm:text-lg font-semibold">{alert.title}</h3>
                            <Badge variant={
                              alert.severity === 'High' ? 'destructive' :
                              alert.severity === 'Medium' ? 'default' :
                              'secondary'
                            }>
                              {alert.severity}
                            </Badge>
                            {alert.acknowledged && (
                              <Badge variant="outline" className="gap-1">
                                <Check className="h-3 w-3" />
                                Acknowledged
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground">{alert.timestamp}</p>
                        </div>

                        {!alert.acknowledged && (
                          <Button
                            size="sm"
                            onClick={() => acknowledgeAlert(alert.id)}
                            className="shrink-0 text-xs sm:text-sm"
                          >
                            Acknowledge
                          </Button>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm">{alert.description}</p>

                      {alert.affectedRoutes.length > 0 && (
                        <div>
                          <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                            Affected Routes:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {alert.affectedRoutes.map((routeId) => (
                              <Badge key={routeId} variant="outline">
                                {routeId}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PredictiveAlerts;
