import { 
  LayoutDashboard, 
  Inbox, 
  MessageSquare, 
  BarChart3, 
  Users, 
  Settings, 
  PanelLeftClose, 
  PanelLeft, 
  ChevronDown,
  ChevronRight,
  Bot,
  GitBranch,
  BookOpen,
  Brain,
  Phone,
  Instagram,
  Globe
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/hooks/useSidebar';
import { useState } from 'react';

interface SidebarProps {
  forceCollapsed?: boolean;
}

export function Sidebar({ forceCollapsed = false }: SidebarProps) {
  const { isCollapsed, toggle } = useSidebar();
  const location = useLocation();
  const [agentsOpen, setAgentsOpen] = useState(true);
  const [channelsOpen, setChannelsOpen] = useState(true);
  
  const effectiveCollapsed = forceCollapsed || isCollapsed;

  const mainNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, route: '/dashboard' },
    { id: 'conversations', label: 'Conversas', icon: MessageSquare, route: '/conversations', badge: 18 },
    { id: 'customers', label: 'Clientes', icon: Users, route: '/customers' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, route: '/analytics' },
  ];

  const agentsNav = [
    { id: 'agents', label: 'Agentes de IA', icon: Bot, route: '/agents' },
    { id: 'flows', label: 'Flows', icon: GitBranch, route: '/flows', badge: 5 },
    { id: 'training', label: 'Treinamentos', icon: BookOpen, route: '/training' },
  ];

  const channelsNav = [
    { id: 'whatsapp', label: 'WhatsApp', icon: Phone, route: '/whatsapp' },
    { id: 'instagram', label: 'Instagram Direct', icon: Instagram, route: '/instagram-direct' },
    { id: 'webchat', label: 'Webchat', icon: Globe, route: '/webchat' },
  ];

  return (
    <aside 
      className={cn(
        "h-screen bg-sidebar border-r border-sidebar-border flex flex-col",
        effectiveCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo and collapse */}
      <div className={cn(
        "flex items-center border-b border-sidebar-border",
        effectiveCollapsed ? "justify-center px-2 py-4" : "justify-between px-4 py-4"
      )}>
        <div className={cn(
          "flex items-center gap-3",
          effectiveCollapsed && "gap-0"
        )}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-warning flex items-center justify-center shadow-lg shadow-primary/20 flex-shrink-0">
            <span className="text-primary-foreground font-bold text-lg">O</span>
          </div>
          <span className={cn(
            "font-semibold text-foreground whitespace-nowrap overflow-hidden",
            effectiveCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          )}>
            Orion.AI
          </span>
        </div>
        {!forceCollapsed && (
          <button 
            onClick={toggle}
            className={cn(
              "w-8 h-8 rounded-lg hover:bg-sidebar-accent flex items-center justify-center text-sidebar-foreground hover:text-foreground transition-colors",
              effectiveCollapsed && "absolute left-4 top-4"
            )}
          >
            {effectiveCollapsed ? <PanelLeft className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
          </button>
        )}
      </div>

      {/* User profile */}
      <div className={cn(
        "border-b border-sidebar-border",
        effectiveCollapsed ? "px-2 py-4" : "px-3 py-4"
      )}>
        <div className={cn(
          "flex items-center rounded-xl hover:bg-sidebar-accent cursor-pointer transition-colors",
          effectiveCollapsed ? "justify-center p-2" : "gap-3 p-2"
        )}>
          <img
            src="https://i.pravatar.cc/150?img=1"
            alt="Admin"
            className="w-10 h-10 rounded-full ring-2 ring-primary/20 flex-shrink-0"
          />
          <div className={cn(
            "flex-1 min-w-0 overflow-hidden",
            effectiveCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          )}>
            <p className="text-sm font-medium text-foreground truncate">Admin Loja ABC</p>
            <p className="text-xs text-muted-foreground truncate">Gerente</p>
          </div>
          {!effectiveCollapsed && <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto overflow-x-hidden scrollbar-thin">
        {/* Main Navigation */}
        {mainNav.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.route;
          
          return (
            <Link
              key={item.id}
              to={item.route}
              className={cn(
                "flex items-center rounded-xl text-sm font-medium transition-colors group relative",
                "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent",
                isActive && "bg-sidebar-accent text-foreground",
                effectiveCollapsed ? "justify-center px-2 py-2.5" : "gap-3 px-3 py-2.5"
              )}
              title={effectiveCollapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className={cn(
                "flex-1 whitespace-nowrap overflow-hidden",
                effectiveCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
              )}>
                {item.label}
              </span>
              {item.badge && !effectiveCollapsed && (
                <span className="min-w-[20px] h-5 px-1.5 flex items-center justify-center text-xs rounded-full bg-primary/15 text-primary font-semibold">
                  {item.badge}
                </span>
              )}
              {item.badge && effectiveCollapsed && (
                <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-[10px] rounded-full bg-primary text-primary-foreground font-semibold">
                  {item.badge > 9 ? '9+' : item.badge}
                </span>
              )}
            </Link>
          );
        })}

        {/* Agentes IA Dropdown */}
        <div className="pt-4">
          {!effectiveCollapsed && (
            <button
              onClick={() => setAgentsOpen(!agentsOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
            >
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                <span>Agentes IA</span>
              </div>
              {agentsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          )}
          
          {effectiveCollapsed && (
            <div className="flex justify-center mb-2">
              <div className="w-8 h-[1px] bg-sidebar-border"></div>
            </div>
          )}
          
          {(agentsOpen || effectiveCollapsed) && (
            <div className="space-y-1 mt-1">
              {agentsNav.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.route;
                
                return (
                  <Link
                    key={item.id}
                    to={item.route}
                    className={cn(
                      "flex items-center rounded-xl text-sm font-medium transition-colors group relative",
                      "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent",
                      isActive && "bg-sidebar-accent text-foreground",
                      effectiveCollapsed ? "justify-center px-2 py-2.5" : "gap-3 px-3 py-2.5 pl-6"
                    )}
                    title={effectiveCollapsed ? item.label : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className={cn(
                      "flex-1 whitespace-nowrap overflow-hidden",
                      effectiveCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                    )}>
                      {item.label}
                    </span>
                    {item.badge && !effectiveCollapsed && (
                      <span className="min-w-[20px] h-5 px-1.5 flex items-center justify-center text-xs rounded-full bg-primary/15 text-primary font-semibold">
                        {item.badge}
                      </span>
                    )}
                    {item.badge && effectiveCollapsed && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-[10px] rounded-full bg-primary text-primary-foreground font-semibold">
                        {item.badge > 9 ? '9+' : item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Atendimento Dropdown */}
        <div className="pt-4">
          {!effectiveCollapsed && (
            <button
              onClick={() => setChannelsOpen(!channelsOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span>Atendimento</span>
              </div>
              {channelsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          )}
          
          {effectiveCollapsed && (
            <div className="flex justify-center mb-2">
              <div className="w-8 h-[1px] bg-sidebar-border"></div>
            </div>
          )}
          
          {(channelsOpen || effectiveCollapsed) && (
            <div className="space-y-1 mt-1">
              {channelsNav.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.route;
                
                return (
                  <Link
                    key={item.id}
                    to={item.route}
                    className={cn(
                      "flex items-center rounded-xl text-sm font-medium transition-colors group relative",
                      "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent",
                      isActive && "bg-sidebar-accent text-foreground",
                      effectiveCollapsed ? "justify-center px-2 py-2.5" : "gap-3 px-3 py-2.5 pl-6"
                    )}
                    title={effectiveCollapsed ? item.label : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className={cn(
                      "flex-1 whitespace-nowrap overflow-hidden",
                      effectiveCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                    )}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="pt-4">
          {effectiveCollapsed && (
            <div className="flex justify-center mb-2">
              <div className="w-8 h-[1px] bg-sidebar-border"></div>
            </div>
          )}
          
          <Link
            to="/settings"
            className={cn(
              "flex items-center rounded-xl text-sm font-medium transition-colors",
              "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent",
              location.pathname === '/settings' && "bg-sidebar-accent text-foreground",
              effectiveCollapsed ? "justify-center px-2 py-2.5" : "gap-3 px-3 py-2.5"
            )}
            title={effectiveCollapsed ? 'Configurações' : undefined}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            <span className={cn(
              "whitespace-nowrap overflow-hidden",
              effectiveCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            )}>
              Configurações
            </span>
          </Link>
        </div>
      </nav>

      {/* Footer */}
      {!effectiveCollapsed && (
        <div className="p-3 border-t border-sidebar-border animate-fade-in">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
            <p className="text-xs font-medium text-foreground mb-1">Upgrade para Pro</p>
            <p className="text-xs text-muted-foreground mb-3">Desbloqueie IA ilimitada e mais recursos</p>
            <button className="w-full py-2 text-xs font-semibold text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors">
              Fazer Upgrade
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
