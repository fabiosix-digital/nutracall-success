import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertTriangle } from "lucide-react";

interface MenuItem {
  title: string;
  url: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  { title: "Dashboard", url: "/", icon: "ri-dashboard-line" },
  { title: "Agentes de Voz", url: "/agents", icon: "ri-mic-line" },
  { title: "Biblioteca de Vozes", url: "/voices", icon: "ri-volume-up-line" },
  { title: "Números de Telefone", url: "/phone-numbers", icon: "ri-phone-line" },
  { title: "Base de Conhecimento", url: "/knowledge-base", icon: "ri-book-line" },
  { title: "Histórico de Ligações", url: "/call-logs", icon: "ri-history-line" },
  { title: "Automação de Ligações", url: "/automations", icon: "ri-robot-line" },
  { title: "Gerenciador de Pedidos", url: "/orders", icon: "ri-shopping-cart-line" },
  { title: "Gerenciador de Produtos", url: "/products", icon: "ri-price-tag-3-line" },
  { title: "Analytics de Objeções", url: "/analytics", icon: "ri-bar-chart-line" },
  { title: "Funcionários", url: "/employees", icon: "ri-team-line" },
  { title: "Planos", url: "/billing", icon: "ri-vip-crown-line" },
];

export function AppSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  // Mock credits data
  const currentCredits = 25000;
  const totalCredits = 50000;
  const percentage = (currentCredits / totalCredits) * 100;
  const isUnlimited = false;

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarContent>
        <SidebarGroup className="pt-0 pb-0">
          <div className="px-3 py-3 border-b flex items-center justify-center min-h-[70px]">
            {isCollapsed ? (
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <i className="ri-phone-line text-xl"></i>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <i className="ri-phone-line text-lg"></i>
                </div>
                <span className="text-xl font-bold gradient-text">NutraCall</span>
              </div>
            )}
          </div>
        </SidebarGroup>

        <SidebarGroup className="pt-4">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === item.url}
                        className={`flex items-center gap-2 px-5 pt-[17px] pb-[17px] rounded-lg cursor-pointer transition-colors ${
                          location.pathname === item.url
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-primary hover:text-white"
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-2 w-full">
                          <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                            <i className={`${item.icon} text-lg`}></i>
                          </div>
                          {!isCollapsed && <span className="text-sm">{item.title}</span>}
                        </Link>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent side="right">
                        <span>{item.title}</span>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname.startsWith("/settings")}
                      className={`flex items-center gap-2 px-5 pt-[17px] pb-[17px] rounded-lg cursor-pointer transition-colors ${
                        location.pathname.startsWith("/settings")
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-primary hover:text-white"
                      }`}
                    >
                      <Link to="/settings" className="flex items-center gap-2">
                        <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                          <i className="ri-settings-line text-lg"></i>
                        </div>
                        {!isCollapsed && <span className="text-sm">Configurações</span>}
                      </Link>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">Configurações</TooltipContent>
                  )}
                </Tooltip>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t group-data-[collapsible=icon]:p-2">
        {isCollapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/billing">
                <Button
                  size="icon"
                  className={`w-full ${!isUnlimited && currentCredits <= 0 ? 'bg-red-500 hover:bg-red-600' : isUnlimited ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
                >
                  {isUnlimited ? (
                    <i className="ri-infinity-line text-xl"></i>
                  ) : currentCredits <= 0 ? (
                    <AlertTriangle className="h-5 w-5" />
                  ) : (
                    <i className="ri-shopping-cart-line text-xl"></i>
                  )}
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              {isUnlimited
                ? "Plano Ilimitado"
                : currentCredits <= 0
                  ? "Créditos esgotados! Clique para comprar"
                  : `R$ ${(currentCredits / 100).toFixed(2)} / R$ ${(totalCredits / 100).toFixed(2)}`
              }
            </TooltipContent>
          </Tooltip>
        ) : (
          <div className={`rounded-lg p-4 ${isUnlimited ? 'bg-purple-600/20 border border-purple-500/50' : currentCredits <= 0 ? 'bg-red-500/20 border border-red-500/50' : 'bg-accent/50'}`}>
            {isUnlimited ? (
              <>
                <div className="flex items-center gap-2 text-purple-400 mb-2">
                  <i className="ri-infinity-line text-lg"></i>
                  <span className="text-xs font-medium">Plano Ilimitado</span>
                </div>
                <div className="text-xs text-muted-foreground mb-1">Uso de créditos</div>
                <div className="text-sm font-medium mb-2 text-purple-300">
                  Ilimitado
                </div>
                <Progress value={100} className="h-2 mb-3 [&>div]:bg-purple-500" />
                <Link to="/billing">
                  <Button className="w-full text-sm py-2 px-4 bg-purple-600 hover:bg-purple-700">
                    <i className="ri-vip-crown-line text-lg mr-2"></i>
                    Ver Plano
                  </Button>
                </Link>
              </>
            ) : (
              <>
                {currentCredits <= 0 && (
                  <div className="flex items-center gap-2 text-red-400 mb-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-xs font-medium">Créditos esgotados!</span>
                  </div>
                )}
                <div className="text-xs text-muted-foreground mb-1">Uso de créditos</div>
                <div className="text-sm font-medium mb-2">
                  R$ {(currentCredits / 100).toFixed(2)} / R$ {(totalCredits / 100).toFixed(2)}
                </div>
                <Progress
                  value={percentage}
                  className={`h-2 mb-3 ${currentCredits <= 0 ? '[&>div]:bg-red-500' : ''}`}
                />
                <Link to="/billing">
                  <Button
                    className={`w-full text-sm py-2 px-4 ${currentCredits <= 0 ? 'bg-red-500 hover:bg-red-600' : ''}`}
                  >
                    <i className="ri-shopping-cart-line text-lg mr-2"></i>
                    {currentCredits <= 0 ? 'Comprar Créditos Agora' : 'Comprar Créditos'}
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
