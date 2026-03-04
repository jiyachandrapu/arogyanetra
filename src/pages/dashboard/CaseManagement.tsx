import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface FeedbackMessage {
  source: string;
  language: string;
  time: string;
  text: string;
  translated?: string;
  sentimentScore: number;
}

interface Cluster {
  id: string;
  caseId: string;
  title: string;
  department: string;
  deptId: string;
  priority: "High" | "Medium";
  status: "Open" | "In Progress" | "Resolved";
  hasSurge: boolean;
  complaintCount: number;
  slaRemaining: string;
  sentimentScore: number;
  assignedTo: string;
  slaStatus: string;
  timeline: ("Detected" | "Case Created" | "Action Taken" | "Resolved" | "Impact Measured")[];
  messages: FeedbackMessage[];
}

const clusters: Cluster[] = [
  {
    id: "c1", caseId: "CASE-1042", title: "OPD Wait Time Surge — Morning Shift", department: "Outpatient (OPD)", deptId: "opd",
    priority: "High", status: "Open", hasSurge: true, complaintCount: 6, slaRemaining: "18 hours", sentimentScore: 22,
    assignedTo: "Dr. Priya Sharma", slaStatus: "Within SLA",
    timeline: ["Detected", "Case Created"],
    messages: [
      { source: "WhatsApp", language: "Tanglish", time: "10 mins ago", text: "OPD la romba neram wait pannenom. Doctor 2 hours late ah vandhar.", translated: "We waited a very long time in OPD. The doctor came 2 hours late.", sentimentScore: 15 },
      { source: "Web Form", language: "English", time: "1 hour ago", text: "Waited 3 hours in OPD. No token system, very disorganized.", sentimentScore: 20 },
      { source: "WhatsApp", language: "Tamil", time: "2 hours ago", text: "OPD காத்திருப்பு மிக அதிகம். இருக்கை வசதி இல்லை.", translated: "OPD waiting is too much. No seating available.", sentimentScore: 18 },
    ],
  },
  {
    id: "c2", caseId: "CASE-1038", title: "Pharmacy Stock Shortage — Critical Medicines", department: "Pharmacy", deptId: "pharmacy",
    priority: "High", status: "In Progress", hasSurge: true, complaintCount: 4, slaRemaining: "6 hours", sentimentScore: 28,
    assignedTo: "Mr. Rajan K.", slaStatus: "At Risk",
    timeline: ["Detected", "Case Created", "Action Taken"],
    messages: [
      { source: "WhatsApp", language: "Tamil", time: "2 hours ago", text: "மருந்துக்கடையில் மருந்து இல்லை என்று சொன்னார்கள்.", translated: "They said the medicine is not available at the pharmacy.", sentimentScore: 25 },
      { source: "Web Form", language: "English", time: "5 hours ago", text: "Prescribed medicine was not available in hospital pharmacy. Had to go outside.", sentimentScore: 30 },
    ],
  },
  {
    id: "c3", caseId: "CASE-1035", title: "Infrastructure Failures — AC & Lift", department: "Maintenance", deptId: "maintenance",
    priority: "Medium", status: "Open", hasSurge: false, complaintCount: 3, slaRemaining: "22 hours", sentimentScore: 38,
    assignedTo: "Mr. Suresh P.", slaStatus: "Within SLA",
    timeline: ["Detected", "Case Created"],
    messages: [
      { source: "Web Form", language: "English", time: "3 hours ago", text: "AC not working on the 3rd floor ward. Very uncomfortable for patients.", sentimentScore: 35 },
      { source: "Email", language: "English", time: "6 hours ago", text: "Lift #2 has been out of service for 3 days. Elderly patients are struggling.", sentimentScore: 40 },
    ],
  },
  {
    id: "c4", caseId: "CASE-1031", title: "Billing Discrepancy Reports", department: "Billing", deptId: "billing",
    priority: "Medium", status: "In Progress", hasSurge: false, complaintCount: 4, slaRemaining: "12 hours", sentimentScore: 32,
    assignedTo: "Ms. Anitha R.", slaStatus: "Within SLA",
    timeline: ["Detected", "Case Created", "Action Taken"],
    messages: [
      { source: "Web Form", language: "English", time: "25 mins ago", text: "The billing counter was very slow today. I waited 45 minutes for discharge papers.", sentimentScore: 30 },
      { source: "Email", language: "English", time: "3 hours ago", text: "Insurance processing took 2 hours at the billing desk.", sentimentScore: 35 },
    ],
  },
];

const statusColor = (s: string) => {
  if (s === "Open") return "bg-destructive/10 text-destructive";
  if (s === "In Progress") return "bg-warning/10 text-warning-foreground";
  return "bg-success/10 text-success";
};

