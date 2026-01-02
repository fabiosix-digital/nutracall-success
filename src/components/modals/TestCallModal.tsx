import { useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Phone, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TestCallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agentId?: string;
  agentName?: string;
}

const countryCodes = [
  { code: '+55', country: 'Brasil', flag: '🇧🇷' },
  { code: '+1', country: 'EUA', flag: '🇺🇸' },
  { code: '+351', country: 'Portugal', flag: '🇵🇹' },
  { code: '+34', country: 'Espanha', flag: '🇪🇸' },
  { code: '+44', country: 'Reino Unido', flag: '🇬🇧' },
  { code: '+49', country: 'Alemanha', flag: '🇩🇪' },
  { code: '+33', country: 'França', flag: '🇫🇷' },
  { code: '+39', country: 'Itália', flag: '🇮🇹' },
  { code: '+81', country: 'Japão', flag: '🇯🇵' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
];

export function TestCallModal({ open, onOpenChange, agentId, agentName }: TestCallModalProps) {
  const [countryCode, setCountryCode] = useState('+55');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isCallling, setIsCallling] = useState(false);
  const [callStatus, setCallStatus] = useState<'idle' | 'ringing' | 'connected' | 'ended'>('idle');
  const { toast } = useToast();

  const handleStartCall = async () => {
    if (!phoneNumber) {
      toast({
        title: 'Erro',
        description: 'Digite um número de telefone',
        variant: 'destructive',
      });
      return;
    }

    setIsCallling(true);
    setCallStatus('ringing');

    // Simulate call initiation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setCallStatus('connected');

    toast({
      title: 'Chamada iniciada',
      description: `Ligando para ${countryCode} ${phoneNumber}`,
    });

    // Simulate call duration
    await new Promise(resolve => setTimeout(resolve, 3000));
    setCallStatus('ended');
    setIsCallling(false);

    toast({
      title: 'Chamada encerrada',
      description: 'A ligação de teste foi concluída',
    });
  };

  const handleClose = () => {
    if (!isCallling) {
      setPhoneNumber('');
      setCallStatus('idle');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            Ligação de Teste
          </DialogTitle>
          <DialogDescription>
            {agentName
              ? `Faça uma ligação de teste com o agente "${agentName}"`
              : 'Faça uma ligação de teste para verificar o funcionamento'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {callStatus === 'idle' ? (
            <>
              <div className="space-y-2">
                <Label>Número de telefone</Label>
                <div className="flex gap-2">
                  <Select value={countryCode} onValueChange={setCountryCode}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((c) => (
                        <SelectItem key={c.code} value={c.code}>
                          <span className="flex items-center gap-2">
                            <span>{c.flag}</span>
                            <span>{c.code}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <Button onClick={handleStartCall} className="w-full" size="lg">
                <Phone className="mr-2 h-4 w-4" />
                Iniciar Ligação
              </Button>
            </>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className={`h-20 w-20 mx-auto rounded-full flex items-center justify-center ${
                callStatus === 'ringing' ? 'bg-yellow-500/20 animate-pulse' :
                callStatus === 'connected' ? 'bg-green-500/20' :
                'bg-muted'
              }`}>
                {isCallling ? (
                  <Loader2 className="h-10 w-10 text-primary animate-spin" />
                ) : (
                  <Phone className="h-10 w-10 text-primary" />
                )}
              </div>

              <div>
                <p className="font-medium text-lg">
                  {callStatus === 'ringing' && 'Chamando...'}
                  {callStatus === 'connected' && 'Conectado'}
                  {callStatus === 'ended' && 'Chamada encerrada'}
                </p>
                <p className="text-muted-foreground">
                  {countryCode} {phoneNumber}
                </p>
              </div>

              {callStatus === 'connected' && (
                <Button
                  variant="destructive"
                  onClick={() => {
                    setCallStatus('ended');
                    setIsCallling(false);
                  }}
                >
                  Encerrar Chamada
                </Button>
              )}

              {callStatus === 'ended' && (
                <Button onClick={() => setCallStatus('idle')}>
                  Nova Ligação
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
