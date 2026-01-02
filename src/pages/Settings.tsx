import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Key,
  Bell,
  Shield,
  Webhook,
  Save,
  Eye,
  EyeOff,
  ExternalLink,
  Globe,
  Mail,
  DollarSign,
  Receipt,
  AlertTriangle,
  Link2,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const [showApiKeys, setShowApiKeys] = useState<Record<string, boolean>>({});
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const toggleApiKeyVisibility = (key: string) => {
    setShowApiKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast({
      title: "Configurações salvas",
      description: "Suas alterações foram salvas com sucesso.",
    });
  };

  return (
    <MainLayout title="Configurações" description="Configure suas preferências e integrações">
      <div className="space-y-6 animate-fade-in">
        <Tabs defaultValue="notifications" className="space-y-6">
          <ScrollArea className="w-full">
            <TabsList className="bg-muted/50 w-full justify-start">
              <TabsTrigger value="notifications" className="gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notificações</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="gap-2">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">Preferências</span>
              </TabsTrigger>
              <TabsTrigger value="credentials" className="gap-2">
                <Key className="h-4 w-4" />
                <span className="hidden sm:inline">Credenciais</span>
              </TabsTrigger>
              <TabsTrigger value="integrations" className="gap-2">
                <Link2 className="h-4 w-4" />
                <span className="hidden sm:inline">Integrações</span>
              </TabsTrigger>
              <TabsTrigger value="emails" className="gap-2">
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">Emails</span>
              </TabsTrigger>
              <TabsTrigger value="billing" className="gap-2">
                <DollarSign className="h-4 w-4" />
                <span className="hidden sm:inline">Cobrança</span>
              </TabsTrigger>
              <TabsTrigger value="transactions" className="gap-2">
                <Receipt className="h-4 w-4" />
                <span className="hidden sm:inline">Transações</span>
              </TabsTrigger>
              <TabsTrigger value="webhooks" className="gap-2">
                <Webhook className="h-4 w-4" />
                <span className="hidden sm:inline">Webhooks</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Segurança</span>
              </TabsTrigger>
              <TabsTrigger value="errors" className="gap-2">
                <AlertTriangle className="h-4 w-4" />
                <span className="hidden sm:inline">Erros</span>
              </TabsTrigger>
            </TabsList>
          </ScrollArea>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Preferências de Notificação
                </CardTitle>
                <CardDescription>
                  Configure quando e como você quer ser notificado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notificações Push</p>
                    <p className="text-sm text-muted-foreground">
                      Receber notificações no navegador
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Chamadas Perdidas</p>
                    <p className="text-sm text-muted-foreground">
                      Notificar quando uma chamada for perdida
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Novos Pedidos</p>
                    <p className="text-sm text-muted-foreground">
                      Notificar quando um pedido for criado
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Créditos Baixos</p>
                    <p className="text-sm text-muted-foreground">
                      Alertar quando os créditos estiverem abaixo de R$ 50
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Relatórios Semanais</p>
                    <p className="text-sm text-muted-foreground">
                      Receber resumo semanal por email
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Salvar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Preferências Gerais
                </CardTitle>
                <CardDescription>
                  Configure idioma, timezone e outras preferências
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Idioma</Label>
                    <Select defaultValue="pt-BR">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Fuso Horário</Label>
                    <Select defaultValue="America/Sao_Paulo">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                        <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                        <SelectItem value="Europe/London">Londres (GMT+0)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Tóquio (GMT+9)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Provider de IA Padrão</Label>
                  <Select defaultValue="openai">
                    <SelectTrigger className="max-w-md">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI (GPT-4o)</SelectItem>
                      <SelectItem value="anthropic">Anthropic (Claude)</SelectItem>
                      <SelectItem value="google">Google (Gemini)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Modelo de IA utilizado nos agentes por padrão
                  </p>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Salvar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Credentials Tab */}
          <TabsContent value="credentials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-primary" />
                  Chaves de API
                </CardTitle>
                <CardDescription>
                  Configure suas chaves de API para integração com serviços externos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* OpenAI */}
                <div className="space-y-2">
                  <Label htmlFor="openai">OpenAI API Key</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        id="openai"
                        type={showApiKeys["openai"] ? "text" : "password"}
                        placeholder="sk-..."
                        defaultValue="sk-proj-xxxxxxxxxxxxx"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                        onClick={() => toggleApiKeyVisibility("openai")}
                      >
                        {showApiKeys["openai"] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <Button variant="outline" size="icon" asChild>
                      <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Usado para modelos GPT-4o e Whisper
                  </p>
                </div>

                <Separator />

                {/* ElevenLabs */}
                <div className="space-y-2">
                  <Label htmlFor="elevenlabs">ElevenLabs API Key</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        id="elevenlabs"
                        type={showApiKeys["elevenlabs"] ? "text" : "password"}
                        placeholder="xi-..."
                        defaultValue="xi-xxxxxxxxxxxxx"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                        onClick={() => toggleApiKeyVisibility("elevenlabs")}
                      >
                        {showApiKeys["elevenlabs"] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <Button variant="outline" size="icon" asChild>
                      <a href="https://elevenlabs.io/api" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Síntese de voz para agentes IA
                  </p>
                </div>

                <Separator />

                {/* Twilio */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="twilio-sid">Twilio Account SID</Label>
                    <Input id="twilio-sid" placeholder="AC..." defaultValue="ACxxxxxxxxxxxxx" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twilio-token">Twilio Auth Token</Label>
                    <div className="relative">
                      <Input
                        id="twilio-token"
                        type={showApiKeys["twilio"] ? "text" : "password"}
                        placeholder="Token..."
                        defaultValue="xxxxxxxxxxxxxxxx"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                        onClick={() => toggleApiKeyVisibility("twilio")}
                      >
                        {showApiKeys["twilio"] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Integração com telefonia VoIP
                  </p>
                </div>

                <Separator />

                {/* Stripe */}
                <div className="space-y-2">
                  <Label htmlFor="stripe">Stripe Secret Key</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        id="stripe"
                        type={showApiKeys["stripe"] ? "text" : "password"}
                        placeholder="sk_live_..."
                        defaultValue="sk_live_xxxxxxxxxxxxx"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                        onClick={() => toggleApiKeyVisibility("stripe")}
                      >
                        {showApiKeys["stripe"] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <Button variant="outline" size="icon" asChild>
                      <a href="https://dashboard.stripe.com/apikeys" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Processamento de pagamentos
                  </p>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Salvar Alterações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link2 className="h-5 w-5 text-primary" />
                  Integrações OAuth
                </CardTitle>
                <CardDescription>
                  Conecte sua conta com outros serviços
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Google", icon: "ri-google-fill", connected: true, color: "text-red-500" },
                  { name: "HubSpot", icon: "ri-bubble-chart-fill", connected: false, color: "text-orange-500" },
                  { name: "Salesforce", icon: "ri-cloud-fill", connected: false, color: "text-blue-500" },
                  { name: "Slack", icon: "ri-slack-fill", connected: true, color: "text-purple-500" },
                ].map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className={`text-2xl ${integration.color}`}>
                        <i className={integration.icon}></i>
                      </div>
                      <div>
                        <p className="font-medium">{integration.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {integration.connected ? "Conectado" : "Não conectado"}
                        </p>
                      </div>
                    </div>
                    <Button variant={integration.connected ? "outline" : "default"}>
                      {integration.connected ? "Desconectar" : "Conectar"}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emails Tab */}
          <TabsContent value="emails" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Configurações de Email
                </CardTitle>
                <CardDescription>
                  Configure o servidor SMTP para envio de emails
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Servidor SMTP</Label>
                    <Input placeholder="smtp.exemplo.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Porta</Label>
                    <Input placeholder="587" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label>Usuário</Label>
                    <Input placeholder="seu@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Senha</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Email Remetente</Label>
                  <Input placeholder="noreply@suaempresa.com" />
                </div>
                <div className="space-y-2">
                  <Label>Nome Remetente</Label>
                  <Input placeholder="NutraCall" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Testar Configuração</Button>
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Salvar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Cobrança Automática
                </CardTitle>
                <CardDescription>
                  Configure a recarga automática de créditos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Recarga Automática</p>
                    <p className="text-sm text-muted-foreground">
                      Recarregar automaticamente quando o saldo estiver baixo
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Recarregar quando abaixo de</Label>
                    <Select defaultValue="50">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25">R$ 25,00</SelectItem>
                        <SelectItem value="50">R$ 50,00</SelectItem>
                        <SelectItem value="100">R$ 100,00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Valor da recarga</Label>
                    <Select defaultValue="100">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">R$ 50,00</SelectItem>
                        <SelectItem value="100">R$ 100,00</SelectItem>
                        <SelectItem value="200">R$ 200,00</SelectItem>
                        <SelectItem value="500">R$ 500,00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Salvar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-primary" />
                  Histórico de Transações
                </CardTitle>
                <CardDescription>
                  Veja todas as suas transações financeiras
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "credit", amount: 100, description: "Recarga de créditos", date: "02/01/2026", status: "completed" },
                    { type: "debit", amount: -15.50, description: "Uso de chamadas", date: "01/01/2026", status: "completed" },
                    { type: "credit", amount: 200, description: "Recarga automática", date: "28/12/2025", status: "completed" },
                    { type: "debit", amount: -45.00, description: "Uso de chamadas", date: "27/12/2025", status: "completed" },
                  ].map((transaction, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          transaction.type === "credit" ? "bg-success/10" : "bg-destructive/10"
                        }`}>
                          <DollarSign className={`h-5 w-5 ${
                            transaction.type === "credit" ? "text-success" : "text-destructive"
                          }`} />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <span className={`font-medium ${
                        transaction.type === "credit" ? "text-success" : "text-destructive"
                      }`}>
                        {transaction.type === "credit" ? "+" : ""}R$ {Math.abs(transaction.amount).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Webhooks Tab */}
          <TabsContent value="webhooks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Webhook className="h-5 w-5 text-primary" />
                  Webhooks
                </CardTitle>
                <CardDescription>
                  Configure endpoints para receber eventos em tempo real
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">URL do Webhook</Label>
                  <Input
                    id="webhook-url"
                    placeholder="https://seu-site.com/api/webhook"
                  />
                </div>
                <div className="space-y-3">
                  <Label>Eventos</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Switch id="event-call" defaultChecked />
                      <Label htmlFor="event-call" className="font-normal">
                        Chamadas (nova, encerrada, perdida)
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="event-order" defaultChecked />
                      <Label htmlFor="event-order" className="font-normal">
                        Pedidos (criado, atualizado, cancelado)
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="event-agent" />
                      <Label htmlFor="event-agent" className="font-normal">
                        Agentes (status alterado)
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="event-credits" defaultChecked />
                      <Label htmlFor="event-credits" className="font-normal">
                        Créditos (saldo baixo, recarga)
                      </Label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Salvar Webhook
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Segurança
                </CardTitle>
                <CardDescription>
                  Gerencie as configurações de segurança da conta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Autenticação de Dois Fatores</p>
                    <p className="text-sm text-muted-foreground">
                      Adicione uma camada extra de segurança
                    </p>
                  </div>
                  <Button variant="outline">Configurar</Button>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Timeout de Sessão</Label>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-full max-w-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutos</SelectItem>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                      <SelectItem value="240">4 horas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">IPs Permitidos</p>
                    <p className="text-sm text-muted-foreground">
                      Restringir acesso a IPs específicos
                    </p>
                  </div>
                  <Button variant="outline">Gerenciar</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sessões Ativas</p>
                    <p className="text-sm text-muted-foreground">
                      Veja e gerencie suas sessões ativas
                    </p>
                  </div>
                  <Button variant="outline">Ver Sessões</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Errors Tab */}
          <TabsContent value="errors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Log de Erros
                </CardTitle>
                <CardDescription>
                  Visualize erros recentes do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "warning", message: "API rate limit atingido para ElevenLabs", time: "2 min atrás" },
                    { type: "error", message: "Falha na conexão com Twilio", time: "15 min atrás" },
                    { type: "warning", message: "Tempo de resposta alto na API OpenAI", time: "1 hora atrás" },
                    { type: "info", message: "Manutenção programada em 24h", time: "3 horas atrás" },
                  ].map((error, idx) => (
                    <div key={idx} className={`flex items-start gap-3 p-3 rounded-lg border ${
                      error.type === "error" ? "border-destructive/30 bg-destructive/5" :
                      error.type === "warning" ? "border-warning/30 bg-warning/5" :
                      "border-border"
                    }`}>
                      <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                        error.type === "error" ? "text-destructive" :
                        error.type === "warning" ? "text-warning" :
                        "text-muted-foreground"
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium">{error.message}</p>
                        <p className="text-sm text-muted-foreground">{error.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
