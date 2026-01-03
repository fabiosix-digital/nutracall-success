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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Search, RefreshCw, Plus, Play, Trash2, Edit, List, LayoutGrid } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TestCallModal } from "@/components/modals/TestCallModal";

interface Agent {
  id: string;
  name: string;
  llmModel: string;
  voiceProvider: string;
  status: "active" | "inactive";
  lastUpdate: string;
}

const mockAgents: Agent[] = [
  {
    id: "1",
    name: "ygor",
    llmModel: "GPT-4o",
    voiceProvider: "OpenAI",
    status: "inactive",
    lastUpdate: "12/12/2025, 17:27:53",
  },
];

const statusLabels: Record<string, string> = {
  active: "Ativo",
  inactive: "Inativo",
};

const avatarColors = [
  "bg-yellow-500",
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
    .slice(0, 1);
}

const AgentsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [isTestCallModalOpen, setIsTestCallModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [agents, setAgents] = useState<Agent[]>(mockAgents);

  const handleTestCall = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsTestCallModalOpen(true);
  };

  const handleToggleStatus = (agentId: string) => {
    setAgents(agents.map(agent => 
      agent.id === agentId 
        ? { ...agent, status: agent.status === "active" ? "inactive" : "active" }
        : agent
    ));
  };

  const filteredAgents = agents.filter((agent) => {
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
        {/* Filters Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                {/* Filtrar por Status */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">Filtrar:</span>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[160px] bg-muted/50">
                      <SelectValue placeholder="Todos os Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Status</SelectItem>
                      <SelectItem value="ativo">Ativos</SelectItem>
                      <SelectItem value="inativo">Inativos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Filtrar por Tipo */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">Tipo:</span>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[160px] bg-muted/50">
                      <SelectValue placeholder="Todos os Tipos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Tipos</SelectItem>
                      <SelectItem value="vendas">Vendas</SelectItem>
                      <SelectItem value="suporte">Suporte</SelectItem>
                      <SelectItem value="cobranca">Cobrança</SelectItem>
                      <SelectItem value="atendimento">Atendimento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar agentes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 bg-muted/50"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* View Toggle */}
                <div className="flex items-center border rounded-lg p-1">
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode("grid")}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                </div>

                {/* Sync Button */}
                <Button variant="outline" className="text-primary border-primary hover:bg-primary/10">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sincronizar Todos
                </Button>

                {/* Create Button */}
                <Button className="gradient-primary" onClick={() => navigate("/agents/create")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Novo Agente
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Agents Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-muted-foreground font-medium">NOME DO AGENTE</TableHead>
                  <TableHead className="text-muted-foreground font-medium">MODELO IA</TableHead>
                  <TableHead className="text-muted-foreground font-medium">STATUS</TableHead>
                  <TableHead className="text-muted-foreground font-medium">ÚLTIMA ATUALIZAÇÃO</TableHead>
                  <TableHead className="text-muted-foreground font-medium text-right">AÇÕES</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgents.map((agent, index) => (
                  <TableRow key={agent.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full text-white font-medium ${getAvatarColor(index)}`}>
                          {getInitials(agent.name)}
                        </div>
                        <span className="font-medium">{agent.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{agent.llmModel} {agent.voiceProvider}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-muted/50">
                        {statusLabels[agent.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{agent.lastUpdate}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Switch
                          checked={agent.status === "active"}
                          onCheckedChange={() => handleToggleStatus(agent.id)}
                        />
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(`/agents/edit/${agent.id}`)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleTestCall(agent)}>
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t">
              <span className="text-sm text-muted-foreground">
                Mostrando {filteredAgents.length} de {agents.length} agentes
              </span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="default" size="sm" className="h-8 w-8 p-0">
                  1
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Próximo
                </Button>
              </div>
            </div>
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
