import { NavLink as RouterNavLink, useNavigate, useLocation } from "react-router-dom";
import { Activity, LayoutDashboard, Users, MessageSquare, Briefcase, BarChart3, LogOut } from "lucide-react";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/dashboard/patients", label: "Patient Management", icon: Users },
  { to: "/dashboard/feedback", label: "Feedback Stream", icon: MessageSquare },
  { to: "/dashboard/cases", label: "Case Management", icon: Briefcase },
  { to: "/dashboard/analytics", label: "Admin Analytics", icon: BarChart3 },
];

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-primary flex flex-col shrink-0">
      <div className="flex items-center gap-2 px-5 py-5">
        <Activity className="h-6 w-6 text-primary-foreground" />
        <span className="font-display font-bold text-primary-foreground">AAROGYA NETRA</span>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {links.map((l) => {
          const active = location.pathname === l.to;
          return (
            <RouterNavLink
              key={l.to}
              to={l.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-primary-foreground/20 text-primary-foreground font-medium"
                  : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              }`}
            >
              <l.icon className="h-4 w-4" />
              {l.label}
            </RouterNavLink>
          );
        })}
      </nav>

      <div className="px-3 pb-5">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-colors w-full"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
