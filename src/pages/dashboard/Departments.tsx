import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertTriangle, ArrowRight, Minus } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface Department {
  id: string;
  name: string;
  shortName: string;
  issueCount: number;
  slaBreaches: number;
  sentimentTrend: "up" | "down" | "stable";
  hasSurge: boolean;
  totalFeedback: number;
  resolvedToday: number;
  recentSpike: string | null;
}

const departments: Department[] = [
  { id: "opd", name: "Outpatient (OPD)", shortName: "OPD", issueCount: 14, slaBreaches: 3, sentimentTrend: "down", hasSurge: true, totalFeedback: 248, resolvedToday: 6, recentSpike: "Wait time complaints +40% in 2hrs" },
  { id: "emergency", name: "Emergency", shortName: "ER", issueCount: 5, slaBreaches: 1, sentimentTrend: "up", hasSurge: false, totalFeedback: 112, resolvedToday: 4, recentSpike: null },
  { id: "pharmacy", name: "Pharmacy", shortName: "PHR", issueCount: 8, slaBreaches: 2, sentimentTrend: "down", hasSurge: true, totalFeedback: 95, resolvedToday: 3, recentSpike: "Stock shortage complaints detected" },
  { id: "radiology", name: "Radiology", shortName: "RAD", issueCount: 3, slaBreaches: 0, sentimentTrend: "stable", hasSurge: false, totalFeedback: 42, resolvedToday: 2, recentSpike: null },
  { id: "billing", name: "Billing", shortName: "BIL", issueCount: 10, slaBreaches: 2, sentimentTrend: "down", hasSurge: false, totalFeedback: 156, resolvedToday: 5, recentSpike: "Tax discrepancy reports rising" },
  { id: "maintenance", name: "Maintenance", shortName: "MNT", issueCount: 6, slaBreaches: 1, sentimentTrend: "stable", hasSurge: false, totalFeedback: 64, resolvedToday: 2, recentSpike: null },
  { id: "nursing", name: "Nursing", shortName: "NRS", issueCount: 2, slaBreaches: 0, sentimentTrend: "up", hasSurge: false, totalFeedback: 88, resolvedToday: 1, recentSpike: null },
  { id: "cardiology", name: "Cardiology", shortName: "CRD", issueCount: 4, slaBreaches: 1, sentimentTrend: "stable", hasSurge: false, totalFeedback: 36, resolvedToday: 2, recentSpike: null },
];

const trendIcon = (t: string) => {
  if (t === "up") return <TrendingUp className="h-4 w-4 text-success" />;
  if (t === "down") return <TrendingDown className="h-4 w-4 text-destructive" />;
  return <Minus className="h-4 w-4 text-muted-foreground" />;
};

const Departments = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Department Intelligence Grid</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time operational risk across all departments.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {departments.map((dept) => (
          <HoverCard key={dept.id} openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
              <button
                onClick={() => navigate(`/dashboard/cases?dept=${dept.id}`)}
                className="bg-card rounded-xl border shadow-sm p-5 text-left hover:shadow-md hover:border-primary/30 transition-all duration-200 w-full group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-display font-semibold text-sm">{dept.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{dept.shortName}</p>
                  </div>
                  {dept.hasSurge && (
                    <Badge variant="outline" className="bg-destructive/10 text-destructive text-[10px] px-1.5 py-0.5 animate-pulse">
                      SURGE
                    </Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Open Issues</span>
                    <span className="font-semibold">{dept.issueCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">SLA Breaches</span>
                    <span className={`font-semibold ${dept.slaBreaches > 0 ? "text-destructive" : "text-success"}`}>{dept.slaBreaches}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Sentiment</span>
                    {trendIcon(dept.sentimentTrend)}
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t flex items-center justify-end text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  View Clusters <ArrowRight className="h-3 w-3 ml-1" />
                </div>
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-64 p-4 space-y-2" side="right">
              <p className="font-display font-semibold text-sm">{dept.name} — Details</p>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between"><span className="text-muted-foreground">Total Feedback</span><span className="font-medium">{dept.totalFeedback}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Cases Resolved Today</span><span className="font-medium text-success">{dept.resolvedToday}</span></div>
                {dept.recentSpike && (
                  <div className="bg-warning/10 rounded-md p-2 mt-2 flex items-start gap-1.5">
                    <AlertTriangle className="h-3 w-3 text-warning mt-0.5 shrink-0" />
                    <span className="text-warning-foreground text-[11px]">{dept.recentSpike}</span>
                  </div>
                )}
              </div>
              <button
                onClick={() => navigate(`/dashboard/cases?dept=${dept.id}`)}
                className="text-xs text-primary flex items-center gap-1 mt-2 hover:underline"
              >
                View Clusters <ArrowRight className="h-3 w-3" />
              </button>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
};

export default Departments;
