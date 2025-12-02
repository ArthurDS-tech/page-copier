import { Home, CheckCircle, Inbox, BarChart3, FileText, Calendar, Settings, Plus, PanelLeftClose, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navItems, projects } from '@/data/mockData';

const iconMap: Record<string, React.ElementType> = {
  'home': Home,
  'check-circle': CheckCircle,
  'inbox': Inbox,
  'bar-chart': BarChart3,
  'file-text': FileText,
  'calendar': Calendar,
  'settings': Settings,
};

export function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo and collapse */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-warning flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-primary-foreground font-bold text-lg">A</span>
          </div>
          <span className="font-semibold text-foreground">TaskFlow</span>
        </div>
        <button className="w-8 h-8 rounded-lg hover:bg-sidebar-accent flex items-center justify-center text-sidebar-foreground hover:text-foreground transition-colors">
          <PanelLeftClose className="w-5 h-5" />
        </button>
      </div>

      {/* User profile */}
      <div className="px-3 py-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-sidebar-accent cursor-pointer transition-colors">
          <img
            src="https://i.pravatar.cc/150?img=1"
            alt="Nancy Martino"
            className="w-10 h-10 rounded-full ring-2 ring-primary/20"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Nancy Martino</p>
            <p className="text-xs text-muted-foreground truncate">Designer</p>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <a
              key={item.id}
              href="#"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent",
                item.id === 'home' && "bg-sidebar-accent text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="min-w-[20px] h-5 px-1.5 flex items-center justify-center text-xs rounded-full bg-primary/15 text-primary font-semibold">
                  {item.badge}
                </span>
              )}
            </a>
          );
        })}

        {/* Projects section */}
        <div className="pt-6">
          <div className="flex items-center justify-between px-3 mb-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Projects
            </span>
            <button className="w-6 h-6 rounded-md hover:bg-sidebar-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-1">
            {projects.map((project) => (
              <a
                key={project.id}
                href="#"
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  project.isActive
                    ? "text-foreground bg-sidebar-accent shadow-sm"
                    : "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent"
                )}
              >
                <span className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  project.isActive ? "bg-primary" : "bg-muted-foreground/50"
                )}></span>
                <span>{project.name}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-warning/10 border border-primary/20">
          <p className="text-xs font-medium text-foreground mb-1">Upgrade to Pro</p>
          <p className="text-xs text-muted-foreground mb-3">Get unlimited projects and features</p>
          <button className="w-full py-2 text-xs font-semibold text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
}
