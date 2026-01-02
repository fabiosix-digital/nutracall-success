import { Sparkles, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export function UpgradeBanner() {
  const [dismissed, setDismissed] = useState(false);
  const { user } = useAuth();

  // Only show for free users
  if (!user || user.plan !== 'free' || dismissed) {
    return null;
  }

  return (
    <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm">Desbloqueie todo o potencial do NutraCall</h4>
          <p className="text-sm text-muted-foreground mt-0.5">
            Faça upgrade para ter mais agentes, minutos e recursos exclusivos.
          </p>
        </div>

        <Button asChild size="sm" className="shrink-0">
          <Link to="/billing">
            <Sparkles className="h-4 w-4 mr-2" />
            Fazer Upgrade
          </Link>
        </Button>
      </div>
    </div>
  );
}
