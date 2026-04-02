import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, AlertTriangle, ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export interface FeedbackMessage {
  source: string;
  language: string;
  time: string;
  text: string;
  translated?: string;
  sentimentScore: number;
}

export interface Cluster {
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

const mockClusters: Cluster[] = [
  {
    id: "1", caseId: "CASE-001", title: "Excessive Wait Time in OPD", department: "Outpatient Department", deptId: "opd",
    priority: "High", status: "Open", hasSurge: true, complaintCount: 14, slaRemaining: "4h 20m", sentimentScore: 22,
    assignedTo: "Dr. Priya Sharma", slaStatus: "At Risk",
    timeline: ["Detected", "Case Created"],
    messages: [
      { source: "WhatsApp", language: "Hindi", time: "2:45 PM", text: "3 ghante se wait kar raha hoon, koi response nahi", translated: "Waiting for 3 hours, no response", sentimentScore: 18 },
      { source: "Email", language: "English", time: "3:10 PM", text: "The wait time at OPD is unacceptable. I've been here since morning.", sentimentScore: 25 },
    ],
  },
  {
    id: "2", caseId: "CASE-002", title: "Billing Overcharge Complaints", department: "Billing & Accounts", deptId: "billing",
    priority: "High", status: "In Progress", hasSurge: true, complaintCount: 9, slaRemaining: "2h 10m", sentimentScore: 30,
    assignedTo: "Rahul Verma", slaStatus: "At Risk",
    timeline: ["Detected", "Case Created", "Action Taken"],
    messages: [
      { source: "WhatsApp", language: "English", time: "11:30 AM", text: "I was charged ₹5000 extra for a basic blood test. This is fraud!", sentimentScore: 12 },
      { source: "WhatsApp", language: "Tamil", time: "12:15 PM", text: "Bill la extra amount potrukanga", translated: "Extra amount added in the bill", sentimentScore: 28 },
    ],
  },
  {
    id: "3", caseId: "CASE-003", title: "Pharmacy Stock-Out Issues", department: "Pharmacy", deptId: "pharmacy",
    priority: "Medium", status: "Open", hasSurge: false, complaintCount: 6, slaRemaining: "18h", sentimentScore: 40,
    assignedTo: "Anita Desai", slaStatus: "On Track",
    timeline: ["Detected", "Case Created"],
    messages: [
      { source: "Email", language: "English", time: "9:00 AM", text: "Common medicines like paracetamol are out of stock. Had to buy from outside.", sentimentScore: 35 },
    ],
  },
  {
    id: "4", caseId: "CASE-004", title: "Emergency Triage Delays", department: "Emergency Department", deptId: "emergency",
    priority: "High", status: "Open", hasSurge: true, complaintCount: 11, slaRemaining: "1h 45m", sentimentScore: 15,
    assignedTo: "Dr. Arun Kumar", slaStatus: "At Risk",
    timeline: ["Detected", "Case Created", "Action Taken"],
    messages: [
      { source: "WhatsApp", language: "English", time: "4:30 PM", text: "My father was having chest pain and we waited 40 minutes before anyone attended!", sentimentScore: 10 },
      { source: "WhatsApp", language: "Hindi", time: "5:00 PM", text: "Emergency mein bhi koi nahi dekh raha", translated: "Nobody is attending even in emergency", sentimentScore: 15 },
    ],
  },
  {
    id: "5", caseId: "CASE-005", title: "Cleanliness Issues in Ward B", department: "Facilities & Maintenance", deptId: "facilities",
    priority: "Medium", status: "In Progress", hasSurge: false, complaintCount: 5, slaRemaining: "12h", sentimentScore: 38,
    assignedTo: "Suresh Patel", slaStatus: "On Track",
    timeline: ["Detected", "Case Created", "Action Taken"],
    messages: [
      { source: "Email", language: "English", time: "8:00 AM", text: "The washrooms in ward B are extremely dirty. Needs immediate attention.", sentimentScore: 32 },
    ],
  },
];

const statusColor = (s: string) => {
  if (s === "Open") return "bg-secondary/50 text-secondary-foreground";
  if (s === "In Progress") return "bg-warning/15 text-warning-foreground";
  return "bg-success/15 text-success";
};

const priorityColor = (p: string) => {
  if (p === "High") return "bg-destructive/10 text-destructive";
  return "bg-warning/15 text-warning-foreground";
};

const clusterBorder = (c: Cluster) => {
  if (c.priority === "High" && c.hasSurge) return "border-l-destructive";
  if (c.priority === "High") return "border-l-destructive/60";
  if (c.status === "In Progress") return "border-l-warning";
  return "border-l-primary";
};

const timelineSteps = ["Detected", "Case Created", "Action Taken", "Resolved", "Impact Measured"];

const CaseManagement = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const deptFilter = searchParams.get("dept");

  const filtered = deptFilter
    ? mockClusters.filter((c) => c.deptId === deptFilter)
    : mockClusters;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Case Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Negative feedback clusters grouped by detected issues.</p>
        </div>
      </div>

      {deptFilter && (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary">
            Filtered: {deptFilter}
          </Badge>
          <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => navigate("/dashboard/cases")}>
            Clear filter
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {filtered.map((c) => (
          <div key={c.id} className={`bg-card rounded-xl border border-l-4 ${clusterBorder(c)} shadow-sm overflow-hidden hover:shadow-md transition-shadow`}>
            <button
              className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
              onClick={() => setExpanded(expanded === c.id ? null : c.id)}
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-sm">{c.title}</h3>
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
              <div className="border-t px-5 py-5 space-y-5 bg-muted/20">
                {/* Timeline */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Case Lifecycle</p>
                  <div className="flex items-center gap-0 flex-wrap">
                    {timelineSteps.map((step, i) => {
                      const reached = c.timeline.includes(step as any);
                      return (
                        <div key={step} className="flex items-center">
                          <div className={`px-3 py-1.5 rounded-full text-[11px] font-medium border ${reached ? "bg-primary/15 text-primary border-primary/30" : "bg-muted text-muted-foreground border-border"}`}>
                            {step}
                          </div>
                          {i < timelineSteps.length - 1 && (
                            <div className={`w-6 h-px ${reached && c.timeline.includes(timelineSteps[i + 1] as any) ? "bg-primary/40" : "bg-border"}`} />
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
                          <Progress value={m.sentimentScore} className="h-1.5 flex-1 [&>div]:bg-destructive" />
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
