import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreVertical, Plus, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";

interface Objection {
  id: string;
  text: string;
  category: string;
  count: number;
  trend: "up" | "down" | "stable";
  trendPercent: number;
  lastOccurrence: string;
}

const mockObjections: Objection[] = [
  {
    id: "1",
    text: "Está muito caro",
    category: "Preço",
    count: 156,
    trend: "up",
    trendPercent: 12,
    lastOccurrence: "Há 5 min",
  },
  {
    id: "2",
    text: "Preciso pensar",
    category: "Decisão",
    count: 134,
    trend: "stable",
    trendPercent: 0,
    lastOccurrence: "Há 15 min",
  },
  {
    id: "3",
    text: "Já uso outro produto",
    category: "Concorrência",
    count: 98,
    trend: "down",
    trendPercent: 8,
    lastOccurrence: "Há 30 min",
  },
  {
    id: "4",
    text: "Não tenho tempo agora",
    category: "Tempo",
    count: 87,
    trend: "up",
    trendPercent: 5,
    lastOccurrence: "Há 1h",
  },
  {
    id: "5",
    text: "Preciso consultar meu médico",
    category: "Saúde",
    count: 65,
    trend: "stable",
    trendPercent: 0,
    lastOccurrence: "Há 2h",
  },
  {
    id: "6",
    text: "Não conheço a marca",
    category: "Confiança",
    count: 54,
    trend: "down",
    trendPercent: 15,
    lastOccurrence: "Há 3h",
  },
];

const categoryColors: Record<string, string> = {
  "Preço": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  "Decisão": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "Concorrência": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "Tempo": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "Saúde": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "Confiança": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
};

const AnalyticsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredObjections = mockObjections.filter((obj) =>
    obj.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalObjections = mockObjections.reduce((acc, obj) => acc + obj.count, 0);
  const topCategory = "Preço";

  return (
    <MainLayout title="Analytics de Objeções" description="Análise inteligente de objeções detectadas pela IA">
      <div className="px-3 md:px-6 py-4 md:py-6 overflow-auto bg-background animate-fade-in">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <i className="ri-bar-chart-line text-xl text-primary"></i>
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalObjections}</p>
                  <p className="text-xs text-muted-foreground">Total de Objeções</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                  <i className="ri-fire-line text-xl text-red-500"></i>
                </div>
                <div>
                  <p className="text-2xl font-bold">{mockObjections.length}</p>
                  <p className="text-xs text-muted-foreground">Tipos Únicos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
                  <i className="ri-trophy-line text-xl text-yellow-500"></i>
                </div>
                <div>
                  <p className="text-2xl font-bold">{topCategory}</p>
                  <p className="text-xs text-muted-foreground">Top Categoria</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                  <i className="ri-percent-line text-xl text-green-500"></i>
                </div>
                <div>
                  <p className="text-2xl font-bold">68%</p>
                  <p className="text-xs text-muted-foreground">Taxa de Resolução</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="relative flex-1 sm:w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar objeção..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button className="gradient-primary">
                <i className="ri-download-line mr-2"></i>
                Exportar Relatório
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Objections List */}
        <div className="space-y-3">
          {filteredObjections.map((objection, index) => (
            <Card key={objection.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-lg font-bold">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-medium">"{objection.text}"</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={categoryColors[objection.category]}>
                          {objection.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Última: {objection.lastOccurrence}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-2xl font-bold">{objection.count}</p>
                      <div className="flex items-center gap-1 justify-end">
                        {objection.trend === "up" && (
                          <>
                            <TrendingUp className="h-4 w-4 text-red-500" />
                            <span className="text-xs text-red-500">+{objection.trendPercent}%</span>
                          </>
                        )}
                        {objection.trend === "down" && (
                          <>
                            <TrendingDown className="h-4 w-4 text-green-500" />
                            <span className="text-xs text-green-500">-{objection.trendPercent}%</span>
                          </>
                        )}
                        {objection.trend === "stable" && (
                          <span className="text-xs text-muted-foreground">Estável</span>
                        )}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <i className="ri-eye-line mr-2"></i>
                          Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <i className="ri-lightbulb-line mr-2"></i>
                          Ver Respostas Sugeridas
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default AnalyticsPage;
