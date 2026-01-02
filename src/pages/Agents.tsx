import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MoreVertical, Plus, Play, Pause, Phone as PhoneIcon } from "lucide-react";
import { useState } from "react";
import { TestCallModal } from "@/components/modals/TestCallModal";

interface Agent {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive" | "training";
  type: "vendas" | "suporte" | "cobranca" | "atendimento";
  llmModel: string;
  voiceProvider: string;
  callsToday: number;
  totalCalls: number;
}

const mockAgents: Agent[] = [
  {
    id: "1",
    name: "Suporte Vendas",
    description: "Agente especializado em vendas de suplementos",
    status: "active",
    type: "vendas",
    llmModel: "GPT-4o",
    voiceProvider: "ElevenLabs",
    callsToday: 24,
    totalCalls: 1250,
  },
  {
    id: "2",
    name: "Atendimento Geral",
    description: "Atendimento ao cliente para dúvidas gerais",
    status: "active",
    type: "atendimento",
    llmModel: "Claude 3.5",
    voiceProvider: "ElevenLabs",
    callsToday: 18,
    totalCalls: 890,
  },
  {
    id: "3",
    name: "Nutrição IA",
    description: "Consultor de nutrição automatizado",
    status: "training",
    type: "suporte",
    llmModel: "Gemini Pro",
    voiceProvider: "OpenAI TTS",
    callsToday: 0,
    totalCalls: 0,
  },
  {
    id: "4",
    name: "Cobrança",
    description: "Agente para recuperação de crédito",
    status: "inactive",
    type: "cobranca",
    llmModel: "GPT-4o",
    voiceProvider: "ElevenLabs",
    callsToday: 0,
    totalCalls: 456,
  },
];

const statusLabels: Record<string, string> = {
  active: "Ativo",
  inactive: "Inativo",
  training: "Em Treinamento",
};

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  inactive: "bg-muted text-foreground",
  training: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
};

const typeLabels: Record<string, string> = {
  vendas: "Vendas",
  suporte: "Suporte",
  cobranca: "Cobrança",
  atendimento: "Atendimento",
};

const typeColors: Record<string, string> = {
  vendas: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  suporte: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  cobranca: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  atendimento: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
};

const avatarColors = [
  "bg-primary",
  "bg-secondary",
  "bg-orange-500",
  "bg-green-500",
  "bg-red-500",
  "bg-cyan-500",
  "bg-pink-500",
];

function getAvatarColor(index: number): string {
  return avatarColors[index % avatarColors.length];
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const AgentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isTestCallModalOpen, setIsTestCallModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const handleTestCall = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsTestCallModalOpen(true);
  };

  const filteredAgents = mockAgents.filter((agent) => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "ativo" && agent.status === "active") ||
      (statusFilter === "inativo" && agent.status === "inactive");
    return matchesSearch && matchesStatus;
  });

  return (
    <MainLayout title="Agentes de Voz" description="Gerencie seus agentes de IA">
      <div className="px-3 md:px-6 py-4 md:py-6 overflow-auto bg-background animate-fade-in">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <i className="ri-robot-line text-xl text-primary"></i>
                </div>
                <div>
                  <p className="text-2xl font-bold">{mockAgents.length}</p>
                  <p className="text-xs text-muted-foreground">Total de Agentes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                  <Play className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {mockAgents.filter((a) => a.status === "active").length}
                  </p>
                  <p className="text-xs text-muted-foreground">Ativos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <PhoneIcon className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {mockAgents.reduce((acc, a) => acc + a.callsToday, 0)}
                  </p>
                  <p className="text-xs text-muted-foreground">Chamadas Hoje</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
                  <i className="ri-brain-line text-xl text-yellow-500"></i>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {mockAgents.filter((a) => a.status === "training").length}
                  </p>
                  <p className="text-xs text-muted-foreground">Em Treinamento</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <i className="ri-filter-line mr-2"></i>
                      Status: {statusFilter === "all" ? "Todos" : statusFilter}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setStatusFilter("all")}>Todos</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("ativo")}>Ativos</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("inativo")}>Inativos</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar agente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gradient-primary">
                      <Plus className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Novo Agente</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <i className="ri-robot-line text-primary"></i>
                        Criar Novo Agente
                      </DialogTitle>
                      <DialogDescription>
                        Configure um novo agente IA para atender suas chamadas
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Nome do Agente</Label>
                        <Input id="name" placeholder="Ex: Suporte Vendas" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea
                          id="description"
                          placeholder="Descreva o propósito deste agente..."
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label>Modelo LLM</Label>
                          <Select defaultValue="gpt-4o">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                              <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                              <SelectItem value="claude-3.5">Claude 3.5 Sonnet</SelectItem>
                              <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label>Provedor de Voz</Label>
                          <Select defaultValue="elevenlabs">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="elevenlabs">ElevenLabs</SelectItem>
                              <SelectItem value="openai-tts">OpenAI TTS</SelectItem>
                              <SelectItem value="azure">Azure Speech</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button className="gradient-primary" onClick={() => setIsCreateDialogOpen(false)}>
                        Criar Agente
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Agents Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agente</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Modelo LLM</TableHead>
                  <TableHead className="text-right">Chamadas</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgents.map((agent, index) => (
                  <TableRow key={agent.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full text-white font-medium ${getAvatarColor(index)}`}>
                          {getInitials(agent.name)}
                        </div>
                        <div>
                          <p className="font-medium">{agent.name}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1 max-w-[250px]">
                            {agent.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={typeColors[agent.type]}>
                        {typeLabels[agent.type]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[agent.status]}>
                        {statusLabels[agent.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <i className="ri-brain-line text-muted-foreground"></i>
                        <span className="text-sm">{agent.llmModel}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div>
                        <p className="font-medium">{agent.callsToday} hoje</p>
                        <p className="text-xs text-muted-foreground">
                          {agent.totalCalls.toLocaleString()} total
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <i className="ri-edit-line mr-2"></i>
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleTestCall(agent)}>
                            <i className="ri-phone-line mr-2"></i>
                            Testar Ligação
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {agent.status === "active" ? (
                              <>
                                <Pause className="h-4 w-4 mr-2" />
                                Desativar
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4 mr-2" />
                                Ativar
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <i className="ri-delete-bin-line mr-2"></i>
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <TestCallModal
        open={isTestCallModalOpen}
        onOpenChange={setIsTestCallModalOpen}
        agentId={selectedAgent?.id}
        agentName={selectedAgent?.name}
      />
    </MainLayout>
  );
};

export default AgentsPage;
