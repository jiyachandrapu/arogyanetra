import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FeedbackMessage {
  source: string;
  time: string;
  text: string;
}

interface Cluster {
  id: number;
  title: string;
  department: string;
  count: number;
  slaRemaining: string;
  status: "Open" | "In Progress" | "Resolved";
  messages: FeedbackMessage[];
}

const clusters: Cluster[] = [
  {
    id: 1,
    title: "OPD Waiting Time Complaints",
    department: "OPD",
    count: 6,
    slaRemaining: "18 hours",
    status: "Open",
    messages: [
      { source: "WhatsApp", time: "10 mins ago", text: "OPD la romba neram wait pannenom. Doctor 2 hours late ah vandhar." },
      { source: "Web Form", time: "1 hour ago", text: "Waited 3 hours in OPD. No token system, very disorganized." },
      { source: "WhatsApp", time: "2 hours ago", text: "OPD waiting area is overcrowded. No seating available." },
    ],
  },
  {
    id: 2,
    title: "Billing Delay Issues",
    department: "Billing",
    count: 4,
    slaRemaining: "12 hours",
    status: "In Progress",
    messages: [
      { source: "Web Form", time: "25 mins ago", text: "The billing counter was very slow today. I waited 45 minutes for discharge papers." },
      { source: "Email", time: "3 hours ago", text: "Insurance processing took 2 hours at the billing desk." },
    ],
  },
  {
    id: 3,
    title: "Pharmacy Stock Unavailability",
    department: "Pharmacy",
    count: 3,
    slaRemaining: "6 hours",
    status: "Open",
    messages: [
      { source: "WhatsApp", time: "2 hours ago", text: "மருந்துக்கடையில் மருந்து இல்லை என்று சொன்னார்கள்." },
      { source: "Web Form", time: "5 hours ago", text: "Prescribed medicine was not available in hospital pharmacy. Had to go outside." },
    ],
  },
  {
    id: 4,
    title: "Facility Cleanliness Complaints",
    department: "Facilities",
    count: 2,
    slaRemaining: "22 hours",
    status: "Open",
    messages: [
      { source: "Web Form", time: "3 hours ago", text: "Washrooms on the second floor were not clean. Needs immediate attention." },
    ],
  },
];

const statusColor = (s: string) => {
  if (s === "Open") return "bg-destructive/15 text-destructive";
  if (s === "In Progress") return "bg-warning/15 text-warning-foreground";
  return "bg-success/15 text-success-foreground";
};

const CaseManagement = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">Case Management</h1>

      <div className="space-y-3">
        {clusters.map((c) => (
          <div key={c.id} className="bg-card rounded-xl border shadow-sm overflow-hidden">
            <button
              className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
              onClick={() => setExpanded(expanded === c.id ? null : c.id)}
            >
              <div className="space-y-1">
                <h3 className="font-display font-semibold">{c.title}</h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>Department: {c.department}</span>
                  <span>Complaints: {c.count}</span>
                  <span>SLA Remaining: {c.slaRemaining}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={statusColor(c.status)}>{c.status}</Badge>
                {expanded === c.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
              </div>
            </button>

            {expanded === c.id && (
              <div className="border-t px-5 py-4 space-y-3 bg-muted/20">
                {c.messages.map((m, i) => (
                  <div key={i} className="bg-card rounded-lg border p-3 space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs">{m.source}</Badge>
                      <span>{m.time}</span>
                    </div>
                    <p className="text-sm">{m.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseManagement;
