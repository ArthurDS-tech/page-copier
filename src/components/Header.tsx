import { Search, HelpCircle, Bell, Filter, ArrowUpDown, Layers, Plus } from 'lucide-react';
import { teamMembers } from '@/data/mockData';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by task name"
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

      {/* Project header */}
      <div className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span className="hover:text-foreground cursor-pointer transition-colors">Projects</span>
          <span className="text-muted-foreground/50">{'>'}</span>
          <span className="text-foreground font-medium">Product & Engineering</span>
        </div>
        
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Product & Engineering</h1>
          
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {teamMembers.slice(0, 4).map((member) => (
                <img
                  key={member.id}
                  src={member.avatar}
                  alt={member.name}
                  className="w-9 h-9 rounded-full border-2 border-card shadow-sm hover:scale-110 transition-transform cursor-pointer"
                />
              ))}
              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground border-2 border-card shadow-sm">
                +5
              </div>
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              Invite members
            </button>
          </div>
        </div>
      </div>

      {/* Tabs and filters */}
      <div className="px-6 flex items-center justify-between">
        <div className="flex items-center">
          {['Board', 'Timeline', 'Calendar', 'Dashboard', 'Progress', 'Forms'].map((tab, i) => (
            <button
              key={tab}
              className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                i === 0
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
              {i === 0 && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"></span>
              )}
            </button>
          ))}
          <button className="px-3 py-3 text-muted-foreground hover:text-foreground transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors">
            <ArrowUpDown className="w-4 h-4" />
            Sort
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors">
            <Layers className="w-4 h-4" />
            Group by
          </button>
        </div>
      </div>
    </header>
  );
}
