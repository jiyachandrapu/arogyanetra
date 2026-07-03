import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

export interface DeptComplaint { department: string; complaints: number; }
export interface SentimentPoint { day: string; positive: number; negative: number; }
export interface SlaBreach { department: string; breaches: number; }

const EmptyChart = ({ text }: { text: string }) => (
  <div className="h-[250px] flex items-center justify-center">
    <p className="text-sm text-muted-foreground">{text}</p>
  </div>
);

const AdminAnalytics = () => {
  const [deptData] = useState<DeptComplaint[]>([]);
  const [sentimentTrend] = useState<SentimentPoint[]>([]);
  const [slaBreaches] = useState<SlaBreach[]>([]);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">Admin Analytics</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-l-4 border-l-primary shadow-sm p-5">
          <h3 className="font-display font-semibold mb-4">Department Complaint Distribution</h3>
          {deptData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={deptData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 18% 90%)" />
                <XAxis dataKey="department" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="complaints" fill="hsl(174 42% 55%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <EmptyChart text="No complaint data yet." />}
        </div>

        <div className="bg-card rounded-xl border border-l-4 border-l-success shadow-sm p-5">
          <h3 className="font-display font-semibold mb-4">Sentiment Trend</h3>
          {sentimentTrend.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={sentimentTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 18% 90%)" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="positive" stroke="hsl(152 50% 45%)" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="negative" stroke="hsl(0 65% 60%)" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : <EmptyChart text="No sentiment data yet." />}
        </div>

        <div className="bg-card rounded-xl border border-l-4 border-l-destructive shadow-sm p-5 lg:col-span-2">
          <h3 className="font-display font-semibold mb-4">SLA Breach Count by Department</h3>
          {slaBreaches.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={slaBreaches}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 18% 90%)" />
                <XAxis dataKey="department" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="breaches" fill="hsl(0 65% 65%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <EmptyChart text="No SLA breach data yet." />}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
