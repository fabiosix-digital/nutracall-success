import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CreditCard,
  Plus,
  Download,
  Check,
  Zap,
  TrendingUp,
  DollarSign,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  description: string;
  amount: string;
  type: "credit" | "debit";
  date: string;
  status: "completed" | "pending";
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    description: "Recarga de Créditos",
    amount: "R$ 200,00",
    type: "credit",
    date: "02/01/2026",
    status: "completed",
  },
  {
    id: "2",
    description: "Chamadas - Janeiro",
    amount: "R$ 45,80",
    type: "debit",
    date: "01/01/2026",
    status: "completed",
  },
  {
    id: "3",
    description: "Assinatura Pro",
    amount: "R$ 99,00",
    type: "debit",
    date: "01/01/2026",
    status: "completed",
  },
  {
    id: "4",
    description: "Recarga de Créditos",
    amount: "R$ 500,00",
    type: "credit",
    date: "15/12/2025",
    status: "completed",
  },
];

const plans = [
  {
    name: "Starter",
    price: "R$ 49",
    period: "/mês",
    description: "Para pequenas operações",
    features: ["1 Agente IA", "500 minutos/mês", "2 números", "Suporte email"],
    current: false,
  },
  {
    name: "Pro",
    price: "R$ 99",
    period: "/mês",
    description: "Para equipes em crescimento",
    features: [
      "5 Agentes IA",
      "2.000 minutos/mês",
      "10 números",
      "Knowledge Base",
      "Suporte prioritário",
    ],
    current: true,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "R$ 299",
    period: "/mês",
    description: "Para grandes operações",
    features: [
      "Agentes ilimitados",
      "10.000 minutos/mês",
      "Números ilimitados",
      "API completa",
      "Suporte 24/7",
      "SLA garantido",
    ],
    current: false,
  },
];

const BillingPage = () => {
  return (
    <MainLayout title="Planos" description="Gerencie seu plano e assinatura">
      <div className="space-y-6 animate-fade-in">
        {/* Usage Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">R$ 654,20</p>
                  <p className="text-xs text-muted-foreground">Saldo Atual</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                  <Zap className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1,245</p>
                  <p className="text-xs text-muted-foreground">Créditos Restantes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2,000</p>
                  <p className="text-xs text-muted-foreground">Min. Incluídos/Mês</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                  <Calendar className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">15/01</p>
                  <p className="text-xs text-muted-foreground">Próxima Cobrança</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Uso do Mês</CardTitle>
            <CardDescription>Janeiro 2026</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Minutos de Chamada</span>
                <span className="text-muted-foreground">755 / 2.000</span>
              </div>
              <Progress value={37.75} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Agentes Ativos</span>
                <span className="text-muted-foreground">4 / 5</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Números de Telefone</span>
                <span className="text-muted-foreground">4 / 10</span>
              </div>
              <Progress value={40} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Plans */}
        <div>
          <h2 className="mb-4 text-xl font-semibold">Planos</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={cn(
                  "relative transition-all",
                  plan.current && "border-primary shadow-lg shadow-primary/10",
                  plan.popular && "scale-[1.02]"
                )}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2 right-4 gradient-primary">
                    Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-success" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  {plan.current ? (
                    <Button variant="outline" className="w-full" disabled>
                      Plano Atual
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full">
                      Upgrade
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Add Credits */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Adicionar Créditos</CardTitle>
              <CardDescription>Recarregue seus créditos para chamadas</CardDescription>
            </div>
            <Button className="gradient-primary">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Créditos
            </Button>
          </CardHeader>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Histórico de Transações</CardTitle>
              <CardDescription>Suas últimas transações</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Descrição</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.description}
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "font-medium",
                          transaction.type === "credit"
                            ? "text-success"
                            : "text-foreground"
                        )}
                      >
                        {transaction.type === "credit" ? "+" : "-"}
                        {transaction.amount}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          transaction.status === "completed"
                            ? "bg-success/10 text-success border-success/20"
                            : "bg-warning/10 text-warning border-warning/20"
                        )}
                      >
                        {transaction.status === "completed" ? "Concluído" : "Pendente"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {transaction.date}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default BillingPage;
