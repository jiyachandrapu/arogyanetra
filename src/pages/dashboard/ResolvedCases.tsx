import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface ResolvedCase {
  id: string;
  caseId: string;
  department: string;
  title: string;
  resolvedDate: string;
  state: "Stable" | "Positive Reinforcement" | "Recurring Issue" | "Negative Spike";
  newComplaints: number;
  sentimentChange: number;
  hasSpikeWarning: boolean;
  sentimentData: { day: string; score: number }[];
}

const cases: ResolvedCase[] = [
  {
    id: "r1", caseId: "CASE-0982", department: "OPD", title: "OPD Queue Management Delays",
    resolvedDate: "Feb 18, 2026", state: "Stable", newComplaints: 0, sentimentChange: +12, hasSpikeWarning: false,
    sentimentData: [
      { day: "D1", score: 35 }, { day: "D3", score: 42 }, { day: "D5", score: 50 }, { day: "D7", score: 55 },
      { day: "D9", score: 60 }, { day: "D11", score: 62 }, { day: "D14", score: 68 },
    ],
  },
  {
    id: "r2", caseId: "CASE-0975", department: "Nursing", title: "Nursing Staff Response Time",
    resolvedDate: "Feb 15, 2026", state: "Positive Reinforcement", newComplaints: 0, sentimentChange: +25, hasSpikeWarning: false,
    sentimentData: [
      { day: "D1", score: 50 }, { day: "D3", score: 58 }, { day: "D5", score: 65 }, { day: "D7", score: 72 },
      { day: "D9", score: 78 }, { day: "D11", score: 82 }, { day: "D14", score: 88 },
    ],
  },
  {
    id: "r3", caseId: "CASE-0960", department: "Pharmacy", title: "Medicine Availability Issues",
    resolvedDate: "Feb 12, 2026", state: "Recurring Issue", newComplaints: 4, sentimentChange: -8, hasSpikeWarning: true,
    sentimentData: [
      { day: "D1", score: 55 }, { day: "D3", score: 60 }, { day: "D5", score: 52 }, { day: "D7", score: 45 },
      { day: "D9", score: 40 }, { day: "D11", score: 35 }, { day: "D14", score: 30 },
    ],
  },
  {
    id: "r4", caseId: "CASE-0948", department: "Billing", title: "Insurance Processing Delays",
    resolvedDate: "Feb 10, 2026", state: "Negative Spike", newComplaints: 6, sentimentChange: -15, hasSpikeWarning: true,
    sentimentData: [
      { day: "D1", score: 58 }, { day: "D3", score: 55 }, { day: "D5", score: 48 }, { day: "D7", score: 42 },
      { day: "D9", score: 35 }, { day: "D11", score: 28 }, { day: "D14", score: 22 },
    ],
  },
];

const stateStyle = (s: string) => {
  if (s === "Stable") return "bg-success/10 text-success";
  if (s === "Positive Reinforcement") return "bg-primary/10 text-primary";
  if (s === "Recurring Issue") return "bg-warning/10 text-warning-foreground";
  return "bg-destructive/10 text-destructive";
};

const ResolvedCases = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Resolved Case Monitoring</h1>
        <p className="text-sm text-muted-foreground mt-1">14-day post-resolution tracking.</p>
      </div>

      <div className="space-y-3">
        {cases.map((c) => (
          <div key={c.id} className={`bg-card rounded-xl border shadow-sm overflow-hidden ${c.hasSpikeWarning ? "border-warning/50" : ""}`}>
            <button
              className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
              onClick={() => setExpanded(expanded === c.id ? null : c.id)}
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-semibold text-sm">{c.title}</h3>
                  {c.hasSpikeWarning && <AlertTriangle className="h-3.5 w-3.5 text-warning" />}
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{c.caseId}</span>
                  <span>{c.department}</span>
                  <span>Resolved: {c.resolvedDate}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-3">
                <Badge variant="outline" className={stateStyle(c.state)}>{c.state}</Badge>
                {expanded === c.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
              </div>
            </button>

            {expanded === c.id && (
              <div className="border-t px-5 py-5 space-y-4 bg-muted/10">
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-card rounded-lg border p-3 text-center">
                    <p className="text-[11px] text-muted-foreground">New Complaints</p>
                    <p className={`text-lg font-bold ${c.newComplaints > 0 ? "text-destructive" : "text-success"}`}>{c.newComplaints}</p>
                  </div>
                  <div className="bg-card rounded-lg border p-3 text-center">
                    <p className="text-[11px] text-muted-foreground">Sentiment Change</p>
                    <p className={`text-lg font-bold flex items-center justify-center gap-1 ${c.sentimentChange >= 0 ? "text-success" : "text-destructive"}`}>
                      {c.sentimentChange >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      {c.sentimentChange > 0 ? "+" : ""}{c.sentimentChange}%
                    </p>
                  </div>
                  <div className="bg-card rounded-lg border p-3 text-center">
                    <p className="text-[11px] text-muted-foreground">Spike Detection</p>
                    <p className="text-sm font-semibold flex items-center justify-center gap-1">
                      {c.hasSpikeWarning ? (
                        <><AlertTriangle className="h-4 w-4 text-warning" /> Detected</>
                      ) : (
                        <><CheckCircle2 className="h-4 w-4 text-success" /> Clear</>
                      )}
                    </p>
                  </div>
                </div>

                <div className="bg-card rounded-lg border p-4">
                  <p className="text-xs font-medium text-muted-foreground mb-3">Sentiment Trajectory (14 days)</p>
                  <ResponsiveContainer width="100%" height={160}>
                    <LineChart data={c.sentimentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(200 15% 90%)" />
                      <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke={c.sentimentChange >= 0 ? "hsl(145 45% 55%)" : "hsl(0 60% 65%)"}
                        strokeWidth={2}
                        dot={{ r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResolvedCases;
