import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ArrowUpDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { suppliers } from '@/lib/mockData';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-success/10 text-success border-success/20';
    case 'Warning':
      return 'bg-warning/10 text-warning border-warning/20';
    case 'Critical':
      return 'bg-destructive/10 text-destructive border-destructive/20';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const SupplierInsights = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'risk'>('risk');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedSuppliers = [...suppliers].sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    return sortOrder === 'asc'
      ? a.riskScore - b.riskScore
      : b.riskScore - a.riskScore;
  });

  const toggleSort = (field: 'name' | 'risk') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Supplier Insights</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive supplier performance and risk analysis
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleSort('name')}
            className="gap-1 sm:gap-2 text-xs sm:text-sm"
          >
            <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Sort by </span>Name
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleSort('risk')}
            className="gap-1 sm:gap-2 text-xs sm:text-sm"
          >
            <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Sort by </span>Risk
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {sortedSuppliers.map((supplier, index) => (
          <motion.div
            key={supplier.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <Card className="hover-scale cursor-pointer">
              <CardHeader
                className="pb-3"
                onClick={() =>
                  setExpandedId(expandedId === supplier.id ? null : supplier.id)
                }
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{supplier.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {supplier.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(supplier.status)}>
                      {supplier.status}
                    </Badge>
                    {expandedId === supplier.id ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Risk Score</span>
                    <span className="font-semibold">{supplier.riskScore}%</span>
                  </div>
                  <Progress
                    value={supplier.riskScore}
                    className="h-2"
                  />
                </div>

                <AnimatePresence>
                  {expandedId === supplier.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3 pt-3 border-t border-border"
                    >
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-muted-foreground">On-Time Delivery</span>
                          <span className="font-medium">
                            {supplier.details.onTimeDelivery}%
                          </span>
                        </div>
                        <Progress
                          value={supplier.details.onTimeDelivery}
                          className="h-1.5"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Quality Score</span>
                          <span className="font-medium">
                            {supplier.details.qualityScore}%
                          </span>
                        </div>
                        <Progress
                          value={supplier.details.qualityScore}
                          className="h-1.5"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Compliance Rate</span>
                          <span className="font-medium">
                            {supplier.details.complianceRate}%
                          </span>
                        </div>
                        <Progress
                          value={supplier.details.complianceRate}
                          className="h-1.5"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SupplierInsights;
