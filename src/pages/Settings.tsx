import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Settings,
  Key,
  Bell,
  Shield,
  Globe,
  Webhook,
  Save,
  Eye,
  EyeOff,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";

const SettingsPage = () => {
  const [showApiKeys, setShowApiKeys] = useState<Record<string, boolean>>({});

  const toggleApiKeyVisibility = (key: string) => {
    setShowApiKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <MainLayout title="Configurações">
      <div className="space-y-6 animate-fade-in">
        <Tabs defaultValue="api" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="api">
              <Key className="mr-2 h-4 w-4" />
              API Keys
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2 h-4 w-4" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="mr-2 h-4 w-4" />
              Segurança
            </TabsTrigger>
            <TabsTrigger value="webhooks">
              <Webhook className="mr-2 h-4 w-4" />
              Webhooks
            </TabsTrigger>
          </TabsList>

          {/* API Keys Tab */}
          <TabsContent value="api" className="space-y-6">
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
                    <Button variant="outline" size="icon">
                      <ExternalLink className="h-4 w-4" />
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
                    <Button variant="outline" size="icon">
                      <ExternalLink className="h-4 w-4" />
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

                <div className="flex justify-end">
                  <Button className="gradient-primary">
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Alterações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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
                      Alertar quando os créditos estiverem acabando
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
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button className="gradient-primary">
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Webhook
                  </Button>
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
