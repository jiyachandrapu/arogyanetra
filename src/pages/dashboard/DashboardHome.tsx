import { MessageSquare, Users, Briefcase, AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Total Feedback", value: "1,248", icon: MessageSquare, color: "text-primary" },
  { label: "Active Patients", value: "342", icon: Users, color: "text-secondary-foreground" },
  { label: "Open Cases", value: "18", icon: Briefcase, color: "text-warning" },
  { label: "SLA Breaches", value: "3", icon: AlertTriangle, color: "text-destructive" },
];

const alerts = [
  "Spike detected in OPD waiting time complaints — 6 new complaints in 2 hours.",
  "Billing department feedback negativity up 35% compared to last week.",
];

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card rounded-xl border shadow-sm p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center">
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold font-display">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border shadow-sm p-5 space-y-4">
        <h2 className="font-display font-semibold flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-warning" />
          Sentiment Spike Alerts
        </h2>
        <div className="space-y-3">
          {alerts.map((a, i) => (
            <div key={i} className="bg-warning/10 rounded-lg p-3 flex items-start justify-between gap-3">
              <p className="text-sm text-foreground">{a}</p>
              <Link to="/dashboard/cases">
                <Button variant="outline" size="sm" className="shrink-0 gap-1">
                  View & Take Action <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
