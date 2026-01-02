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
  FileText,
  Search,
  Download,
  PhoneIncoming,
  PhoneOutgoing,
  Play,
  Clock,
  Bot,
  Filter,
  Eye,
  Headphones,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { TranscriptionModal } from "@/components/modals/TranscriptionModal";
import { LiveVoiceModal } from "@/components/modals/LiveVoiceModal";
import { CallLog } from "@/types/schema";

interface LocalCallLog {
  id: string;
  phoneNumber: string;
  agentName: string;
  type: "inbound" | "outbound";
  status: "completed" | "missed" | "failed" | "voicemail";
  duration: string;
  durationSeconds: number;
  cost: {
    telephony: number;
    transcription: number;
    llm: number;
    tts: number;
    total: number;
  };
  timestamp: string;
  date: string;
  transcript?: string;
  sentiment: "positive" | "neutral" | "negative";
  objectionsDetected?: string[];
}

const mockCallLogs: LocalCallLog[] = [
  {
    id: "1",
    phoneNumber: "+55 11 99999-1234",
    agentName: "Suporte Vendas",
    type: "inbound",
    status: "completed",
    duration: "4:32",
    durationSeconds: 272,
    cost: { telephony: 0.15, transcription: 0.10, llm: 0.12, tts: 0.08, total: 0.45 },
    timestamp: "14:32",
    date: "02/01/2026",
    transcript: "Cliente: Olá, gostaria de saber sobre o suplemento Whey Protein...\n\nAgente: Olá! Com prazer vou te ajudar. Temos várias opções de Whey Protein...",
    sentiment: "positive",
    objectionsDetected: ["Preço alto"],
  },
  {
    id: "2",
    phoneNumber: "+55 21 88888-5678",
    agentName: "Atendimento Geral",
    type: "outbound",
    status: "completed",
    duration: "2:15",
    durationSeconds: 135,
    cost: { telephony: 0.08, transcription: 0.05, llm: 0.06, tts: 0.04, total: 0.23 },
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
    durationSeconds: 0,
    cost: { telephony: 0, transcription: 0, llm: 0, tts: 0, total: 0 },
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
    durationSeconds: 525,
    cost: { telephony: 0.30, transcription: 0.22, llm: 0.20, tts: 0.15, total: 0.87 },
    timestamp: "11:15",
    date: "02/01/2026",
    transcript: "Cliente: Preciso remarcar minha consulta de amanhã...",
    sentiment: "positive",
    objectionsDetected: ["Falta de tempo", "Agenda lotada"],
  },
  {
    id: "5",
    phoneNumber: "+55 51 55555-7890",
    agentName: "Suporte Vendas",
    type: "inbound",
    status: "failed",
    duration: "0:12",
    durationSeconds: 12,
    cost: { telephony: 0.01, transcription: 0.01, llm: 0, tts: 0, total: 0.02 },
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

const CallLogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedCall, setSelectedCall] = useState<CallLog | null>(null);
  const [isTranscriptionOpen, setIsTranscriptionOpen] = useState(false);
  const [isLiveVoiceOpen, setIsLiveVoiceOpen] = useState(false);

  const filteredLogs = mockCallLogs.filter((log) => {
    const matchesSearch = log.phoneNumber.includes(searchTerm) ||
      log.agentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCost = mockCallLogs.reduce((acc, log) => acc + log.cost.total, 0);

  const handleViewTranscription = (log: LocalCallLog) => {
    const callLog: CallLog = {
      id: log.id,
      agentId: log.id,
      agentName: log.agentName,
      phoneNumber: log.phoneNumber,
      callerNumber: log.phoneNumber,
      direction: log.type === "inbound" ? "inbound" : "outbound",
      status: log.status === "voicemail" ? "completed" : log.status,
      duration: log.durationSeconds,
      transcript: log.transcript,
      audioUrl: "/sample-audio.mp3",
      cost: log.cost,
      sentiment: log.sentiment,
      objectionsDetected: log.objectionsDetected,
      createdAt: new Date().toISOString(),
    };
    setSelectedCall(callLog);
    setIsTranscriptionOpen(true);
  };

  return (
    <MainLayout title="Histórico de Ligações" description="Visualize todas as chamadas realizadas">
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
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsLiveVoiceOpen(true)}>
              <Headphones className="mr-2 h-4 w-4" />
              Ao Vivo
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
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
                <p className="text-2xl font-bold">R$ {totalCost.toFixed(2)}</p>
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
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id} className="cursor-pointer hover:bg-accent/50">
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
                      <div>
                        <span className="font-mono">{log.phoneNumber}</span>
                        <p className="text-xs text-muted-foreground">{log.date} às {log.timestamp}</p>
                      </div>
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
                  <TableCell>R$ {log.cost.total.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {log.transcript && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleViewTranscription(log)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      {log.status === "completed" && (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <TranscriptionModal 
        open={isTranscriptionOpen} 
        onOpenChange={setIsTranscriptionOpen}
        call={selectedCall}
      />
      
      <LiveVoiceModal 
        open={isLiveVoiceOpen} 
        onOpenChange={setIsLiveVoiceOpen}
      />
    </MainLayout>
  );
};

export default CallLogsPage;
