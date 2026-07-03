import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export interface Patient { id: string; name: string; phone: string; lastFeedback: string; }

const PatientManagement = () => {
  const [patients] = useState<Patient[]>([]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Patient Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1"><Plus className="h-4 w-4" /> Add Patient</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Patient</DialogTitle></DialogHeader>
            <div className="space-y-3 pt-2">
              <div className="space-y-1"><Label>Name</Label><Input placeholder="Full name" /></div>
              <div className="space-y-1"><Label>Phone</Label><Input placeholder="+91 ..." /></div>
              <Button className="w-full">Add Patient</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Patient ID</th>
              <th className="text-left px-4 py-3 font-medium">Name</th>
              <th className="text-left px-4 py-3 font-medium">Phone</th>
              <th className="text-left px-4 py-3 font-medium">Last Feedback</th>
            </tr>
          </thead>
          <tbody>
            {patients.length > 0 ? patients.map((p) => (
              <tr key={p.id} className="border-t hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 font-mono text-xs">{p.id}</td>
                <td className="px-4 py-3">{p.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.phone}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.lastFeedback}</td>
              </tr>
            )) : (
              <tr><td colSpan={4} className="px-4 py-12 text-center text-sm text-muted-foreground">No patients yet. Connect backend to load patient data.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientManagement;
