import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, BarChart3, Bell, HeartPulse, ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-accent/30 via-background to-secondary/20">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Healthcare Platform</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <HeartPulse className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-primary tracking-tight">AAROGYA NETRA</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-foreground">
            Intelligent Patient <span className="text-primary">Feedback</span> & Resolution Engine
          </h1>
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            Transform fragmented patient feedback into real-time, actionable service recovery workflows. Elevate patient satisfaction with AI-driven insights.
          </p>
          <div className="flex gap-3 pt-2">
            <Link to="/login">
              <Button size="lg" className="gap-2">Hospital Login <ArrowRight className="h-4 w-4" /></Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="lg">Register Hospital</Button>
            </Link>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="bg-accent/50 rounded-2xl p-8 relative">
            <div className="space-y-4">
              <div className="bg-card rounded-xl p-4 shadow-sm border animate-fade-in flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-success" />
                <div>
                  <p className="font-semibold text-sm">Case Resolved</p>
                  <p className="text-xs text-muted-foreground">OPD Waiting Time — 3 complaints addressed</p>
                </div>
              </div>
              <div className="bg-card rounded-xl p-4 shadow-sm border animate-fade-in [animation-delay:200ms] flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-semibold text-sm">Real-Time Feedback Analysis</p>
                  <p className="text-xs text-muted-foreground">12 new feedbacks processed today</p>
                </div>
              </div>
              <div className="bg-card rounded-xl p-4 shadow-sm border animate-fade-in [animation-delay:400ms] flex items-center gap-3">
                <Bell className="h-8 w-8 text-warning" />
                <div>
                  <p className="font-semibold text-sm">Spike Alert</p>
                  <p className="text-xs text-muted-foreground">Billing complaints up 40% this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
