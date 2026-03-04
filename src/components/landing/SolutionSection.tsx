import { MessageCircle, Brain, AlertTriangle, ClipboardCheck } from "lucide-react";

const solutions = [
  { icon: MessageCircle, title: "Multi-Channel Feedback Collection", description: "Aggregate feedback from WhatsApp, email, web forms, and more into one stream." },
  { icon: Brain, title: "Sentiment Detection", description: "Automatically detect negative, neutral, and positive sentiment from patient messages." },
  { icon: AlertTriangle, title: "Negative Spike Alerts", description: "Get instant alerts when complaint volumes spike for any department." },
  { icon: ClipboardCheck, title: "SLA Case Management", description: "Auto-create cases for negative feedback with SLA tracking per department." },
];

const SolutionSection = () => (
  <section id="solution" className="py-20">
    <div className="container mx-auto px-4">
      <h2 className="font-display text-3xl font-bold text-center mb-12">The Solution</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {solutions.map((s) => (
          <div key={s.title} className="bg-card rounded-xl p-6 border shadow-sm space-y-3 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <s.icon className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="font-display font-semibold">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SolutionSection;
