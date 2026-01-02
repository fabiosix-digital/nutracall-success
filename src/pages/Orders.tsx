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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShoppingCart,
  Search,
  MoreHorizontal,
  Eye,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Package,
  Filter,
  Download,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  products: string[];
  total: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "paid" | "pending" | "failed";
  createdAt: string;
  agentName: string;
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "#1234",
    customerName: "João Silva",
    customerPhone: "+55 11 99999-1234",
    products: ["Whey Protein 900g", "Creatina 300g"],
    total: "R$ 269,80",
    status: "delivered",
    paymentStatus: "paid",
    createdAt: "02/01/2026 14:32",
    agentName: "Suporte Vendas",
  },
  {
    id: "2",
    orderNumber: "#1235",
    customerName: "Maria Santos",
    customerPhone: "+55 21 88888-5678",
    products: ["Multivitamínico Complete"],
    total: "R$ 49,90",
    status: "shipped",
    paymentStatus: "paid",
    createdAt: "02/01/2026 13:15",
    agentName: "Atendimento Geral",
  },
  {
    id: "3",
    orderNumber: "#1236",
    customerName: "Pedro Costa",
    customerPhone: "+55 31 77777-9012",
    products: ["BCAA 2:1:1", "Ômega 3"],
    total: "R$ 129,80",
    status: "processing",
    paymentStatus: "paid",
    createdAt: "02/01/2026 11:45",
    agentName: "Suporte Vendas",
  },
  {
    id: "4",
    orderNumber: "#1237",
    customerName: "Ana Lima",
    customerPhone: "+55 41 66666-3456",
    products: ["Whey Protein 900g"],
    total: "R$ 189,90",
    status: "pending",
    paymentStatus: "pending",
    createdAt: "02/01/2026 10:20",
    agentName: "Nutrição IA",
  },
  {
    id: "5",
    orderNumber: "#1238",
    customerName: "Carlos Souza",
    customerPhone: "+55 51 55555-7890",
    products: ["Creatina 300g"],
    total: "R$ 79,90",
    status: "cancelled",
    paymentStatus: "failed",
    createdAt: "01/01/2026 16:30",
    agentName: "Suporte Vendas",
  },
];

const statusConfig = {
  pending: { label: "Pendente", icon: Clock, className: "bg-warning/10 text-warning border-warning/20" },
  processing: { label: "Processando", icon: Package, className: "bg-primary/10 text-primary border-primary/20" },
  shipped: { label: "Enviado", icon: Truck, className: "bg-secondary/10 text-secondary border-secondary/20" },
  delivered: { label: "Entregue", icon: CheckCircle, className: "bg-success/10 text-success border-success/20" },
  cancelled: { label: "Cancelado", icon: XCircle, className: "bg-destructive/10 text-destructive border-destructive/20" },
};

const paymentStatusConfig = {
  paid: { label: "Pago", className: "bg-success/10 text-success border-success/20" },
  pending: { label: "Pendente", className: "bg-warning/10 text-warning border-warning/20" },
  failed: { label: "Falhou", className: "bg-destructive/10 text-destructive border-destructive/20" },
};

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <MainLayout title="Gerenciador de Pedidos" description="Resumo completo dos pedidos gerados pelas ligações">
      <div className="space-y-6 animate-fade-in">
        {/* Header Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar pedido ou cliente..."
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
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="processing">Processando</SelectItem>
                <SelectItem value="shipped">Enviados</SelectItem>
                <SelectItem value="delivered">Entregues</SelectItem>
                <SelectItem value="cancelled">Cancelados</SelectItem>
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
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockOrders.length}</p>
                <p className="text-xs text-muted-foreground">Total de Pedidos</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockOrders.filter((o) => o.status === "pending" || o.status === "processing").length}
                </p>
                <p className="text-xs text-muted-foreground">Aguardando</p>
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
                  {mockOrders.filter((o) => o.status === "delivered").length}
                </p>
                <p className="text-xs text-muted-foreground">Entregues</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                <Truck className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockOrders.filter((o) => o.status === "shipped").length}
                </p>
                <p className="text-xs text-muted-foreground">Em Trânsito</p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Produtos</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Pagamento</TableHead>
                <TableHead className="text-right">Data</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => {
                const StatusIcon = statusConfig[order.status].icon;
                return (
                  <TableRow key={order.id} className="group">
                    <TableCell>
                      <span className="font-mono font-medium">{order.orderNumber}</span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-xs text-muted-foreground">{order.customerPhone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px]">
                        <p className="text-sm truncate">{order.products.join(", ")}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.products.length} item(s)
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{order.total}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn("font-medium", statusConfig[order.status].className)}
                      >
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {statusConfig[order.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn("font-medium", paymentStatusConfig[order.paymentStatus].className)}
                      >
                        {paymentStatusConfig[order.paymentStatus].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {order.createdAt}
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
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Truck className="mr-2 h-4 w-4" />
                            Atualizar Status
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancelar Pedido
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrdersPage;
