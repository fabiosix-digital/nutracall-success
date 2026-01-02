import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Zap,
  Plus,
  Mail,
  MessageSquare,
  Bell,
  Clock,
  Edit,
  Trash2,
  MoreHorizontal,
  Play,
  Pause,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Automation {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  status: "active" | "inactive";
  executionsToday: number;
  lastRun: string;
}

const mockAutomations: Automation[] = [
  {
    id: "1",
    name: "Confirmação de Pedido",
    description: "Envia email de confirmação quando um pedido é criado via agente IA",
    trigger: "Novo Pedido",
    action: "Enviar Email",
    status: "active",
    executionsToday: 23,
    lastRun: "Há 5 min",
  },
  {
    id: "2",
    name: "Notificação de Chamada Perdida",
    description: "Notifica o administrador quando uma chamada é perdida",
    trigger: "Chamada Perdida",
    action: "Notificação Push",
    status: "active",
    executionsToday: 3,
    lastRun: "Há 2 horas",
  },
  {
    id: "3",
    name: "Follow-up Automático",
    description: "Envia SMS de follow-up 24h após uma consulta realizada",
    trigger: "Após Consulta",
    action: "Enviar SMS",
    status: "inactive",
    executionsToday: 0,
    lastRun: "Há 3 dias",
  },
  {
    id: "4",
    name: "Alerta de Estoque Baixo",
    description: "Notifica quando um produto está com estoque abaixo de 10 unidades",
    trigger: "Estoque Baixo",
    action: "Enviar Email",
    status: "active",
    executionsToday: 1,
    lastRun: "Há 6 horas",
  },
];

const actionIcons = {
  "Enviar Email": Mail,
  "Enviar SMS": MessageSquare,
  "Notificação Push": Bell,
};

const AutomationsPage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <MainLayout title="Automação de Ligações" description="Agende e gerencie ligações automáticas">
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-muted-foreground">
              Configure automações para tarefas repetitivas
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary">
                <Plus className="mr-2 h-4 w-4" />
                Nova Automação
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Criar Automação
                </DialogTitle>
                <DialogDescription>
                  Configure uma nova automação para seu sistema
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" placeholder="Ex: Confirmação de Pedido" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva o que esta automação faz..."
                    rows={2}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Gatilho (Quando executar)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o gatilho" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new_order">Novo Pedido</SelectItem>
                      <SelectItem value="missed_call">Chamada Perdida</SelectItem>
                      <SelectItem value="after_call">Após Chamada</SelectItem>
                      <SelectItem value="low_stock">Estoque Baixo</SelectItem>
                      <SelectItem value="scheduled">Agendado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Ação (O que fazer)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a ação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="send_email">Enviar Email</SelectItem>
                      <SelectItem value="send_sms">Enviar SMS</SelectItem>
                      <SelectItem value="push_notification">Notificação Push</SelectItem>
                      <SelectItem value="webhook">Chamar Webhook</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button className="gradient-primary" onClick={() => setIsCreateDialogOpen(false)}>
                  Criar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockAutomations.length}</p>
                <p className="text-xs text-muted-foreground">Total de Automações</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <Play className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockAutomations.filter((a) => a.status === "active").length}
                </p>
                <p className="text-xs text-muted-foreground">Ativas</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                <Clock className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockAutomations.reduce((acc, a) => acc + a.executionsToday, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Execuções Hoje</p>
              </div>
            </div>
          </div>
        </div>

        {/* Automations Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {mockAutomations.map((automation) => {
            const ActionIcon = actionIcons[automation.action as keyof typeof actionIcons] || Zap;
            return (
              <Card key={automation.id} className="group transition-all hover:shadow-lg hover:shadow-primary/5">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <ActionIcon className="h-5 w-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={automation.status === "active"} />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {automation.status === "active" ? (
                              <>
                                <Pause className="mr-2 h-4 w-4" />
                                Pausar
                              </>
                            ) : (
                              <>
                                <Play className="mr-2 h-4 w-4" />
                                Ativar
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <CardTitle className="mt-3 text-lg">{automation.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {automation.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      <Zap className="mr-1 h-3 w-3" />
                      {automation.trigger}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <ActionIcon className="mr-1 h-3 w-3" />
                      {automation.action}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t pt-3">
                  <div className="text-sm">
                    <span className="font-medium">{automation.executionsToday}</span>
                    <span className="text-muted-foreground"> execuções hoje</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Última: {automation.lastRun}
                  </span>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};

export default AutomationsPage;
