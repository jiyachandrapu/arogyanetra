import { Link } from "react-router-dom";
import { Activity, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <Activity className="h-7 w-7 text-primary" />
          <span className="font-display font-bold text-lg text-foreground">AAROGYA NETRA</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <a href="#problem" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Problem</a>
          <a href="#solution" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Solution</a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
          <Link to="/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link to="/register">
            <Button size="sm">Register Hospital</Button>
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-card p-4 flex flex-col gap-3">
          <a href="#problem" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>Problem</a>
          <a href="#solution" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>Solution</a>
          <a href="#how-it-works" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>How It Works</a>
          <Link to="/login"><Button variant="ghost" size="sm" className="w-full">Login</Button></Link>
          <Link to="/register"><Button size="sm" className="w-full">Register Hospital</Button></Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
