import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";

interface Voice {
  id: string;
  name: string;
  description: string;
  gender: "Masculina" | "Feminina";
  initial: string;
  color: string;
}

const elevenLabsVoices: Voice[] = [
  { id: "roger", name: "Roger", description: "Laid-Back, Casual, Resonant", gender: "Masculina", initial: "R", color: "bg-purple-500" },
  { id: "sarah", name: "Sarah", description: "Mature, Reassuring, Confident", gender: "Feminina", initial: "S", color: "bg-green-500" },
  { id: "laura", name: "Laura", description: "Enthusiast, Quirky Attitude", gender: "Feminina", initial: "L", color: "bg-yellow-500" },
  { id: "charlie", name: "Charlie", description: "Deep, Confident, Energetic", gender: "Masculina", initial: "C", color: "bg-cyan-500" },
  { id: "george", name: "George", description: "Warm, Captivating Storyteller", gender: "Masculina", initial: "G", color: "bg-green-600" },
  { id: "callum", name: "Callum", description: "Husky Trickster", gender: "Masculina", initial: "C", color: "bg-teal-500" },
  { id: "river", name: "River", description: "Relaxed, Neutral, Informative", gender: "Masculina", initial: "R", color: "bg-orange-500" },
  { id: "harry", name: "Harry", description: "Fierce Warrior", gender: "Masculina", initial: "H", color: "bg-amber-500" },
  { id: "liam", name: "Liam", description: "Energetic, Social Media Creator", gender: "Masculina", initial: "L", color: "bg-violet-500" },
  { id: "alice", name: "Alice", description: "Clear, Engaging Educator", gender: "Feminina", initial: "A", color: "bg-pink-500" },
  { id: "matilda", name: "Matilda", description: "Knowledgable, Professional", gender: "Feminina", initial: "M", color: "bg-rose-500" },
  { id: "will", name: "Will", description: "Relaxed Optimist", gender: "Masculina", initial: "W", color: "bg-blue-500" },
];

