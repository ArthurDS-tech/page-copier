import { Home, CheckCircle, Inbox, BarChart3, FileText, Calendar, Settings, Plus, PanelLeftClose } from 'lucide-react';
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
    <aside className="w-60 h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo and collapse */}
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-warning flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">A</span>
          </div>
        </div>
        <button className="text-sidebar-foreground hover:text-foreground transition-colors">
          <PanelLeftClose className="w-5 h-5" />
        </button>
      </div>

      {/* User profile */}
      <div className="px-4 py-3 flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/150?img=1"
          alt="Nancy Martino"
          className="w-9 h-9 rounded-full"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">Nancy Martino</p>
          <p className="text-xs text-muted-foreground truncate">Designer</p>
        </div>
        <button className="text-muted-foreground hover:text-foreground">
          <span className="text-lg">···</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <a
              key={item.id}
              href="#"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-primary/20 text-primary">
                  {item.badge}
                </span>
              )}
            </a>
          );
        })}

        {/* Projects section */}
        <div className="pt-6">
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Projects
            </span>
            <button className="text-muted-foreground hover:text-foreground">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          {projects.map((project) => (
            <a
              key={project.id}
              href="#"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                project.isActive
                  ? "text-foreground bg-sidebar-accent border-l-2 border-primary"
                  : "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent"
              )}
            >
              <span>{project.name}</span>
            </a>
          ))}
        </div>
      </nav>
    </aside>
  );
}
