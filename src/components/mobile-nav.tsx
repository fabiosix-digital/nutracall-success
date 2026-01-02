import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', icon: 'ri-dashboard-3-line', label: 'Dashboard' },
  { href: '/agents', icon: 'ri-robot-2-line', label: 'Agentes' },
  { href: '/voices', icon: 'ri-voiceprint-line', label: 'Vozes' },
  { href: '/phone-numbers', icon: 'ri-phone-line', label: 'Números' },
  { href: '/knowledge-base', icon: 'ri-book-open-line', label: 'Base de Conhecimento' },
  { href: '/call-logs', icon: 'ri-file-list-3-line', label: 'Registros' },
  { href: '/products', icon: 'ri-shopping-bag-line', label: 'Produtos' },
  { href: '/orders', icon: 'ri-shopping-cart-line', label: 'Pedidos' },
  { href: '/employees', icon: 'ri-team-line', label: 'Funcionários' },
  { href: '/automations', icon: 'ri-flashlight-line', label: 'Automações' },
  { href: '/analytics', icon: 'ri-bar-chart-box-line', label: 'Analytics' },
  { href: '/settings', icon: 'ri-settings-4-line', label: 'Configurações' },
  { href: '/billing', icon: 'ri-wallet-3-line', label: 'Faturamento' },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <i className="ri-phone-ai-line text-lg text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">NutraCall</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 overflow-auto p-4">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      )}
                    >
                      <i className={cn(item.icon, 'text-lg')} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-4 border-t">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-accent/50">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <i className="ri-user-line text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Usuário</p>
                <p className="text-xs text-muted-foreground truncate">usuario@nutracall.com</p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
