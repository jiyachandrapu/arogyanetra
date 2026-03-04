import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

const defaultDepts = ["OPD", "Billing", "Pharmacy", "Nursing", "Facilities"];

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [departments, setDepartments] = useState(defaultDepts);
  const [newDept, setNewDept] = useState("");
  const [slaHours, setSlaHours] = useState<Record<string, string>>(
    Object.fromEntries(defaultDepts.map((d) => [d, "24"]))
  );

  const addDept = () => {
    if (newDept.trim() && !departments.includes(newDept.trim())) {
      const name = newDept.trim();
      setDepartments([...departments, name]);
      setSlaHours({ ...slaHours, [name]: "24" });
      setNewDept("");
    }
  };

  const removeDept = (d: string) => {
    setDepartments(departments.filter((x) => x !== d));
    const next = { ...slaHours };
    delete next[d];
    setSlaHours(next);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Link to="/" className="flex items-center gap-2 justify-center mb-8">
          <Activity className="h-7 w-7 text-primary" />
          <span className="font-display font-bold text-lg">AAROGYA NETRA</span>
        </Link>

        <div className="bg-card rounded-xl border shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>1</div>
            <div className={`flex-1 h-1 rounded ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>2</div>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold">Account Setup</h2>
              <div className="space-y-2">
                <Label>Hospital Email</Label>
                <Input type="email" placeholder="admin@hospital.com" />
              </div>
              <div className="space-y-2">
                <Label>Create Password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <Button className="w-full" onClick={() => setStep(2)}>Continue</Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="font-display text-xl font-bold">Hospital Setup</h2>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Hospital Name</Label>
                  <Input placeholder="City General Hospital" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="info@hospital.com" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input placeholder="+91 98765 43210" />
                  </div>
                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Input placeholder="City, State" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-display font-semibold text-sm">Department Configuration</h3>
                <div className="flex flex-wrap gap-2">
                  {departments.map((d) => (
                    <Badge key={d} variant="secondary" className="gap-1 pr-1">
                      {d}
                      <button onClick={() => removeDept(d)} className="hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add department"
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addDept()}
                    className="flex-1"
                  />
                  <Button variant="outline" size="icon" onClick={addDept}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-display font-semibold text-sm">SLA Configuration (hours)</h3>
                <div className="rounded-lg border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left px-3 py-2 font-medium">Department</th>
                        <th className="text-left px-3 py-2 font-medium">SLA Hours</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departments.map((d) => (
                        <tr key={d} className="border-t">
                          <td className="px-3 py-2">{d}</td>
                          <td className="px-3 py-2">
                            <Input
                              type="number"
                              value={slaHours[d] || "24"}
                              onChange={(e) => setSlaHours({ ...slaHours, [d]: e.target.value })}
                              className="w-20 h-8"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
                <Button className="flex-1" onClick={() => navigate("/dashboard")}>Complete Registration</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
