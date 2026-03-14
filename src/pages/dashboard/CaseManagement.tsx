import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

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
  const deptFilter = searchParams.get("dept");

  // Will be populated from backend API
  const clusters: Cluster[] = [];

  const filtered = deptFilter
    ? clusters.filter((c) => c.deptId === deptFilter)
    : clusters;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Case Management</h1>
        <p className="text-sm text-muted-foreground mt-1">Negative feedback clusters grouped by detected issues.</p>
      </div>

      {deptFilter && (
        <Badge variant="outline" className="bg-primary/10 text-primary">
          Filtered: {deptFilter}
        </Badge>
      )}

      {filtered.length > 0 ? (
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
                    <div className="flex items-center gap-0">
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
      ) : (
        <div className="bg-card rounded-xl border shadow-sm p-12 text-center">
          <p className="text-muted-foreground">No active cases. Negative feedback clusters will appear here when issues are detected.</p>
        </div>
      )}
    </div>
  );
};

export default CaseManagement;
