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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  Mail,
  UserCheck,
  UserX,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Employee {
  id: string;
  name: string;
  email: string;
  role: "admin" | "operator" | "viewer";
  status: "active" | "inactive";
  lastActive: string;
  createdAt: string;
}

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Admin Principal",
    email: "admin@nutracall.com",
    role: "admin",
    status: "active",
    lastActive: "Agora",
    createdAt: "01/01/2024",
  },
  {
    id: "2",
    name: "Carlos Operador",
    email: "carlos@nutracall.com",
    role: "operator",
    status: "active",
    lastActive: "Há 5 min",
    createdAt: "15/02/2024",
  },
  {
    id: "3",
    name: "Maria Suporte",
    email: "maria@nutracall.com",
    role: "operator",
    status: "active",
    lastActive: "Há 1 hora",
    createdAt: "20/03/2024",
  },
  {
    id: "4",
    name: "João Visualizador",
    email: "joao@nutracall.com",
    role: "viewer",
    status: "inactive",
    lastActive: "Há 3 dias",
    createdAt: "10/04/2024",
  },
];

const roleConfig = {
  admin: { label: "Administrador", className: "bg-destructive/10 text-destructive border-destructive/20" },
  operator: { label: "Operador", className: "bg-primary/10 text-primary border-primary/20" },
  viewer: { label: "Visualizador", className: "bg-muted text-muted-foreground border-muted" },
};

const statusConfig = {
  active: { label: "Ativo", className: "bg-success/10 text-success border-success/20" },
  inactive: { label: "Inativo", className: "bg-muted text-muted-foreground border-muted" },
};

const EmployeesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredEmployees = mockEmployees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout title="Funcionários" description="Gerencie funcionários e permissões">
      <div className="space-y-6 animate-fade-in">
        {/* Header Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar funcionário..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:w-80"
            />
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Funcionário
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Adicionar Funcionário
                </DialogTitle>
                <DialogDescription>
                  Convide um novo membro para a equipe
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" placeholder="Nome completo" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@empresa.com" />
                </div>
                <div className="grid gap-2">
                  <Label>Função</Label>
                  <Select defaultValue="operator">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="operator">Operador</SelectItem>
                      <SelectItem value="viewer">Visualizador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button className="gradient-primary" onClick={() => setIsAddDialogOpen(false)}>
                  Enviar Convite
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
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockEmployees.length}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <UserCheck className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockEmployees.filter((e) => e.status === "active").length}
                </p>
                <p className="text-xs text-muted-foreground">Ativos</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                <Shield className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockEmployees.filter((e) => e.role === "admin").length}
                </p>
                <p className="text-xs text-muted-foreground">Admins</p>
              </div>
            </div>
          </div>
        </div>

        {/* Employees Table */}
        <div className="rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Funcionário</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Última Atividade</TableHead>
                <TableHead className="text-right">Criado em</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id} className="group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {employee.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {employee.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn("font-medium", roleConfig[employee.role].className)}
                    >
                      {roleConfig[employee.role].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn("font-medium", statusConfig[employee.status].className)}
                    >
                      {statusConfig[employee.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {employee.lastActive}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {employee.createdAt}
                  </TableCell>
                  <TableCell>
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
                          <Shield className="mr-2 h-4 w-4" />
                          Alterar Permissões
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          {employee.status === "active" ? (
                            <>
                              <UserX className="mr-2 h-4 w-4" />
                              Desativar
                            </>
                          ) : (
                            <>
                              <UserCheck className="mr-2 h-4 w-4" />
                              Ativar
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remover
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
};

export default EmployeesPage;
