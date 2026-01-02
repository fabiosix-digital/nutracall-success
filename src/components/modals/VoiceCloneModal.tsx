import { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Mic, Upload, Loader2, Play, Pause, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VoiceCloneModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = 'upload' | 'processing' | 'preview' | 'complete';

export function VoiceCloneModal({ open, onOpenChange }: VoiceCloneModalProps) {
  const [step, setStep] = useState<Step>('upload');
  const [voiceName, setVoiceName] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('audio/')) {
        toast({
          title: 'Erro',
          description: 'Por favor, selecione um arquivo de áudio',
          variant: 'destructive',
        });
        return;
      }
      setAudioFile(file);
    }
  };

  const handleStartCloning = async () => {
    if (!audioFile || !voiceName) {
      toast({
        title: 'Erro',
        description: 'Preencha o nome e selecione um arquivo de áudio',
        variant: 'destructive',
      });
      return;
    }

    setStep('processing');
    
    // Simulate processing
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setProgress(i);
    }

    setStep('preview');
  };

  const handleConfirmClone = async () => {
    setStep('complete');
    
    toast({
      title: 'Voz clonada!',
      description: `A voz "${voiceName}" foi criada com sucesso`,
    });

    setTimeout(() => {
      onOpenChange(false);
      resetModal();
    }, 2000);
  };

  const resetModal = () => {
    setStep('upload');
    setVoiceName('');
    setAudioFile(null);
    setProgress(0);
    setIsPlaying(false);
  };

  const handleClose = () => {
    if (step !== 'processing') {
      onOpenChange(false);
      resetModal();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5 text-primary" />
            Clonar Voz
          </DialogTitle>
          <DialogDescription>
            Crie uma voz personalizada a partir de um arquivo de áudio
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {step === 'upload' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="voiceName">Nome da voz</Label>
                <Input
                  id="voiceName"
                  placeholder="Ex: Minha Voz Personalizada"
                  value={voiceName}
                  onChange={(e) => setVoiceName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Arquivo de áudio</Label>
                <div
                  className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  
                  {audioFile ? (
                    <div className="space-y-2">
                      <div className="h-12 w-12 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check className="h-6 w-6 text-green-500" />
                      </div>
                      <p className="font-medium">{audioFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(audioFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="h-12 w-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                        <Upload className="h-6 w-6 text-primary" />
                      </div>
                      <p className="font-medium">Clique para fazer upload</p>
                      <p className="text-sm text-muted-foreground">
                        MP3, WAV, M4A (mínimo 30 segundos)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-accent/50 text-sm space-y-2">
                <p className="font-medium">Dicas para melhor resultado:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Use áudio de alta qualidade sem ruídos de fundo</li>
                  <li>Mínimo de 30 segundos de fala clara</li>
                  <li>Evite músicas ou efeitos sonoros</li>
                </ul>
              </div>

              <Button
                onClick={handleStartCloning}
                className="w-full"
                disabled={!audioFile || !voiceName}
              >
                Iniciar Clonagem
              </Button>
            </>
          )}

          {step === 'processing' && (
            <div className="py-8 text-center space-y-6">
              <div className="h-20 w-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
              </div>
              
              <div className="space-y-2">
                <p className="font-medium text-lg">Processando voz...</p>
                <p className="text-muted-foreground">
                  Isso pode levar alguns minutos
                </p>
              </div>

              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-muted-foreground">{progress}%</p>
              </div>
            </div>
          )}

          {step === 'preview' && (
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-green-600">
                  Voz clonada com sucesso!
                </span>
              </div>

              <div className="space-y-2">
                <Label>Prévia da voz</Label>
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
                    <p className="font-medium">{voiceName}</p>
                    <p className="text-sm text-muted-foreground">
                      "Olá, esta é uma prévia da sua voz clonada."
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep('upload')}
                >
                  <X className="h-4 w-4 mr-2" />
                  Tentar novamente
                </Button>
                <Button className="flex-1" onClick={handleConfirmClone}>
                  <Check className="h-4 w-4 mr-2" />
                  Confirmar
                </Button>
              </div>
            </div>
          )}

          {step === 'complete' && (
            <div className="py-8 text-center space-y-4">
              <div className="h-20 w-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="h-10 w-10 text-green-500" />
              </div>
              <div>
                <p className="font-medium text-lg">Voz criada!</p>
                <p className="text-muted-foreground">
                  "{voiceName}" está disponível para uso
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
