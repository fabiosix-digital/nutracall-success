import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Phone,
  Clock,
  CheckCircle,
  Headphones,
  TrendingUp,
  PhoneIncoming,
  PhoneOutgoing,
  ShoppingCart,
  AlertTriangle,
  Zap,
  Package,
} from "lucide-react";

const chartData = [
  { name: "00:00", calls: 12 },
  { name: "04:00", calls: 8 },
  { name: "08:00", calls: 45 },
  { name: "12:00", calls: 78 },
  { name: "16:00", calls: 92 },
  { name: "20:00", calls: 56 },
  { name: "24:00", calls: 24 },
];

const recentCalls = [
  {
    id: "1",
    phoneNumber: "+55 11 99999-1234",
    agentName: "Suporte Vendas",
    duration: "4:32",
    status: "completed",
    type: "inbound",
    timestamp: "Há 5 min",
  },
  {
    id: "2",
    phoneNumber: "+55 21 88888-5678",
    agentName: "Atendimento",
    duration: "2:15",
    status: "completed",
    type: "outbound",
    timestamp: "Há 12 min",
  },
  {
    id: "3",
    phoneNumber: "+55 31 77777-9012",
    agentName: "Nutrição IA",
    duration: "-",
    status: "missed",
    type: "inbound",
    timestamp: "Há 25 min",
  },
  {
    id: "4",
    phoneNumber: "+55 41 66666-3456",
    agentName: "Agendamento",
    duration: "8:45",
    status: "completed",
    type: "inbound",
    timestamp: "Há 1h",
  },
];

const statusColors: Record<string, string> = {
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  missed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  "in-progress": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
};

const statusLabels: Record<string, string> = {
  completed: "Concluída",
  missed: "Perdida",
  "in-progress": "Em andamento",
};

const Index = () => {
  return (
    <MainLayout title="Dashboard" description="Visão geral do sistema">
      <div className="px-3 md:px-6 py-4 md:py-6 overflow-auto bg-background animate-fade-in">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Chamadas Hoje</p>
                  <p className="text-3xl font-bold">156</p>
                  <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    +12% vs ontem
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tempo Médio</p>
                  <p className="text-3xl font-bold">4:32</p>
                  <p className="text-xs text-muted-foreground mt-1">minutos por chamada</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                  <Clock className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Taxa de Sucesso</p>
                  <p className="text-3xl font-bold">94.2%</p>
                  <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    +3.5% vs semana
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Agentes Ativos</p>
                  <p className="text-3xl font-bold">4</p>
                  <p className="text-xs text-muted-foreground mt-1">2 online, 2 em chamada</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                  <Headphones className="h-6 w-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                  <ShoppingCart className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">23</p>
                  <p className="text-xs text-muted-foreground">Pedidos Hoje</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-xs text-muted-foreground">Objeções Frequentes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10">
                  <Zap className="h-5 w-5 text-cyan-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-muted-foreground">Automações Ativas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Tables */}
        <div className="grid gap-6 lg:grid-cols-3 mb-6">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Chamadas por Horário</CardTitle>
              <p className="text-sm text-muted-foreground">
                Distribuição de chamadas nas últimas 24 horas
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="callsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
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
                    />
                    <RechartsTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border border-border bg-popover p-3 shadow-lg">
                              <p className="text-sm font-medium">{payload[0].payload.name}</p>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Agentes Ativos</CardTitle>
              <p className="text-sm text-muted-foreground">Status em tempo real</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Suporte Vendas", status: "busy", calls: 24 },
                { name: "Atendimento", status: "online", calls: 18 },
                { name: "Nutrição IA", status: "online", calls: 12 },
                { name: "Agendamento", status: "offline", calls: 8 },
              ].map((agent) => (
                <div
                  key={agent.name}
                  className="flex items-center justify-between rounded-lg bg-muted/50 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <i className="ri-robot-line text-lg"></i>
                      </div>
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card ${
                          agent.status === "busy"
                            ? "bg-yellow-500 animate-pulse"
                            : agent.status === "online"
                            ? "bg-green-500"
                            : "bg-muted-foreground"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{agent.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {agent.status === "busy" ? "Em chamada" : agent.status === "online" ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{agent.calls}</p>
                    <p className="text-xs text-muted-foreground">hoje</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Calls */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Chamadas Recentes</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Últimas chamadas processadas pelos agentes IA
                </p>
              </div>
              <Link to="/call-logs">
                <Button variant="outline" size="sm">
                  Ver Todas
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Agente</TableHead>
                  <TableHead>Duração</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Horário</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentCalls.map((call) => (
                  <TableRow key={call.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            call.type === "inbound"
                              ? "bg-green-500/10 text-green-500"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          {call.type === "inbound" ? (
                            <PhoneIncoming className="h-4 w-4" />
                          ) : (
                            <PhoneOutgoing className="h-4 w-4" />
                          )}
                        </div>
                        <span className="font-medium">{call.phoneNumber}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <i className="ri-robot-line text-muted-foreground"></i>
                        <span className="text-sm">{call.agentName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{call.duration}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[call.status]}>
                        {statusLabels[call.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {call.timestamp}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Index;
