import { useState } from 'react';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TestCallModal } from './modals/TestCallModal';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function FloatingActionButtons() {
  const [isTestCallOpen, setIsTestCallOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="lg"
              className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-gradient-to-br from-primary to-primary/80"
              onClick={() => setIsTestCallOpen(true)}
            >
              <Phone className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Fazer ligação de teste</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <TestCallModal open={isTestCallOpen} onOpenChange={setIsTestCallOpen} />
    </>
  );
}
