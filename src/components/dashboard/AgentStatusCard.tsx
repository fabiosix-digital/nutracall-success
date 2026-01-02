import { Bot, Phone, Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Agent {
  id: string;
  name: string;
  status: "online" | "busy" | "offline";
  callsToday: number;
  lastActive: string;
}

const mockAgents: Agent[] = [
  { id: "1", name: "Suporte Vendas", status: "busy", callsToday: 24, lastActive: "Agora" },
  { id: "2", name: "Atendimento", status: "online", callsToday: 18, lastActive: "Há 2 min" },
  { id: "3", name: "Nutrição IA", status: "online", callsToday: 12, lastActive: "Há 5 min" },
  { id: "4", name: "Agendamento", status: "offline", callsToday: 8, lastActive: "Há 1h" },
];

const statusConfig = {
  online: { label: "Online", color: "bg-success", pulse: true },
  busy: { label: "Em chamada", color: "bg-warning", pulse: true },
  offline: { label: "Offline", color: "bg-muted-foreground", pulse: false },
};

export function AgentStatusCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Status dos Agentes</h3>
          <p className="text-sm text-muted-foreground">
            {mockAgents.filter((a) => a.status !== "offline").length} agentes ativos
          </p>
        </div>
        <Bot className="h-5 w-5 text-muted-foreground" />
      </div>

      <div className="space-y-3">
        {mockAgents.map((agent) => (
          <div
            key={agent.id}
            className="flex items-center justify-between rounded-lg bg-muted/50 p-3 transition-colors hover:bg-muted"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Bot className="h-5 w-5" />
                </div>
                <span
                  className={cn(
                    "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card",
                    statusConfig[agent.status].color,
                    statusConfig[agent.status].pulse && "animate-pulse"
                  )}
                />
              </div>
              <div>
                <p className="font-medium text-foreground">{agent.name}</p>
                <p className="text-xs text-muted-foreground">{agent.lastActive}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{agent.callsToday}</p>
                <p className="text-xs text-muted-foreground">chamadas</p>
              </div>
              {agent.status === "busy" && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-warning/10">
                  <Mic className="h-4 w-4 text-warning animate-pulse" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
