import { MessageSquare, Users, Briefcase, AlertTriangle, ArrowRight, TrendingDown, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const stats = [
  { label: "Total Feedback", value: "1,248", icon: MessageSquare, color: "text-primary", borderColor: "border-l-primary", detail: "128 today • 312 this week" },
  { label: "Active Departments", value: "8", icon: Building2, color: "text-secondary-foreground", borderColor: "border-l-secondary", detail: "2 departments have active surges" },
  { label: "Open Cases", value: "18", icon: Briefcase, color: "text-warning-foreground", borderColor: "border-l-warning", detail: "4 High priority • 14 Medium" },
  { label: "SLA Breaches", value: "3", icon: AlertTriangle, color: "text-destructive", borderColor: "border-l-destructive", detail: "OPD (2) • Pharmacy (1)" },
];

const alerts = [
  { text: "Spike detected in OPD waiting time complaints — 6 new complaints in 2 hours.", dept: "opd" },
  { text: "Billing department feedback negativity up 35% compared to last week.", dept: "billing" },
  { text: "Pharmacy stock shortage complaints detected — 4 reports in 3 hours.", dept: "pharmacy" },
];

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <HoverCard key={s.label} openDelay={200}>
            <HoverCardTrigger asChild>
              <div className={`bg-card rounded-xl border border-l-4 ${s.borderColor} shadow-sm p-5 flex items-center gap-4 cursor-default hover:shadow-md transition-shadow`}>
                <div className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center">
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold font-display">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-52 p-3">
              <p className="text-xs text-muted-foreground">{s.detail}</p>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-l-4 border-l-warning shadow-sm p-5 space-y-4">
        <h2 className="font-display font-semibold flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-warning" />
          Sentiment Spike Alerts
        </h2>
        <div className="space-y-3">
          {alerts.map((a, i) => (
            <div key={i} className="bg-warning/10 rounded-lg p-3 flex items-start justify-between gap-3">
              <div className="flex items-start gap-2">
                <TrendingDown className="h-4 w-4 text-warning mt-0.5 shrink-0" />
                <p className="text-sm text-foreground">{a.text}</p>
              </div>
              <Link to={`/dashboard/cases?dept=${a.dept}`}>
                <Button variant="outline" size="sm" className="shrink-0 gap-1">
                  View & Take Action <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Link to="/dashboard/departments" className="bg-card rounded-xl border border-l-4 border-l-primary shadow-sm p-4 hover:shadow-md transition-shadow group">
          <Building2 className="h-5 w-5 text-primary mb-2" />
          <p className="font-display font-semibold text-sm">Department Grid</p>
          <p className="text-xs text-muted-foreground mt-1">View all department risk levels</p>
          <span className="text-xs text-primary mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Open <ArrowRight className="h-3 w-3" />
          </span>
        </Link>
        <Link to="/dashboard/feedback" className="bg-card rounded-xl border border-l-4 border-l-success shadow-sm p-4 hover:shadow-md transition-shadow group">
          <MessageSquare className="h-5 w-5 text-primary mb-2" />
          <p className="font-display font-semibold text-sm">Live Feed</p>
          <p className="text-xs text-muted-foreground mt-1">Real-time feedback from all channels</p>
          <span className="text-xs text-primary mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Open <ArrowRight className="h-3 w-3" />
          </span>
        </Link>
        <Link to="/dashboard/predictive" className="bg-card rounded-xl border border-l-4 border-l-secondary shadow-sm p-4 hover:shadow-md transition-shadow group">
          <Briefcase className="h-5 w-5 text-primary mb-2" />
          <p className="font-display font-semibold text-sm">Predictive Intel</p>
          <p className="text-xs text-muted-foreground mt-1">Forecast risks and recurring issues</p>
          <span className="text-xs text-primary mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Open <ArrowRight className="h-3 w-3" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHome;
