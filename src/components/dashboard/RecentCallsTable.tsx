import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PhoneIncoming, PhoneOutgoing, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface Call {
  id: string;
  phoneNumber: string;
  agentName: string;
  duration: string;
  status: "completed" | "missed" | "in-progress";
  type: "inbound" | "outbound";
  timestamp: string;
}

const mockCalls: Call[] = [
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
  {
    id: "5",
    phoneNumber: "+55 51 55555-7890",
    agentName: "Suporte Vendas",
    duration: "1:23",
    status: "in-progress",
    type: "inbound",
    timestamp: "Agora",
  },
];

const statusConfig = {
  completed: { label: "Concluída", className: "bg-success/10 text-success border-success/20" },
  missed: { label: "Perdida", className: "bg-destructive/10 text-destructive border-destructive/20" },
  "in-progress": { label: "Em andamento", className: "bg-warning/10 text-warning border-warning/20" },
};

export function RecentCallsTable() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="p-6 pb-4">
        <h3 className="text-lg font-semibold text-foreground">Chamadas Recentes</h3>
        <p className="text-sm text-muted-foreground">
          Últimas chamadas processadas pelos agentes IA
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Telefone</TableHead>
            <TableHead>Agente</TableHead>
            <TableHead>Duração</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Horário</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockCalls.map((call) => (
            <TableRow key={call.id} className="group">
              <TableCell>
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full",
                      call.type === "inbound"
                        ? "bg-success/10 text-success"
                        : "bg-primary/10 text-primary"
                    )}
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
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-secondary/10 text-secondary text-xs">
                      <Bot className="h-3 w-3" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{call.agentName}</span>
                </div>
              </TableCell>
              <TableCell className="font-mono text-sm">{call.duration}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={cn(
                    "font-medium",
                    statusConfig[call.status].className
                  )}
                >
                  {statusConfig[call.status].label}
                </Badge>
              </TableCell>
              <TableCell className="text-right text-sm text-muted-foreground">
                {call.timestamp}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
