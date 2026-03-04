import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 justify-center mb-8">
          <Activity className="h-7 w-7 text-primary" />
          <span className="font-display font-bold text-lg">AAROGYA NETRA</span>
        </Link>

        <div className="bg-card rounded-xl border shadow-sm p-6">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="w-full mb-6">
              <TabsTrigger value="login" className="flex-1">Login</TabsTrigger>
              <TabsTrigger value="register" className="flex-1">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label>Hospital Email</Label>
                <Input type="email" placeholder="admin@hospital.com" />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <Button className="w-full" onClick={() => navigate("/dashboard")}>
                Login → Dashboard
              </Button>
            </TabsContent>

            <TabsContent value="register" className="space-y-4">
              <p className="text-sm text-muted-foreground">Create a new hospital account.</p>
              <Button className="w-full" onClick={() => navigate("/register")}>
                Start Registration
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Login;
