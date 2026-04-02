import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp, TrendingUp, Star } from "lucide-react";

export interface FeedbackMessage {
  id: number;
  source: string;
  language: string;
  department: string;
  time: string;
  text: string;
  sentimentScore: number;
  sentiment: "positive" | "negative";
}

export interface PositiveInsight {
  department: string;
  insight: string;
}

const mockMessages: FeedbackMessage[] = [
  { id: 1, source: "WhatsApp", language: "English", department: "Nursing", time: "4:50 PM", text: "The nurses in ward 3 were extremely caring and attentive. Thank you!", sentimentScore: 92, sentiment: "positive" },
  { id: 2, source: "WhatsApp", language: "Hindi", department: "OPD", time: "4:45 PM", text: "Doctor ne bahut acche se explain kiya. Bohot khush hoon treatment se.", sentimentScore: 88, sentiment: "positive" },
  { id: 3, source: "Email", language: "English", department: "Radiology", time: "4:30 PM", text: "Quick X-ray results and helpful staff. Very satisfied with the service.", sentimentScore: 85, sentiment: "positive" },
  { id: 4, source: "WhatsApp", language: "English", department: "OPD", time: "3:10 PM", text: "The wait time at OPD is unacceptable. I've been here since morning.", sentimentScore: 22, sentiment: "negative" },
  { id: 5, source: "WhatsApp", language: "Hindi", department: "OPD", time: "2:45 PM", text: "3 ghante se wait kar raha hoon, koi response nahi", sentimentScore: 18, sentiment: "negative" },
  { id: 6, source: "Email", language: "English", department: "Billing", time: "11:30 AM", text: "I was charged ₹5000 extra for a basic blood test. This is fraud!", sentimentScore: 12, sentiment: "negative" },
  { id: 7, source: "WhatsApp", language: "Tamil", department: "Billing", time: "12:15 PM", text: "Bill la extra amount potrukanga. Very disappointed.", sentimentScore: 28, sentiment: "negative" },
  { id: 8, source: "Email", language: "English", department: "Pharmacy", time: "9:00 AM", text: "Common medicines like paracetamol are out of stock. Had to buy from outside.", sentimentScore: 35, sentiment: "negative" },
  { id: 9, source: "WhatsApp", language: "English", department: "Emergency", time: "4:30 PM", text: "My father was having chest pain and we waited 40 minutes!", sentimentScore: 10, sentiment: "negative" },
  { id: 10, source: "Email", language: "English", department: "Laboratory", time: "3:00 PM", text: "Lab reports were delivered on time and the staff was very professional.", sentimentScore: 82, sentiment: "positive" },
];

const mockInsights: PositiveInsight[] = [
  { department: "Nursing", insight: "Patient satisfaction scores up 15% this week — consistent praise for attentive care." },
  { department: "Radiology", insight: "Average report turnaround improved to 2 hours — 30% faster than last month." },
  { department: "Laboratory", insight: "Zero complaints about report delays in the past 48 hours." },
];

const sourceBadgeColor = (s: string) => {
  if (s === "WhatsApp") return "bg-success/15 text-success";
  return "bg-secondary/50 text-secondary-foreground";
};

const MessageCard = ({ m }: { m: FeedbackMessage }) => (
  <div className="bg-card rounded-lg border p-3 space-y-2">
    <div className="flex items-center gap-2 flex-wrap">
      <Badge variant="outline" className={`text-[10px] ${sourceBadgeColor(m.source)}`}>{m.source}</Badge>
      <Badge variant="outline" className="text-[10px]">{m.language}</Badge>
      <Badge variant="outline" className="text-[10px] bg-muted">{m.department}</Badge>
      <span className="text-[10px] text-muted-foreground ml-auto">{m.time}</span>
    </div>
    <p className="text-sm leading-relaxed">{m.text}</p>
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-muted-foreground">Sentiment</span>
      <Progress
        value={m.sentimentScore}
        className={`h-1.5 flex-1 ${m.sentiment === "positive" ? "[&>div]:bg-success" : "[&>div]:bg-destructive"}`}
      />
      <span className={`text-[10px] font-medium ${m.sentiment === "positive" ? "text-success" : "text-destructive"}`}>{m.sentimentScore}%</span>
    </div>
  </div>
);

const LiveFeedback = () => {
  const [showPositive, setShowPositive] = useState(true);
  const [showNegative, setShowNegative] = useState(true);

  const positiveMessages = mockMessages.filter(m => m.sentiment === "positive");
  const negativeMessages = mockMessages.filter(m => m.sentiment === "negative");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Live Feedback Stream</h1>
        <p className="text-sm text-muted-foreground mt-1">All incoming messages from WhatsApp and Email channels.</p>
      </div>

      {/* Positive Insights */}
      <div className="bg-card rounded-xl border shadow-sm p-4 space-y-3">
        <h2 className="font-semibold text-sm flex items-center gap-2">
          <Star className="h-4 w-4 text-success" />
          Positive Performance Insights
        </h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {mockInsights.map((pi, i) => (
            <div key={i} className="bg-success/5 rounded-lg border border-success/20 p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <TrendingUp className="h-3.5 w-3.5 text-success" />
                <span className="text-xs font-semibold text-success">{pi.department}</span>
              </div>
              <p className="text-[11px] text-muted-foreground">{pi.insight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Two columns */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Positive */}
        <div className="space-y-3">
          <button onClick={() => setShowPositive(!showPositive)} className="flex items-center gap-2 w-full">
            <h2 className="font-semibold text-sm text-success">Positive Clusters ({positiveMessages.length})</h2>
            {showPositive ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </button>
          {showPositive && (
            <div className="space-y-2">
              {positiveMessages.map(m => <MessageCard key={m.id} m={m} />)}
            </div>
          )}
        </div>

        {/* Negative */}
        <div className="space-y-3">
          <button onClick={() => setShowNegative(!showNegative)} className="flex items-center gap-2 w-full">
            <h2 className="font-semibold text-sm text-destructive">Negative Clusters ({negativeMessages.length})</h2>
            {showNegative ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </button>
          {showNegative && (
            <div className="space-y-2">
              {negativeMessages.map(m => <MessageCard key={m.id} m={m} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveFeedback;
