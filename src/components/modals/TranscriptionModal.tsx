import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Download, Play, Pause, FileText, DollarSign } from 'lucide-react';
import { useState } from 'react';
import { CallLog } from '@/types/schema';

interface TranscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  call: CallLog | null;
}

export function TranscriptionModal({ open, onOpenChange, call }: TranscriptionModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!call) return null;

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const mockTranscript = call.transcript || `
[00:00] Agente: Olá! Aqui é a ${call.agentName} da NutraCall. Como posso ajudar você hoje?

[00:05] Cliente: Oi, eu gostaria de saber mais sobre os produtos de vocês.

[00:10] Agente: Claro! Temos uma linha completa de suplementos naturais. Você tem algum objetivo específico em mente?

[00:18] Cliente: Estou procurando algo para aumentar minha energia durante o dia.

[00:25] Agente: Perfeito! Nosso produto mais vendido para energia é o VitaBoost. Ele contém vitaminas B12, ferro e ginseng.

[00:35] Cliente: Interessante. Quanto custa?

[00:38] Agente: O VitaBoost custa R$ 89,90 o frasco com 60 cápsulas, que dura 1 mês. E hoje temos uma promoção de 20% de desconto para novos clientes!

[00:50] Cliente: Ótimo, vou querer experimentar!

[00:53] Agente: Excelente escolha! Posso confirmar seu pedido agora mesmo. Qual seu nome completo e endereço de entrega?
  `.trim();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Transcrição da Chamada
          </DialogTitle>
          <DialogDescription>
            {call.agentName} • {new Date(call.createdAt).toLocaleString('pt-BR')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Call Info */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Duração:</span>
              <Badge variant="secondary">{formatDuration(call.duration)}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Direção:</span>
              <Badge variant={call.direction === 'inbound' ? 'default' : 'outline'}>
                {call.direction === 'inbound' ? 'Recebida' : 'Realizada'}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Status:</span>
              <Badge
                variant={
                  call.status === 'completed' ? 'default' :
                  call.status === 'missed' ? 'destructive' : 'secondary'
                }
              >
                {call.status === 'completed' ? 'Concluída' :
                 call.status === 'missed' ? 'Perdida' :
                 call.status === 'failed' ? 'Falhou' : 'Em andamento'}
              </Badge>
            </div>
          </div>

          {/* Audio Player */}
          {call.audioUrl && (
            <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/50">
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 ml-0.5" />
                )}
              </Button>
              <div className="flex-1">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-primary rounded-full" />
                </div>
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>0:00</span>
                  <span>{formatDuration(call.duration)}</span>
                </div>
              </div>
            </div>
          )}

          <Separator />

          {/* Transcript */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Transcrição</h4>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Baixar
              </Button>
            </div>
            <ScrollArea className="h-48 rounded-lg border p-4">
              <pre className="text-sm whitespace-pre-wrap font-sans">
                {mockTranscript}
              </pre>
            </ScrollArea>
          </div>

          <Separator />

          {/* Cost Breakdown */}
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              Breakdown de Custos
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between p-3 rounded-lg bg-accent/30">
                <span className="text-muted-foreground">Telefonia:</span>
                <span className="font-medium">{formatCurrency(call.cost.telephony)}</span>
              </div>
              <div className="flex justify-between p-3 rounded-lg bg-accent/30">
                <span className="text-muted-foreground">Transcrição:</span>
                <span className="font-medium">{formatCurrency(call.cost.transcription)}</span>
              </div>
              <div className="flex justify-between p-3 rounded-lg bg-accent/30">
                <span className="text-muted-foreground">LLM:</span>
                <span className="font-medium">{formatCurrency(call.cost.llm)}</span>
              </div>
              <div className="flex justify-between p-3 rounded-lg bg-accent/30">
                <span className="text-muted-foreground">TTS:</span>
                <span className="font-medium">{formatCurrency(call.cost.tts)}</span>
              </div>
            </div>
            <div className="flex justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
              <span className="font-medium">Total:</span>
              <span className="font-bold text-primary">{formatCurrency(call.cost.total)}</span>
            </div>
          </div>

          {/* Objections */}
          {call.objectionsDetected && call.objectionsDetected.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-medium">Objeções Detectadas</h4>
                <div className="flex flex-wrap gap-2">
                  {call.objectionsDetected.map((objection, idx) => (
                    <Badge key={idx} variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30">
                      {objection}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
