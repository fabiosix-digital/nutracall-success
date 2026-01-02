import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Search,
  Download,
  PhoneIncoming,
  PhoneOutgoing,
  Play,
  Clock,
  Bot,
  User,
  Calendar,
  Filter,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CallLog {
  id: string;
  phoneNumber: string;
  agentName: string;
  type: "inbound" | "outbound";
  status: "completed" | "missed" | "failed" | "voicemail";
  duration: string;
  cost: string;
  timestamp: string;
  date: string;
  transcript?: string;
  sentiment: "positive" | "neutral" | "negative";
}

const mockCallLogs: CallLog[] = [
  {
    id: "1",
    phoneNumber: "+55 11 99999-1234",
    agentName: "Suporte Vendas",
    type: "inbound",
    status: "completed",
    duration: "4:32",
    cost: "R$ 0.45",
    timestamp: "14:32",
    date: "02/01/2026",
    transcript: "Cliente: Olá, gostaria de saber sobre o suplemento Whey Protein...\n\nAgente: Olá! Com prazer vou te ajudar. Temos várias opções de Whey Protein...",
    sentiment: "positive",
  },
  {
    id: "2",
    phoneNumber: "+55 21 88888-5678",
    agentName: "Atendimento Geral",
    type: "outbound",
    status: "completed",
    duration: "2:15",
    cost: "R$ 0.23",
    timestamp: "13:45",
    date: "02/01/2026",
    transcript: "Agente: Bom dia! Estou ligando para confirmar sua consulta agendada...",
    sentiment: "neutral",
  },
  {
    id: "3",
    phoneNumber: "+55 31 77777-9012",
    agentName: "Nutrição IA",
    type: "inbound",
    status: "missed",
    duration: "-",
    cost: "R$ 0.00",
    timestamp: "12:20",
    date: "02/01/2026",
    sentiment: "neutral",
  },
  {
    id: "4",
    phoneNumber: "+55 41 66666-3456",
    agentName: "Agendamento",
    type: "inbound",
    status: "completed",
    duration: "8:45",
    cost: "R$ 0.87",
    timestamp: "11:15",
    date: "02/01/2026",
    transcript: "Cliente: Preciso remarcar minha consulta de amanhã...",
    sentiment: "positive",
  },
  {
    id: "5",
    phoneNumber: "+55 51 55555-7890",
    agentName: "Suporte Vendas",
    type: "inbound",
    status: "failed",
    duration: "0:12",
    cost: "R$ 0.02",
    timestamp: "10:30",
    date: "02/01/2026",
    sentiment: "negative",
  },
];

const statusConfig = {
  completed: { label: "Concluída", className: "bg-success/10 text-success border-success/20" },
  missed: { label: "Perdida", className: "bg-warning/10 text-warning border-warning/20" },
  failed: { label: "Falhou", className: "bg-destructive/10 text-destructive border-destructive/20" },
  voicemail: { label: "Voicemail", className: "bg-muted text-muted-foreground border-muted" },
};

const sentimentConfig = {
  positive: { label: "Positivo", className: "bg-success/10 text-success" },
  neutral: { label: "Neutro", className: "bg-muted text-muted-foreground" },
  negative: { label: "Negativo", className: "bg-destructive/10 text-destructive" },
};

const CallLogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCall, setSelectedCall] = useState<CallLog | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredLogs = mockCallLogs.filter((log) => {
    const matchesSearch = log.phoneNumber.includes(searchTerm) ||
      log.agentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <MainLayout title="Logs de Chamadas">
      <div className="space-y-6 animate-fade-in">
        {/* Header Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por número ou agente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:w-80"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="completed">Concluídas</SelectItem>
                <SelectItem value="missed">Perdidas</SelectItem>
                <SelectItem value="failed">Falhas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockCallLogs.length}</p>
                <p className="text-xs text-muted-foreground">Total de Chamadas</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <PhoneIncoming className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockCallLogs.filter((l) => l.status === "completed").length}
                </p>
                <p className="text-xs text-muted-foreground">Concluídas</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                <Clock className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">5:24</p>
                <p className="text-xs text-muted-foreground">Duração Média</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                <PhoneOutgoing className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">R$ 1.57</p>
                <p className="text-xs text-muted-foreground">Custo Total</p>
              </div>
            </div>
          </div>
        </div>

        {/* Logs Table */}
        <div className="rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Telefone</TableHead>
                <TableHead>Agente</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duração</TableHead>
                <TableHead>Custo</TableHead>
                <TableHead className="text-right">Horário</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow
                  key={log.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedCall(log)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full",
                          log.type === "inbound"
                            ? "bg-success/10 text-success"
                            : "bg-primary/10 text-primary"
                        )}
                      >
                        {log.type === "inbound" ? (
                          <PhoneIncoming className="h-4 w-4" />
                        ) : (
                          <PhoneOutgoing className="h-4 w-4" />
                        )}
                      </div>
                      <span className="font-mono">{log.phoneNumber}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4 text-muted-foreground" />
                      {log.agentName}
                    </div>
                  </TableCell>
                  <TableCell>
                    {log.type === "inbound" ? "Recebida" : "Realizada"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn("font-medium", statusConfig[log.status].className)}
                    >
                      {statusConfig[log.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono">{log.duration}</TableCell>
                  <TableCell>{log.cost}</TableCell>
                  <TableCell className="text-right">
                    <div>
                      <p className="font-medium">{log.timestamp}</p>
                      <p className="text-xs text-muted-foreground">{log.date}</p>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Call Details Sheet */}
        <Sheet open={!!selectedCall} onOpenChange={() => setSelectedCall(null)}>
          <SheetContent className="w-full sm:max-w-xl">
            {selectedCall && (
              <>
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Detalhes da Chamada
                  </SheetTitle>
                  <SheetDescription>
                    {selectedCall.phoneNumber} • {selectedCall.date} às {selectedCall.timestamp}
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">Agente</p>
                      <p className="font-medium">{selectedCall.agentName}</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">Duração</p>
                      <p className="font-medium">{selectedCall.duration}</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">Custo</p>
                      <p className="font-medium">{selectedCall.cost}</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">Sentimento</p>
                      <Badge
                        variant="outline"
                        className={cn("mt-1", sentimentConfig[selectedCall.sentiment].className)}
                      >
                        {sentimentConfig[selectedCall.sentiment].label}
                      </Badge>
                    </div>
                  </div>

                  {/* Tabs */}
                  <Tabs defaultValue="transcript" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="transcript">Transcrição</TabsTrigger>
                      <TabsTrigger value="audio">Áudio</TabsTrigger>
                    </TabsList>
                    <TabsContent value="transcript" className="mt-4">
                      {selectedCall.transcript ? (
                        <div className="rounded-lg border border-border bg-muted/30 p-4">
                          <pre className="whitespace-pre-wrap text-sm">
                            {selectedCall.transcript}
                          </pre>
                        </div>
                      ) : (
                        <p className="text-center text-sm text-muted-foreground py-8">
                          Transcrição não disponível
                        </p>
                      )}
                    </TabsContent>
                    <TabsContent value="audio" className="mt-4">
                      <div className="flex items-center justify-center gap-4 rounded-lg border border-border bg-muted/30 p-8">
                        <Button size="icon" className="h-12 w-12 rounded-full">
                          <Play className="h-5 w-5" />
                        </Button>
                        <div className="flex-1">
                          <div className="h-2 rounded-full bg-muted">
                            <div className="h-2 w-1/3 rounded-full bg-primary" />
                          </div>
                          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                            <span>1:24</span>
                            <span>{selectedCall.duration}</span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </MainLayout>
  );
};

export default CallLogsPage;