const priorityColor = (p: string) => {
  if (p === "High") return "bg-destructive/10 text-destructive";
  return "bg-warning/10 text-warning-foreground";
};

const timelineSteps = ["Detected", "Case Created", "Action Taken", "Resolved", "Impact Measured"];

const CaseManagement = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const deptFilter = searchParams.get("dept");

  const filtered = deptFilter
    ? clusters.filter((c) => c.deptId === deptFilter)
    : clusters;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Case Management</h1>
        <p className="text-sm text-muted-foreground mt-1">Negative feedback clusters grouped by detected issues.</p>
      </div>

      {deptFilter && (
        <Badge variant="outline" className="bg-primary/10 text-primary">
          Filtered: {clusters.find(c => c.deptId === deptFilter)?.department || deptFilter}
        </Badge>
      )}

      <div className="space-y-3">
        {filtered.map((c) => (
          <div key={c.id} className="bg-card rounded-xl border shadow-sm overflow-hidden">
            <button
              className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
              onClick={() => setExpanded(expanded === c.id ? null : c.id)}
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-display font-semibold text-sm">{c.title}</h3>
                  {c.hasSurge && (
                    <Badge variant="outline" className="bg-destructive/10 text-destructive text-[10px] px-1.5 py-0 animate-pulse">
                      <AlertTriangle className="h-3 w-3 mr-0.5" /> SPIKE
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                  <span>{c.department}</span>
                  <span>{c.caseId}</span>
                  <span>Complaints: {c.complaintCount}</span>
                  <span>SLA: {c.slaRemaining}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-3">
                <Badge variant="outline" className={priorityColor(c.priority)}>{c.priority}</Badge>
                <Badge variant="outline" className={statusColor(c.status)}>{c.status}</Badge>
                {expanded === c.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
              </div>
            </button>

            {expanded === c.id && (
              <div className="border-t px-5 py-5 space-y-5 bg-muted/10">
                {/* Timeline */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Case Lifecycle</p>
                  <div className="flex items-center gap-0">
                    {timelineSteps.map((step, i) => {
                      const reached = c.timeline.includes(step as any);
                      return (
                        <div key={step} className="flex items-center">
                          <div className={`px-3 py-1.5 rounded-full text-[11px] font-medium border ${reached ? "bg-primary/15 text-primary border-primary/30" : "bg-muted text-muted-foreground border-border"}`}>
                            {step}
                          </div>
                          {i < timelineSteps.length - 1 && (
                            <div className={`w-6 h-px ${reached && c.timeline.includes(timelineSteps[i+1] as any) ? "bg-primary/40" : "bg-border"}`} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Case Info */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-card rounded-lg border p-3">
                    <p className="text-[11px] text-muted-foreground">Case ID</p>
                    <p className="text-sm font-semibold">{c.caseId}</p>
                  </div>
                  <div className="bg-card rounded-lg border p-3">
                    <p className="text-[11px] text-muted-foreground">Assigned Staff</p>
                    <p className="text-sm font-semibold">{c.assignedTo}</p>
                  </div>
                  <div className="bg-card rounded-lg border p-3">
                    <p className="text-[11px] text-muted-foreground">Department</p>
                    <p className="text-sm font-semibold">{c.department}</p>
                  </div>
                  <div className="bg-card rounded-lg border p-3">
                    <p className="text-[11px] text-muted-foreground">SLA Status</p>
                    <p className={`text-sm font-semibold ${c.slaStatus === "At Risk" ? "text-warning-foreground" : "text-success"}`}>{c.slaStatus}</p>
                  </div>
                </div>

                {/* Messages */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Feedback Messages ({c.messages.length})</p>
                  <div className="space-y-2">
                    {c.messages.map((m, i) => (
                      <div key={i} className="bg-card rounded-lg border p-3 space-y-2">
                        <div className="flex items-center gap-2 text-xs flex-wrap">
                          <Badge variant="outline" className="text-[10px]">{m.source}</Badge>
                          <Badge variant="outline" className="text-[10px] bg-muted">{m.language}</Badge>
                          <span className="text-muted-foreground ml-auto">{m.time}</span>
                        </div>
                        <p className="text-sm">{m.text}</p>
                        {m.translated && (
                          <p className="text-xs text-muted-foreground italic">→ {m.translated}</p>
                        )}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-muted-foreground">Sentiment</span>
                          <Progress value={m.sentimentScore} className="h-1.5 flex-1" />
                          <span className="text-[10px] font-medium text-destructive">{m.sentimentScore}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseManagement;
