import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  Plus,
  Search,
  FileText,
  Upload,
  MoreHorizontal,
  Edit,
  Trash2,
  Bot,
  File,
  Link,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface KnowledgeBase {
  id: string;
  name: string;
  description: string;
  documentsCount: number;
  totalSize: string;
  lastUpdated: string;
  assignedAgents: string[];
  status: "ready" | "processing" | "error";
}

const mockKnowledgeBases: KnowledgeBase[] = [
  {
    id: "1",
    name: "Suplementos e Vitaminas",
    description: "Base de conhecimento sobre suplementos alimentares, vitaminas e minerais",
    documentsCount: 45,
    totalSize: "12.5 MB",
    lastUpdated: "Há 2 horas",
    assignedAgents: ["Suporte Vendas", "Nutrição IA"],
    status: "ready",
  },
  {
    id: "2",
    name: "Políticas da Empresa",
    description: "Documentos sobre políticas internas, trocas e devoluções",
    documentsCount: 12,
    totalSize: "3.2 MB",
    lastUpdated: "Há 1 dia",
    assignedAgents: ["Atendimento Geral"],
    status: "ready",
  },
  {
    id: "3",
    name: "Catálogo de Produtos",
    description: "Lista completa de produtos com preços e especificações",
    documentsCount: 156,
    totalSize: "45.8 MB",
    lastUpdated: "Há 5 min",
    assignedAgents: ["Suporte Vendas"],
    status: "processing",
  },
  {
    id: "4",
    name: "FAQ Nutrição",
    description: "Perguntas frequentes sobre nutrição e alimentação saudável",
    documentsCount: 89,
    totalSize: "8.1 MB",
    lastUpdated: "Há 3 dias",
    assignedAgents: [],
    status: "ready",
  },
];

const statusConfig = {
  ready: { label: "Pronto", className: "bg-success/10 text-success border-success/20" },
  processing: { label: "Processando", className: "bg-warning/10 text-warning border-warning/20" },
  error: { label: "Erro", className: "bg-destructive/10 text-destructive border-destructive/20" },
};

const KnowledgeBasePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredBases = mockKnowledgeBases.filter((kb) =>
    kb.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout title="Knowledge Base">
      <div className="space-y-6 animate-fade-in">
        {/* Header Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar base de conhecimento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:w-80"
            />
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary">
                <Plus className="mr-2 h-4 w-4" />
                Nova Base
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Criar Knowledge Base
                </DialogTitle>
                <DialogDescription>
                  Crie uma nova base de conhecimento para seus agentes
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" placeholder="Ex: FAQ Produtos" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva o conteúdo desta base..."
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Upload de Documentos</Label>
                  <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border p-8 transition-colors hover:border-primary/50">
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Arraste arquivos ou clique para selecionar
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, TXT, DOCX, MD (máx. 50MB)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button className="gradient-primary" onClick={() => setIsCreateDialogOpen(false)}>
                  Criar Base
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
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockKnowledgeBases.length}</p>
                <p className="text-xs text-muted-foreground">Bases de Conhecimento</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                <FileText className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockKnowledgeBases.reduce((acc, kb) => acc + kb.documentsCount, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Documentos</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <Bot className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {new Set(mockKnowledgeBases.flatMap((kb) => kb.assignedAgents)).size}
                </p>
                <p className="text-xs text-muted-foreground">Agentes Conectados</p>
              </div>
            </div>
          </div>
        </div>

        {/* Knowledge Base Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredBases.map((kb) => (
            <Card key={kb.id} className="group transition-all hover:shadow-lg hover:shadow-primary/5">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <BookOpen className="h-5 w-5" />
                  </div>
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
                        <Upload className="mr-2 h-4 w-4" />
                        Adicionar Documentos
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link className="mr-2 h-4 w-4" />
                        Associar Agentes
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className="mt-3 text-lg">{kb.name}</CardTitle>
                <CardDescription className="line-clamp-2">{kb.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <File className="h-4 w-4" />
                      {kb.documentsCount} documentos
                    </div>
                    <span className="text-muted-foreground">{kb.totalSize}</span>
                  </div>
                  {kb.status === "processing" && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Processando...</span>
                        <span className="text-muted-foreground">67%</span>
                      </div>
                      <Progress value={67} className="h-1" />
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t pt-3">
                <Badge
                  variant="outline"
                  className={cn("font-medium", statusConfig[kb.status].className)}
                >
                  {statusConfig[kb.status].label}
                </Badge>
                <span className="text-xs text-muted-foreground">{kb.lastUpdated}</span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default KnowledgeBasePage;
