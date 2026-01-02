import { useState, useEffect } from 'react';
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
import { Mic, MicOff, Phone, PhoneOff, AlertTriangle } from 'lucide-react';

interface LiveVoiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agentName?: string;
}

interface Objection {
  text: string;
  timestamp: string;
  suggestion: string;
}

export function LiveVoiceModal({ open, onOpenChange, agentName }: LiveVoiceModalProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [objections, setObjections] = useState<Objection[]>([]);
  const [transcript, setTranscript] = useState<string[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setDuration(d => d + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  useEffect(() => {
    if (isConnected) {
      // Simulate real-time transcript
      const phrases = [
        'Cliente: Olá, gostaria de saber mais sobre o produto.',
        'Agente: Claro! Nosso produto é ideal para suas necessidades.',
        'Cliente: Mas o preço está muito alto para mim.',
        'Agente: Entendo sua preocupação. Temos opções de parcelamento.',
      ];
      
      let index = 0;
      const interval = setInterval(() => {
        if (index < phrases.length) {
          setTranscript(prev => [...prev, phrases[index]]);
          
          // Detect objection
          if (phrases[index].includes('alto') || phrases[index].includes('caro')) {
            setObjections(prev => [...prev, {
              text: 'Objeção de preço detectada',
              timestamp: formatDuration(duration),
              suggestion: 'Ofereça parcelamento ou destaque o valor agregado do produto.',
            }]);
          }
          index++;
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isConnected]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleConnect = () => {
    setIsConnected(true);
    setTranscript([]);
    setObjections([]);
    setDuration(0);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    onOpenChange(false);
  };

  const handleClose = () => {
    if (isConnected) {
      handleDisconnect();
    } else {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            Chamada ao Vivo
            {isConnected && (
              <Badge variant="default" className="ml-2 bg-green-500">
                Conectado
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            {agentName ? `Monitorando agente "${agentName}"` : 'Monitor de chamada em tempo real'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {!isConnected ? (
            <div className="text-center py-12 space-y-6">
              <div className="h-24 w-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="h-12 w-12 text-primary" />
              </div>
              <div>
                <p className="text-lg font-medium">Pronto para conectar</p>
                <p className="text-muted-foreground">
                  Clique abaixo para iniciar a chamada ao vivo
                </p>
              </div>
              <Button size="lg" onClick={handleConnect}>
                <Phone className="h-4 w-4 mr-2" />
                Conectar Chamada
              </Button>
            </div>
          ) : (
            <>
              {/* Call Controls */}
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-mono font-bold">{formatDuration(duration)}</p>
                  <p className="text-sm text-muted-foreground">Duração</p>
                </div>
              </div>

              {/* Waveform Animation */}
              <div className="flex items-center justify-center gap-1 h-16">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-primary rounded-full animate-pulse"
                    style={{
                      height: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant={isMuted ? 'destructive' : 'outline'}
                  size="icon"
                  className="h-12 w-12 rounded-full"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-14 w-14 rounded-full"
                  onClick={handleDisconnect}
                >
                  <PhoneOff className="h-6 w-6" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Transcript */}
                <div className="space-y-2">
                  <h4 className="font-medium">Transcrição ao Vivo</h4>
                  <ScrollArea className="h-40 border rounded-lg p-3">
                    <div className="space-y-2 text-sm">
                      {transcript.map((line, idx) => (
                        <p key={idx} className={line.startsWith('Cliente') ? 'text-muted-foreground' : ''}>
                          {line}
                        </p>
                      ))}
                      {transcript.length === 0 && (
                        <p className="text-muted-foreground italic">Aguardando transcrição...</p>
                      )}
                    </div>
                  </ScrollArea>
                </div>

                {/* Objections */}
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    Objeções Detectadas
                  </h4>
                  <ScrollArea className="h-40 border rounded-lg p-3">
                    <div className="space-y-3">
                      {objections.map((obj, idx) => (
                        <div key={idx} className="p-2 rounded bg-yellow-500/10 border border-yellow-500/30">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-yellow-600">{obj.text}</span>
                            <span className="text-xs text-muted-foreground">{obj.timestamp}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{obj.suggestion}</p>
                        </div>
                      ))}
                      {objections.length === 0 && (
                        <p className="text-muted-foreground italic text-sm">Nenhuma objeção detectada</p>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
