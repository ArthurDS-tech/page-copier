import { Search, HelpCircle, Bell, Plus } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { InviteMembersDialog } from './InviteMembersDialog';

const currentTeamMembers = [
  { id: '1', name: 'Lucas Silva', email: 'lucas@orionai.com', role: 'admin', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: '2', name: 'Mariana Costa', email: 'mariana@orionai.com', role: 'member', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: '3', name: 'Pedro Santos', email: 'pedro@orionai.com', role: 'member', avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: '4', name: 'Carla Oliveira', email: 'carla@orionai.com', role: 'viewer', avatar: 'https://i.pravatar.cc/150?img=16' },
  { id: '5', name: 'Rafael Mendes', email: 'rafael@orionai.com', role: 'member', avatar: 'https://i.pravatar.cc/150?img=8' },
];

export function Header() {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const location = useLocation();
  
  // Esconder área de projeto nas páginas de WhatsApp e Instagram
  const hideProjectHeader = location.pathname === '/whatsapp' || location.pathname === '/instagram-direct';

  return (
    <header className="border-b border-border bg-card">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar conversas, clientes ou agentes..."
              className="w-full pl-10 pr-4 py-2 bg-secondary rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 border border-border"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Project header - Escondido nas páginas de WhatsApp e Instagram */}
      {!hideProjectHeader && (
        <div className="px-6 py-4 animate-in fade-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span className="hover:text-foreground cursor-pointer transition-colors">Workspace</span>
            <span className="text-muted-foreground/50">{'>'}</span>
            <span className="text-foreground font-medium">Orion AI Platform</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Orion AI Platform</h1>
              <p className="text-sm text-muted-foreground mt-1">Plataforma de atendimento inteligente com IA</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {currentTeamMembers.slice(0, 4).map((member) => (
                  <img
                    key={member.id}
                    src={member.avatar}
                    alt={member.name}
                    title={member.name}
                    className="w-9 h-9 rounded-full border-2 border-card shadow-sm hover:scale-110 transition-transform cursor-pointer"
                  />
                ))}
                {currentTeamMembers.length > 4 && (
                  <div 
                    className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground border-2 border-card shadow-sm cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => setInviteDialogOpen(true)}
                  >
                    +{currentTeamMembers.length - 4}
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => setInviteDialogOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Gerenciar equipe
              </button>
            </div>
          </div>
        </div>
      )}

      <InviteMembersDialog
        open={inviteDialogOpen}
        onOpenChange={setInviteDialogOpen}
        currentMembers={currentTeamMembers}
      />
    </header>
  );
}
