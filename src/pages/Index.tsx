import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentCallsTable } from "@/components/dashboard/RecentCallsTable";
import { AgentStatusCard } from "@/components/dashboard/AgentStatusCard";
import { CallsChart } from "@/components/dashboard/CallsChart";
import { Phone, Bot, CreditCard, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <MainLayout title="Dashboard">
      <div className="space-y-6 animate-fade-in">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Chamadas Hoje"
            value="156"
            description="62 concluídas, 94 em fila"
            icon={Phone}
            trend={{ value: 12, positive: true }}
          />
          <StatCard
            title="Agentes Ativos"
            value="4"
            description="2 online, 2 em chamada"
            icon={Bot}
          />
          <StatCard
            title="Créditos"
            value="2,450"
            description="De 5,000 mensais"
            icon={CreditCard}
          />
          <StatCard
            title="Taxa de Sucesso"
            value="94.2%"
            description="Chamadas bem-sucedidas"
            icon={TrendingUp}
            trend={{ value: 3.5, positive: true }}
          />
        </div>

        {/* Charts and Tables */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CallsChart />
          </div>
          <AgentStatusCard />
        </div>

        {/* Recent Calls */}
        <RecentCallsTable />
      </div>
    </MainLayout>
  );
};

export default Index;
