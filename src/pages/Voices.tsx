import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Play, Pause, MoreVertical, Plus, Mic, Globe, Star } from "lucide-react";
import { useState } from "react";
import { VoiceCloneModal } from "@/components/modals/VoiceCloneModal";

interface Voice {
  id: string;
  name: string;
  description: string;
  language: string;
  gender: "male" | "female";
  type: "cloned" | "library";
  preview_url?: string;
  labels?: string[];
  isFavorite?: boolean;
}

const mockVoices: Voice[] = [
  {
    id: "1",
    name: "Joana - Vendas",
    description: "Voz feminina otimizada para vendas e atendimento ao cliente",
    language: "pt-BR",
    gender: "female",
    type: "cloned",
    labels: ["Natural", "Persuasiva"],
    isFavorite: true,
  },
  {
    id: "2",
    name: "Carlos - Suporte",
    description: "Voz masculina profissional para suporte técnico",
    language: "pt-BR",
    gender: "male",
    type: "cloned",
    labels: ["Profissional", "Calmo"],
    isFavorite: false,
  },
  {
    id: "3",
    name: "Rachel (ElevenLabs)",
    description: "Voz feminina americana com sotaque neutro",
    language: "en-US",
    gender: "female",
    type: "library",
    labels: ["Americana", "Clara"],
    isFavorite: true,
  },
  {
    id: "4",
    name: "Adam (ElevenLabs)",
    description: "Voz masculina profunda e confiante",
    language: "en-US",
    gender: "male",
    type: "library",
    labels: ["Profunda", "Confiante"],
    isFavorite: false,
  },
  {
    id: "5",
    name: "Maria - Cobrança",
    description: "Voz feminina firme para ligações de cobrança",
    language: "pt-BR",
    gender: "female",
    type: "cloned",
    labels: ["Firme", "Direta"],
    isFavorite: false,
  },
  {
    id: "6",
    name: "Josh (ElevenLabs)",
    description: "Voz masculina jovem e energética",
    language: "en-US",
    gender: "male",
    type: "library",
    labels: ["Jovem", "Energética"],
    isFavorite: false,
  },
];

const VoicesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "cloned" | "library">("all");
  const [isCloneModalOpen, setIsCloneModalOpen] = useState(false);
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);

  const filteredVoices = mockVoices.filter((voice) => {
    const matchesSearch = voice.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || voice.type === filter;
    return matchesSearch && matchesFilter;
  });

  const clonedCount = mockVoices.filter(v => v.type === "cloned").length;
  const libraryCount = mockVoices.filter(v => v.type === "library").length;

  const handlePlayVoice = (voiceId: string) => {
    if (playingVoice === voiceId) {
      setPlayingVoice(null);
    } else {
      setPlayingVoice(voiceId);
      // Simulate audio playback
      setTimeout(() => setPlayingVoice(null), 3000);
    }
  };

  return (
    <MainLayout title="Biblioteca de Vozes" description="Explore e gerencie vozes disponíveis">
      <div className="px-3 md:px-6 py-4 md:py-6 overflow-auto bg-background animate-fade-in">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <i className="ri-volume-up-line text-xl text-primary"></i>
                </div>
                <div>
                  <p className="text-2xl font-bold">{mockVoices.length}</p>
                  <p className="text-xs text-muted-foreground">Total de Vozes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                  <Mic className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{clonedCount}</p>
                  <p className="text-xs text-muted-foreground">Vozes Clonadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <Globe className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{libraryCount}</p>
                  <p className="text-xs text-muted-foreground">Biblioteca</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("all")}
                >
                  Todas
                </Button>
                <Button
                  variant={filter === "cloned" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("cloned")}
                >
                  <Mic className="h-4 w-4 mr-1" />
                  Clonadas
                </Button>
                <Button
                  variant={filter === "library" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("library")}
                >
                  <Globe className="h-4 w-4 mr-1" />
                  Biblioteca
                </Button>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar voz..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button className="gradient-primary" onClick={() => setIsCloneModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Clonar Voz</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Voices Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredVoices.map((voice) => (
            <Card key={voice.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      voice.type === "cloned" ? "bg-purple-500/10" : "bg-blue-500/10"
                    }`}>
                      {voice.type === "cloned" ? (
                        <Mic className={`h-6 w-6 ${voice.gender === "female" ? "text-pink-500" : "text-purple-500"}`} />
                      ) : (
                        <Globe className="h-6 w-6 text-blue-500" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base">{voice.name}</CardTitle>
                        {voice.isFavorite && (
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{voice.language}</p>
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
                        <i className="ri-edit-line mr-2"></i>
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <i className="ri-star-line mr-2"></i>
                        {voice.isFavorite ? "Remover Favorito" : "Favoritar"}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <i className="ri-delete-bin-line mr-2"></i>
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {voice.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {voice.labels?.map((label) => (
                    <Badge key={label} variant="secondary" className="text-xs">
                      {label}
                    </Badge>
                  ))}
                  <Badge variant="outline" className="text-xs">
                    {voice.gender === "female" ? "Feminino" : "Masculino"}
                  </Badge>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handlePlayVoice(voice.id)}
                >
                  {playingVoice === voice.id ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Pausar
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Ouvir Prévia
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <VoiceCloneModal open={isCloneModalOpen} onOpenChange={setIsCloneModalOpen} />
    </MainLayout>
  );
};

export default VoicesPage;
