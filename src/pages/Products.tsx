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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Package,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  DollarSign,
  Tag,
  Archive,
  Eye,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  stock: number;
  status: "active" | "inactive" | "out_of_stock";
  salesCount: number;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Whey Protein Isolado 900g",
    description: "Proteína isolada de alta qualidade, 27g proteína por dose",
    price: "R$ 189,90",
    category: "Proteínas",
    stock: 45,
    status: "active",
    salesCount: 234,
  },
  {
    id: "2",
    name: "Creatina Monohidratada 300g",
    description: "Creatina pura para aumento de força e performance",
    price: "R$ 79,90",
    category: "Aminoácidos",
    stock: 120,
    status: "active",
    salesCount: 456,
  },
  {
    id: "3",
    name: "Multivitamínico Complete",
    description: "Complexo vitamínico com 23 nutrientes essenciais",
    price: "R$ 49,90",
    category: "Vitaminas",
    stock: 0,
    status: "out_of_stock",
    salesCount: 189,
  },
  {
    id: "4",
    name: "BCAA 2:1:1 - 120 cápsulas",
    description: "Aminoácidos de cadeia ramificada para recuperação muscular",
    price: "R$ 69,90",
    category: "Aminoácidos",
    stock: 67,
    status: "active",
    salesCount: 312,
  },
  {
    id: "5",
    name: "Ômega 3 - 120 cápsulas",
    description: "Óleo de peixe com EPA e DHA para saúde cardiovascular",
    price: "R$ 59,90",
    category: "Vitaminas",
    stock: 89,
    status: "inactive",
    salesCount: 145,
  },
];

const statusConfig = {
  active: { label: "Ativo", className: "bg-success/10 text-success border-success/20" },
  inactive: { label: "Inativo", className: "bg-muted text-muted-foreground border-muted" },
  out_of_stock: { label: "Sem Estoque", className: "bg-destructive/10 text-destructive border-destructive/20" },
};

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout title="Gerenciador de Produtos" description="Catálogo de produtos sincronizado">
      <div className="space-y-6 animate-fade-in">
        {/* Header Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:w-80"
            />
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary">
                <Plus className="mr-2 h-4 w-4" />
                Novo Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Adicionar Produto
                </DialogTitle>
                <DialogDescription>
                  Cadastre um novo produto no catálogo
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome do Produto</Label>
                  <Input id="name" placeholder="Ex: Whey Protein 900g" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva o produto..."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="price">Preço</Label>
                    <Input id="price" placeholder="R$ 0,00" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Categoria</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="proteinas">Proteínas</SelectItem>
                        <SelectItem value="aminoacidos">Aminoácidos</SelectItem>
                        <SelectItem value="vitaminas">Vitaminas</SelectItem>
                        <SelectItem value="pre-treino">Pré-Treino</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stock">Estoque Inicial</Label>
                  <Input id="stock" type="number" placeholder="0" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button className="gradient-primary" onClick={() => setIsCreateDialogOpen(false)}>
                  Adicionar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockProducts.length}</p>
                <p className="text-xs text-muted-foreground">Total de Produtos</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <Tag className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockProducts.filter((p) => p.status === "active").length}
                </p>
                <p className="text-xs text-muted-foreground">Ativos</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                <DollarSign className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockProducts.reduce((acc, p) => acc + p.salesCount, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Vendas Total</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                <Archive className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockProducts.filter((p) => p.status === "out_of_stock").length}
                </p>
                <p className="text-xs text-muted-foreground">Sem Estoque</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Estoque</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Vendas</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Package className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1 max-w-[250px]">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{product.price}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "font-medium",
                        product.stock === 0 && "text-destructive",
                        product.stock > 0 && product.stock < 20 && "text-warning"
                      )}
                    >
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn("font-medium", statusConfig[product.status].className)}
                    >
                      {statusConfig[product.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {product.salesCount}
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
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
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

export default ProductsPage;
