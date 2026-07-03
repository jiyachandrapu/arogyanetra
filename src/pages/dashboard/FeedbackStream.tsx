import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export interface Feedback {
  id: number;
  source: string;
  language: string;
  time: string;
  text: string;
  department: string;
  sentiment: "positive" | "negative";
}

const sourceBadgeColor = (s: string) => {
  if (s === "WhatsApp") return "bg-success/20 text-success-foreground";
  if (s === "Email") return "bg-secondary text-secondary-foreground";
  return "bg-accent text-accent-foreground";
};

const FeedbackStream = () => {
  const [feedbacks] = useState<Feedback[]>([]);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">Feedback Stream</h1>

      {feedbacks.length > 0 ? (
        <div className="space-y-3">
          {feedbacks.map((f) => (
            <div key={f.id} className="bg-card rounded-xl border shadow-sm p-4 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className={sourceBadgeColor(f.source)}>{f.source}</Badge>
                <Badge variant="outline">{f.language}</Badge>
                <Badge variant="outline" className="bg-muted">{f.department}</Badge>
                <span className="text-xs text-muted-foreground ml-auto">{f.time}</span>
              </div>
              <p className="text-sm leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-xl border shadow-sm p-12 text-center">
          <p className="text-sm text-muted-foreground">No feedback yet. Connect backend to stream messages.</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackStream;
