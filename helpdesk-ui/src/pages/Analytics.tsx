import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { analyticsData } from "@/data/mockData";
import { TrendingUp, Clock, CheckCircle2, Smile } from "lucide-react";
import { LeftSidebar } from "@/components/helpdesk/LeftSidebar";
import { Header } from "@/components/helpdesk/Header";

const { ticketsByStatus, ticketsByPriority, volumeByWeek, resolutionTime, agentPerformance, kpis } = analyticsData;

function KPICard({ label, value, icon: Icon, sub }: { label: string; value: string | number; icon: React.ElementType; sub?: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-5 flex items-start gap-4">
      <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5 text-brand" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold text-foreground mt-0.5">{value}</p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">{title}</h3>
      {children}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-md px-3 py-2 text-xs shadow-md">
      {label && <p className="font-semibold text-foreground mb-1">{label}</p>}
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color || p.fill }}>
          {p.name}: <span className="font-semibold">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

export default function Analytics() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1 min-h-0">
        <LeftSidebar />
        <main className="flex-1 overflow-y-auto bg-background p-6 scrollbar-thin">
          <div className="max-w-6xl mx-auto space-y-6">

            {/* Page title */}
            <div>
              <h1 className="text-xl font-bold text-foreground">Analytics</h1>
              <p className="text-sm text-muted-foreground mt-0.5">Support performance overview · Last 9 weeks</p>
            </div>

            {/* KPI row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <KPICard label="Open Tickets" value={kpis.totalOpen} icon={TrendingUp} sub="across all agents" />
              <KPICard label="Resolved This Week" value={kpis.resolvedThisWeek} icon={CheckCircle2} sub="+17% vs last week" />
              <KPICard label="Avg First Response" value={kpis.avgFirstResponse} icon={Clock} sub="within business hours" />
              <KPICard label="CSAT Score" value={`${kpis.satisfactionScore}%`} icon={Smile} sub="based on 84 ratings" />
            </div>

            {/* Volume over time — full width */}
            <ChartCard title="Ticket Volume by Week">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={volumeByWeek} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="created" name="Created" stroke="hsl(var(--brand-blue))" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="resolved" name="Resolved" stroke="hsl(var(--status-done))" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Status + Priority side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ChartCard title="Tickets by Status">
                <div className="flex items-center gap-6">
                  <ResponsiveContainer width="60%" height={180}>
                    <PieChart>
                      <Pie data={ticketsByStatus} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={80}>
                        {ticketsByStatus.map((entry, i) => (
                          <Cell key={i} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 text-sm">
                    {ticketsByStatus.map((s) => (
                      <div key={s.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full shrink-0" style={{ background: s.fill }} />
                        <span className="text-muted-foreground">{s.name}</span>
                        <span className="font-semibold text-foreground ml-auto pl-4">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ChartCard>

              <ChartCard title="Tickets by Priority">
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={ticketsByPriority} margin={{ top: 4, right: 8, left: -16, bottom: 0 }} barSize={32}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" name="Tickets" radius={[4, 4, 0, 0]}>
                      {ticketsByPriority.map((entry, i) => (
                        <Cell key={i} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            {/* Resolution time + Agent performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ChartCard title="Resolution Time Distribution">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={resolutionTime} layout="vertical" margin={{ top: 4, right: 8, left: 60, bottom: 0 }} barSize={18}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} width={56} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" name="Tickets" fill="hsl(var(--brand-blue))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Agent Performance">
                <div className="space-y-3">
                  {agentPerformance.map((agent) => {
                    const total = agent.resolved + agent.open;
                    const pct = Math.round((agent.resolved / total) * 100);
                    return (
                      <div key={agent.name}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-medium text-foreground">{agent.name}</span>
                          <span className="text-muted-foreground">{agent.resolved} resolved · {agent.open} open · avg {agent.avgTime}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-brand transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ChartCard>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
