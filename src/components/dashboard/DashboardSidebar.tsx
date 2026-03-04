import { NavLink as RouterNavLink, useNavigate, useLocation } from "react-router-dom";
import { Activity, LayoutDashboard, Building2, Briefcase, CheckCircle2, Radio, BrainCircuit, LogOut } from "lucide-react";

const links = [
  { to: "/dashboard", label: "Home", icon: LayoutDashboard },
  { to: "/dashboard/departments", label: "Departments", icon: Building2 },
  { to: "/dashboard/cases", label: "Case Management", icon: Briefcase },
  { to: "/dashboard/resolved", label: "Resolved Cases", icon: CheckCircle2 },
  { to: "/dashboard/feedback", label: "Live Feedback", icon: Radio },
  { to: "/dashboard/predictive", label: "Predictive Intel", icon: BrainCircuit },
];

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-sidebar flex flex-col shrink-0">
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
          <Activity className="h-4.5 w-4.5 text-primary" />
        </div>
        <span className="font-display font-bold text-sidebar-foreground tracking-wide text-sm">AAROGYA NETRA</span>
      </div>

      <nav className="flex-1 px-3 pt-4 space-y-0.5">
        {links.map((l) => {
          const active = l.to === "/dashboard"
            ? location.pathname === "/dashboard"
            : location.pathname.startsWith(l.to);
          return (
            <RouterNavLink
              key={l.to}
              to={l.to}
              end={l.to === "/dashboard"}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] transition-all duration-200 ${
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              }`}
            >
              <l.icon className="h-4 w-4" />
              {l.label}
            </RouterNavLink>
          );
        })}
      </nav>

      <div className="px-3 pb-5 border-t border-sidebar-border pt-3">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] text-sidebar-foreground/50 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all duration-200 w-full"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
