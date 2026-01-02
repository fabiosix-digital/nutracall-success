import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "00:00", calls: 12 },
  { name: "04:00", calls: 8 },
  { name: "08:00", calls: 45 },
  { name: "12:00", calls: 78 },
  { name: "16:00", calls: 92 },
  { name: "20:00", calls: 56 },
  { name: "24:00", calls: 24 },
];

export function CallsChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Chamadas por Horário</h3>
        <p className="text-sm text-muted-foreground">
          Distribuição de chamadas nas últimas 24 horas
        </p>
      </div>
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="callsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border border-border bg-popover p-3 shadow-lg">
                      <p className="text-sm font-medium text-foreground">
                        {payload[0].payload.name}
                      </p>
                      <p className="text-lg font-bold text-primary">
                        {payload[0].value} chamadas
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="calls"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#callsGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
