import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, TrendingUp, ArrowUp, Clock, Repeat, Zap } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";

const forecastData = [
  { day: "Mon", predicted: 35, actual: 32 },
  { day: "Tue", predicted: 42, actual: 45 },
  { day: "Wed", predicted: 38, actual: null },
  { day: "Thu", predicted: 50, actual: null },
  { day: "Fri", predicted: 44, actual: null },
  { day: "Sat", predicted: 28, actual: null },
  { day: "Sun", predicted: 22, actual: null },
];

const riskRanking = [
  { dept: "OPD", risk: 85, level: "High", surge: true },
  { dept: "Pharmacy", risk: 72, level: "High", surge: true },
  { dept: "Billing", risk: 58, level: "Medium", surge: false },
  { dept: "Maintenance", risk: 45, level: "Medium", surge: false },
  { dept: "Emergency", risk: 30, level: "Low", surge: false },
  { dept: "Nursing", risk: 15, level: "Low", surge: false },
];

const recurringPatterns = [
  { pattern: "OPD wait time spikes every Sunday morning", department: "OPD", frequency: "Weekly", mitigation: "Add extra doctor on Sunday AM shift" },
  { pattern: "Billing tax complaints during first week of month", department: "Billing", frequency: "Monthly", mitigation: "Pre-audit billing templates before month start" },
  { pattern: "Pharmacy shortages every Friday evening", department: "Pharmacy", frequency: "Weekly", mitigation: "Pre-order critical stock by Thursday" },
];

const anomalies = [
  { title: "Sudden surge in Radiology complaints", description: "5x increase in scan delay complaints in last 4 hours", severity: "High" },
  { title: "New complaint category: Parking", description: "3 complaints about parking area in the last 2 hours — previously unreported", severity: "Medium" },
];

const persistentProblems = [
  { issue: "Recurring HVAC complaints — Ward 3 & 5", department: "Maintenance", days: 12 },
  { issue: "Repeated billing claim errors — Insurance desk", department: "Billing", days: 8 },
  { issue: "Elevator #2 out of service", department: "Maintenance", days: 5 },
];

const surgeProbabilities = [
  { dept: "OPD", probability: 82 },
  { dept: "Emergency", probability: 65 },
  { dept: "Pharmacy", probability: 58 },
  { dept: "Billing", probability: 42 },
  { dept: "Radiology", probability: 35 },
];

const riskColor = (l: string) => {
  if (l === "High") return "bg-destructive/10 text-destructive";
  if (l === "Medium") return "bg-warning/10 text-warning-foreground";
  return "bg-success/10 text-success";
};

const PredictiveIntel = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Predictive Intelligence Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Forecasting operational risks and recurring patterns.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Complaint Forecast */}
        <div className="bg-card rounded-xl border shadow-sm p-5">
          <h3 className="font-display font-semibold text-sm mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Complaint Forecast — Next 7 Days
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(200 15% 90%)" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="predicted" stroke="hsl(174 42% 55%)" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} name="Predicted" />
              <Line type="monotone" dataKey="actual" stroke="hsl(210 60% 55%)" strokeWidth={2} dot={{ r: 3 }} name="Actual" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Growing Issue */}
        <div className="bg-card rounded-xl border shadow-sm p-5">
          <h3 className="font-display font-semibold text-sm mb-4 flex items-center gap-2">
            <ArrowUp className="h-4 w-4 text-destructive" />
            Top Growing Issue
          </h3>
          <div className="bg-destructive/5 rounded-lg border border-destructive/20 p-4 space-y-3">
            <h4 className="font-display font-bold text-base">OPD Wait Time Complaints</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[11px] text-muted-foreground">Department</p>
                <p className="text-sm font-semibold">Outpatient (OPD)</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">Risk Score</p>
                <p className="text-sm font-semibold text-destructive">85 / 100</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">Complaint Count</p>
                <p className="text-sm font-semibold">14</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">Growth</p>
                <p className="text-sm font-semibold text-destructive flex items-center gap-1"><ArrowUp className="h-3 w-3" /> +40% in 48hrs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Department Risk Ranking */}
      <div className="bg-card rounded-xl border shadow-sm p-5">
        <h3 className="font-display font-semibold text-sm mb-4">Department Risk Ranking</h3>
        <div className="space-y-2">
          {riskRanking.map((d, i) => (
            <div key={d.dept} className="flex items-center gap-3 py-2">
              <span className="text-xs text-muted-foreground w-5">{i + 1}</span>
              <span className="text-sm font-medium w-28">{d.dept}</span>
              <Progress value={d.risk} className="h-2 flex-1" />
              <span className="text-xs font-medium w-8 text-right">{d.risk}</span>
              <Badge variant="outline" className={`text-[10px] w-16 justify-center ${riskColor(d.level)}`}>{d.level}</Badge>
              {d.surge && <Zap className="h-3.5 w-3.5 text-warning animate-pulse" />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recurring Issues */}
        <div className="bg-card rounded-xl border shadow-sm p-5">
          <h3 className="font-display font-semibold text-sm mb-4 flex items-center gap-2">
            <Repeat className="h-4 w-4 text-warning" />
            Recurring Issue Detection
          </h3>
          <div className="space-y-3">
            {recurringPatterns.map((p, i) => (
              <div key={i} className="bg-muted/30 rounded-lg border p-3 space-y-1.5">
                <p className="text-sm font-medium">{p.pattern}</p>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span>{p.department}</span>
                  <span>Frequency: {p.frequency}</span>
                </div>
                <p className="text-[11px] text-primary">💡 {p.mitigation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Anomaly Detection */}
        <div className="bg-card rounded-xl border shadow-sm p-5">
          <h3 className="font-display font-semibold text-sm mb-4 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            Anomaly Detection
          </h3>
          <div className="space-y-3">
            {anomalies.map((a, i) => (
              <div key={i} className="bg-destructive/5 rounded-lg border border-destructive/20 p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{a.title}</p>
                  <Badge variant="outline" className={riskColor(a.severity)}>{a.severity}</Badge>
                </div>
                <p className="text-[11px] text-muted-foreground">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Persistent Problems */}
        <div className="bg-card rounded-xl border shadow-sm p-5">
          <h3 className="font-display font-semibold text-sm mb-4 flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            Persistent Problem Panel
          </h3>
          <div className="space-y-2">
            {persistentProblems.map((p, i) => (
              <div key={i} className="flex items-center justify-between bg-muted/30 rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{p.issue}</p>
                  <p className="text-[11px] text-muted-foreground">{p.department}</p>
                </div>
                <Badge variant="outline" className="bg-destructive/10 text-destructive">{p.days} days</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Surge Probability */}
        <div className="bg-card rounded-xl border shadow-sm p-5">
          <h3 className="font-display font-semibold text-sm mb-4 flex items-center gap-2">
            <Zap className="h-4 w-4 text-warning" />
            Surge Probability Cards
          </h3>
          <div className="space-y-2">
            {surgeProbabilities.map((s) => (
              <div key={s.dept} className="flex items-center gap-3 py-2">
                <span className="text-sm font-medium w-28">{s.dept}</span>
                <Progress
                  value={s.probability}
                  className={`h-2.5 flex-1 ${s.probability >= 70 ? "[&>div]:bg-destructive" : s.probability >= 50 ? "[&>div]:bg-warning" : "[&>div]:bg-success"}`}
                />
                <span className={`text-xs font-bold w-10 text-right ${s.probability >= 70 ? "text-destructive" : s.probability >= 50 ? "text-warning-foreground" : "text-success"}`}>
                  {s.probability}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveIntel;