const AgentCreate = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");
  const [selectedVoice, setSelectedVoice] = useState<string>("roger");
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "default",
    callDirection: "both",
    voiceType: "elevenlabs",
    language: "pt-BR",
    llmModel: "gpt-4o",
  });

  const handleSave = () => {
    // Save logic here
    navigate("/agents");
  };

  return (
    <MainLayout 
      title="Criar Novo Agente" 
      description="Configure um novo agente de IA para ligações telefônicas"
    >
      <div className="px-3 md:px-6 py-4 md:py-6 overflow-auto bg-background animate-fade-in">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-muted/50 p-1">
            <TabsTrigger value="basic" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Configurações Básicas
            </TabsTrigger>
            <TabsTrigger value="flow" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Fluxo de Conversa
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Base de Conhecimento
            </TabsTrigger>
            <TabsTrigger value="behavior" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Comportamento
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Avançado
            </TabsTrigger>
            <TabsTrigger value="webhooks" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Webhooks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="mt-0">
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="px-0">
                <CardTitle>Configurações Básicas</CardTitle>
                <CardDescription>Nome, modelo de IA e configurações de voz do agente</CardDescription>
              </CardHeader>
              <CardContent className="px-0 space-y-6">
                {/* Nome do Agente */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Nome do Agente <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Ex: Maria Silva - Atendimento"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-muted/50"
                  />
                </div>

                {/* Número de Telefone e Direção de Chamadas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Número de Telefone</Label>
                    <Select value={formData.phoneNumber} onValueChange={(v) => setFormData({ ...formData, phoneNumber: v })}>
                      <SelectTrigger className="bg-muted/50">
                        <SelectValue placeholder="Selecione um número" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Nenhum (usar padrão)</SelectItem>
                        <SelectItem value="+55119999999">+55 11 99999-9999</SelectItem>
                        <SelectItem value="+55119888888">+55 11 98888-8888</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Este número será usado exclusivamente por este agente
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Direção de Chamadas</Label>
                    <Select value={formData.callDirection} onValueChange={(v) => setFormData({ ...formData, callDirection: v })}>
                      <SelectTrigger className="bg-muted/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="both">Ambas (Fazer e Receber)</SelectItem>
                        <SelectItem value="inbound">Apenas Receber</SelectItem>
                        <SelectItem value="outbound">Apenas Fazer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Tipo de Voz */}
                <div className="space-y-2">
                  <Label>Tipo de Voz</Label>
                  <Select value={formData.voiceType} onValueChange={(v) => setFormData({ ...formData, voiceType: v })}>
                    <SelectTrigger className="bg-muted/50">
                      <div className="flex items-center gap-2">
                        <i className="ri-mic-line text-primary"></i>
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="elevenlabs">Vozes ElevenLabs (20)</SelectItem>
                      <SelectItem value="openai">OpenAI TTS</SelectItem>
                      <SelectItem value="azure">Azure Speech</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Idioma e Modelo de IA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Idioma</Label>
                    <Select value={formData.language} onValueChange={(v) => setFormData({ ...formData, language: v })}>
                      <SelectTrigger className="bg-muted/50">
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
                    <Label>Modelo de IA</Label>
                    <Select value={formData.llmModel} onValueChange={(v) => setFormData({ ...formData, llmModel: v })}>
                      <SelectTrigger className="bg-muted/50">
                        <div className="flex items-center gap-2">
                          <SelectValue />
                          {formData.llmModel === "gpt-4o" && (
                            <span className="text-xs text-primary font-medium">Recomendado</span>
                          )}
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4o">GPT-4o (OpenAI)</SelectItem>
                        <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                        <SelectItem value="claude-3.5">Claude 3.5 Sonnet</SelectItem>
                        <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Configuração de Voz ElevenLabs */}
                {formData.voiceType === "elevenlabs" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-medium">Configuração de Voz ElevenLabs</Label>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-medium">Vozes ElevenLabs</span>
                      <span className="text-xs bg-muted px-2 py-0.5 rounded">20 vozes disponíveis</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {elevenLabsVoices.map((voice) => (
                        <div
                          key={voice.id}
                          onClick={() => setSelectedVoice(voice.id)}
                          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                            selectedVoice === voice.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50 bg-muted/30"
                          }`}
                        >
                          <button className="flex items-center justify-center h-8 w-8 rounded-full bg-muted hover:bg-muted/80">
                            <Play className="h-3 w-3" />
                          </button>
                          <div className={`flex items-center justify-center h-8 w-8 rounded-full text-white text-sm font-medium ${voice.color}`}>
                            {voice.initial}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">
                              {voice.name} - {voice.description}
                            </p>
                            <p className="text-xs text-muted-foreground">{voice.gender}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flow">
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="px-0">
                <CardTitle>Fluxo de Conversa</CardTitle>
                <CardDescription>Configure o fluxo e roteiro de conversa do agente</CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                  <p className="text-muted-foreground">Em desenvolvimento...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="knowledge">
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="px-0">
                <CardTitle>Base de Conhecimento</CardTitle>
                <CardDescription>Adicione documentos e informações para o agente</CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                  <p className="text-muted-foreground">Em desenvolvimento...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="behavior">
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="px-0">
                <CardTitle>Comportamento</CardTitle>
                <CardDescription>Defina personalidade e tom de voz do agente</CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                  <p className="text-muted-foreground">Em desenvolvimento...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced">
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="px-0">
                <CardTitle>Avançado</CardTitle>
                <CardDescription>Configurações avançadas do agente</CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                  <p className="text-muted-foreground">Em desenvolvimento...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="webhooks">
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="px-0">
                <CardTitle>Webhooks</CardTitle>
                <CardDescription>Configure integrações via webhook</CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                  <p className="text-muted-foreground">Em desenvolvimento...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Bottom Actions */}
        <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
          <Button variant="outline" onClick={() => navigate("/agents")}>
            Cancelar
          </Button>
          <Button className="gradient-primary" onClick={handleSave}>
            Criar Agente
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default AgentCreate;
