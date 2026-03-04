const steps = [
  { number: "1", title: "Collect Feedback", description: "Gather patient feedback from multiple channels automatically." },
  { number: "2", title: "Analyze Sentiment", description: "Detect sentiment and categorize feedback by department." },
  { number: "3", title: "Detect Issues", description: "Identify negative spikes and group complaints into issue clusters." },
  { number: "4", title: "Resolve with SLA", description: "Assign cases to departments and track resolution within SLA deadlines." },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-20 bg-card">
    <div className="container mx-auto px-4">
      <h2 className="font-display text-3xl font-bold text-center mb-12">How It Works</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s) => (
          <div key={s.number} className="relative bg-background rounded-xl p-6 border shadow-sm text-center space-y-3">
            <div className="mx-auto w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold">
              {s.number}
            </div>
            <h3 className="font-display font-semibold">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
