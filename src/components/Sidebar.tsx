import { LayoutDashboard, Inbox, MessageSquare, BarChart3, Users, GitBranch, Settings, Plus, PanelLeftClose, PanelLeft, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navItems, channels } from '@/data/mockData';
import { useSidebar } from '@/hooks/useSidebar';

const iconMap: Record<string, React.ElementType> = {
  'layout-dashboard': LayoutDashboard,
  'inbox': Inbox,
  'message-square': MessageSquare,
  'bar-chart': BarChart3,
  'users': Users,
  'git-branch': GitBranch,
  'settings': Settings,
};

export function Sidebar() {
  const { isCollapsed, toggle } = useSidebar();

  return (
    <aside 
      className={cn(
        "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo and collapse */}
      <div className={cn(
        "flex items-center border-b border-sidebar-border transition-all duration-300",
        isCollapsed ? "justify-center px-2 py-4" : "justify-between px-4 py-4"
      )}>
        <div className={cn(
          "flex items-center gap-3 transition-all duration-300",
          isCollapsed && "gap-0"
        )}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-warning flex items-center justify-center shadow-lg shadow-primary/20 flex-shrink-0">
            <span className="text-primary-foreground font-bold text-lg">A</span>
          </div>
          <span className={cn(
            "font-semibold text-foreground whitespace-nowrap overflow-hidden transition-all duration-300",
            isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          )}>
            Orion.AI
          </span>
        </div>
        <button 
          onClick={toggle}
          className={cn(
            "w-8 h-8 rounded-lg hover:bg-sidebar-accent flex items-center justify-center text-sidebar-foreground hover:text-foreground transition-all duration-200",
            isCollapsed && "absolute left-4 top-4"
          )}
        >
          {isCollapsed ? <PanelLeft className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
        </button>
      </div>

      {/* User profile */}
      <div className={cn(
        "border-b border-sidebar-border transition-all duration-300",
        isCollapsed ? "px-2 py-4" : "px-3 py-4"
      )}>
        <div className={cn(
          "flex items-center rounded-xl hover:bg-sidebar-accent cursor-pointer transition-all duration-200",
          isCollapsed ? "justify-center p-2" : "gap-3 p-2"
        )}>
          <img
            src="https://i.pravatar.cc/150?img=1"
            alt="Nancy Martino"
            className="w-10 h-10 rounded-full ring-2 ring-primary/20 flex-shrink-0"
          />
          <div className={cn(
            "flex-1 min-w-0 overflow-hidden transition-all duration-300",
            isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          )}>
            <p className="text-sm font-medium text-foreground truncate">Admin Loja ABC</p>
            <p className="text-xs text-muted-foreground truncate">Gerente</p>
          </div>
          {!isCollapsed && <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto overflow-x-hidden scrollbar-thin">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <a
              key={item.id}
              href="#"
              className={cn(
                "flex items-center rounded-xl text-sm font-medium transition-all duration-200 group relative",
                "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent",
                item.id === 'dashboard' && "bg-sidebar-accent text-foreground",
                isCollapsed ? "justify-center px-2 py-2.5" : "gap-3 px-3 py-2.5"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className={cn(
                "flex-1 whitespace-nowrap overflow-hidden transition-all duration-300",
                isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
              )}>
                {item.label}
              </span>
              {item.badge && !isCollapsed && (
                <span className="min-w-[20px] h-5 px-1.5 flex items-center justify-center text-xs rounded-full bg-primary/15 text-primary font-semibold">
                  {item.badge}
                </span>
              )}
              {item.badge && isCollapsed && (
                <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-[10px] rounded-full bg-primary text-primary-foreground font-semibold">
                  {item.badge > 9 ? '9+' : item.badge}
                </span>
              )}
            </a>
          );
        })}

        {/* Channels section */}
        <div className={cn(
          "pt-6 transition-all duration-300",
          isCollapsed && "pt-4"
        )}>
          {!isCollapsed && (
            <div className="flex items-center justify-between px-3 mb-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Canais
              </span>
              <button className="w-6 h-6 rounded-md hover:bg-sidebar-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
          
          {isCollapsed && (
            <div className="flex justify-center mb-2">
              <div className="w-8 h-[1px] bg-sidebar-border"></div>
            </div>
          )}
          
          <div className="space-y-1">
            {channels.map((channel) => (
              <a
                key={channel.id}
                href="#"
                className={cn(
                  "flex items-center rounded-xl text-sm font-medium transition-all duration-200",
                  channel.isActive
                    ? "text-foreground bg-sidebar-accent shadow-sm"
                    : "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent",
                  isCollapsed ? "justify-center px-2 py-2.5" : "gap-3 px-3 py-2.5"
                )}
                title={isCollapsed ? channel.name : undefined}
              >
                <span className={cn(
                  "w-2 h-2 rounded-full flex-shrink-0",
                  channel.isActive ? "bg-success" : "bg-muted-foreground/50"
                )}></span>
                <span className={cn(
                  "whitespace-nowrap overflow-hidden transition-all duration-300",
                  isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                )}>
                  {channel.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
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
