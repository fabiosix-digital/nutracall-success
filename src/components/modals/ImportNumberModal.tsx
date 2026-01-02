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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Phone, Loader2, Check, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImportNumberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface AvailableNumber {
  number: string;
  type: 'local' | 'toll-free' | 'mobile';
  location: string;
  price: number;
}

const mockAvailableNumbers: AvailableNumber[] = [
  { number: '+55 11 3000-0001', type: 'local', location: 'São Paulo, SP', price: 29.90 },
  { number: '+55 11 3000-0002', type: 'local', location: 'São Paulo, SP', price: 29.90 },
  { number: '+55 21 3000-0001', type: 'local', location: 'Rio de Janeiro, RJ', price: 29.90 },
  { number: '+55 0800 000-0001', type: 'toll-free', location: 'Nacional', price: 99.90 },
  { number: '+55 11 99000-0001', type: 'mobile', location: 'São Paulo, SP', price: 49.90 },
];

export function ImportNumberModal({ open, onOpenChange }: ImportNumberModalProps) {
  const [tab, setTab] = useState<'twilio' | 'buy'>('twilio');
  const [accountSid, setAccountSid] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);
  const { toast } = useToast();

  const handleConnectTwilio = async () => {
    if (!accountSid || !authToken) {
      toast({
        title: 'Erro',
        description: 'Preencha as credenciais do Twilio',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsConnected(true);
    setIsLoading(false);

    toast({
      title: 'Conectado!',
      description: 'Conta Twilio conectada com sucesso',
    });
  };

  const handleImportNumbers = async () => {
    if (selectedNumbers.length === 0) {
      toast({
        title: 'Erro',
        description: 'Selecione pelo menos um número',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);

    toast({
      title: 'Números importados!',
      description: `${selectedNumbers.length} número(s) importado(s) com sucesso`,
    });

    onOpenChange(false);
  };

  const toggleNumber = (number: string) => {
    setSelectedNumbers(prev =>
      prev.includes(number)
        ? prev.filter(n => n !== number)
        : [...prev, number]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            Adicionar Número de Telefone
          </DialogTitle>
          <DialogDescription>
            Importe números do Twilio ou compre novos números
          </DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(v) => setTab(v as 'twilio' | 'buy')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="twilio">Importar do Twilio</TabsTrigger>
            <TabsTrigger value="buy">Comprar Número</TabsTrigger>
          </TabsList>

          <TabsContent value="twilio" className="space-y-4 mt-4">
            {!isConnected ? (
              <>
                <div className="p-4 rounded-lg bg-accent/50 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">Conecte sua conta Twilio</p>
                    <p className="text-muted-foreground mt-1">
                      Você pode encontrar suas credenciais no{' '}
                      <a href="https://console.twilio.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Console do Twilio
                      </a>
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="accountSid">Account SID</Label>
                    <Input
                      id="accountSid"
                      placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                      value={accountSid}
                      onChange={(e) => setAccountSid(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="authToken">Auth Token</Label>
                    <Input
                      id="authToken"
                      type="password"
                      placeholder="••••••••••••••••••••••••••••••••"
                      value={authToken}
                      onChange={(e) => setAuthToken(e.target.value)}
                    />
                  </div>
                </div>

                <Button onClick={handleConnectTwilio} className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Conectando...
                    </>
                  ) : (
                    'Conectar Twilio'
                  )}
                </Button>
              </>
            ) : (
              <>
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-green-600">
                    Conta Twilio conectada
                  </span>
                </div>

                <div className="space-y-2">
                  <Label>Selecione os números para importar</Label>
                  <ScrollArea className="h-48 border rounded-lg">
                    <div className="p-2 space-y-2">
                      {mockAvailableNumbers.map((num) => (
                        <div
                          key={num.number}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 cursor-pointer"
                          onClick={() => toggleNumber(num.number)}
                        >
                          <Checkbox
                            checked={selectedNumbers.includes(num.number)}
                            onCheckedChange={() => toggleNumber(num.number)}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium">{num.number}</p>
                            <p className="text-xs text-muted-foreground">{num.location}</p>
                          </div>
                          <Badge variant="secondary" className="shrink-0">
                            {num.type === 'local' ? 'Local' :
                             num.type === 'toll-free' ? 'Gratuito' : 'Móvel'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <Button
                  onClick={handleImportNumbers}
                  className="w-full"
                  disabled={isLoading || selectedNumbers.length === 0}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Importando...
                    </>
                  ) : (
                    `Importar ${selectedNumbers.length} número(s)`
                  )}
                </Button>
              </>
            )}
          </TabsContent>

          <TabsContent value="buy" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Números disponíveis para compra</Label>
              <ScrollArea className="h-64 border rounded-lg">
                <div className="p-2 space-y-2">
                  {mockAvailableNumbers.map((num) => (
                    <div
                      key={num.number}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50"
                    >
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium">{num.number}</p>
                          <p className="text-xs text-muted-foreground">{num.location}</p>
                        </div>
                        <Badge variant="secondary">
                          {num.type === 'local' ? 'Local' :
                           num.type === 'toll-free' ? 'Gratuito' : 'Móvel'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-primary">
                          R$ {num.price.toFixed(2)}/mês
                        </span>
                        <Button size="sm">Comprar</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
