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
  Phone,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Link,
  Unlink,
  Globe,
  CheckCircle,
  XCircle,
  Download,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ImportNumberModal } from "@/components/modals/ImportNumberModal";

interface PhoneNumber {
  id: string;
  number: string;
  country: string;
  provider: string;
  status: "active" | "inactive" | "pending";
  assignedAgent: string | null;
  callsThisMonth: number;
}

const mockPhoneNumbers: PhoneNumber[] = [
  {
    id: "1",
    number: "+55 11 4000-1234",
    country: "Brasil",
    provider: "Twilio",
    status: "active",
    assignedAgent: "Suporte Vendas",
    callsThisMonth: 456,
  },
  {
    id: "2",
    number: "+55 21 4000-5678",
    country: "Brasil",
    provider: "Vonage",
    status: "active",
    assignedAgent: "Atendimento Geral",
    callsThisMonth: 312,
  },
  {
    id: "3",
    number: "+55 31 4000-9012",
    country: "Brasil",
    provider: "Twilio",
    status: "pending",
    assignedAgent: null,
    callsThisMonth: 0,
  },
  {
    id: "4",
    number: "+1 415 555-0123",
    country: "EUA",
    provider: "Twilio",
    status: "inactive",
    assignedAgent: null,
    callsThisMonth: 0,
  },
];

const statusConfig = {
  active: { label: "Ativo", icon: CheckCircle, className: "bg-success/10 text-success border-success/20" },
  inactive: { label: "Inativo", icon: XCircle, className: "bg-muted text-muted-foreground border-muted" },
  pending: { label: "Pendente", icon: Globe, className: "bg-warning/10 text-warning border-warning/20" },
};

const PhoneNumbersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const filteredNumbers = mockPhoneNumbers.filter((phone) =>
    phone.number.includes(searchTerm)
  );

  return (
    <MainLayout title="Números de Telefone" description="Gerencie seus números de telefone">
      <div className="space-y-6 animate-fade-in">
        {/* Header Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar número..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:w-80"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button className="gradient-primary" onClick={() => setIsImportModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Número
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockPhoneNumbers.length}</p>
                <p className="text-xs text-muted-foreground">Total de Números</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockPhoneNumbers.filter((p) => p.status === "active").length}
                </p>
                <p className="text-xs text-muted-foreground">Ativos</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                <Link className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockPhoneNumbers.filter((p) => p.assignedAgent).length}
                </p>
                <p className="text-xs text-muted-foreground">Associados a Agentes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Número</TableHead>
                <TableHead>País</TableHead>
                <TableHead>Provedor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Agente Associado</TableHead>
                <TableHead className="text-right">Chamadas/Mês</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNumbers.map((phone) => (
                <TableRow key={phone.id} className="group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Phone className="h-5 w-5" />
                      </div>
                      <span className="font-mono font-medium">{phone.number}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      {phone.country}
                    </div>
                  </TableCell>
                  <TableCell>{phone.provider}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn("font-medium", statusConfig[phone.status].className)}
                    >
                      {statusConfig[phone.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {phone.assignedAgent ? (
                      <span className="text-sm">{phone.assignedAgent}</span>
                    ) : (
                      <span className="text-sm text-muted-foreground">Não associado</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {phone.callsThisMonth.toLocaleString()}
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
                          {phone.assignedAgent ? (
                            <>
                              <Unlink className="mr-2 h-4 w-4" />
                              Desassociar Agente
                            </>
                          ) : (
                            <>
                              <Link className="mr-2 h-4 w-4" />
                              Associar Agente
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

      <ImportNumberModal open={isImportModalOpen} onOpenChange={setIsImportModalOpen} />
    </MainLayout>
  );
};

export default PhoneNumbersPage;
