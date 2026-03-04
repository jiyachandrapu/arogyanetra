import { MessageSquareOff, Clock, Users } from "lucide-react";

const problems = [
  {
    icon: MessageSquareOff,
    title: "Scattered Feedback Channels",
    description: "Patient feedback comes from WhatsApp, email, forms, and in-person — with no unified view.",
  },
  {
    icon: Clock,
    title: "Delayed Insight Generation",
    description: "By the time issues are identified, patient trust is already lost and damage is done.",
  },
  {
    icon: Users,
    title: "No Department Accountability",
    description: "Without clear assignment, complaints fall through the cracks with no ownership or SLA tracking.",
  },
];

const ProblemSection = () => (
  <section id="problem" className="py-20 bg-card">
    <div className="container mx-auto px-4">
      <h2 className="font-display text-3xl font-bold text-center mb-12">The Problem</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {problems.map((p) => (
          <div key={p.title} className="bg-background rounded-xl p-6 border shadow-sm space-y-3">
            <p.icon className="h-10 w-10 text-destructive/80" />
            <h3 className="font-display font-semibold text-lg">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemSection;
