import { Search, HelpCircle, Bell, Filter, ArrowUpDown, Layers, Plus } from 'lucide-react';
import { teamMembers } from '@/data/mockData';

export function Header() {
  return (
    <header className="border-b border-border">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by task name"
              className="w-full pl-10 pr-4 py-2 bg-secondary rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Project header */}
      <div className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>Projects</span>
          <span>{'>'}</span>
          <span className="text-foreground">Product & Engineering</span>
        </div>
        
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Product & Engineering</h1>
          
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {teamMembers.slice(0, 4).map((member) => (
                <img
                  key={member.id}
                  src={member.avatar}
                  alt={member.name}
                  className="w-8 h-8 rounded-full border-2 border-background"
                />
              ))}
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground border-2 border-background">
                +5
              </div>
            </div>
            
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Plus className="w-4 h-4" />
              Invite members
            </button>
          </div>
        </div>
      </div>

      {/* Tabs and filters */}
      <div className="px-6 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {['Board', 'Timeline', 'Calendar', 'Dashboard', 'Progress', 'Forms'].map((tab, i) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                i === 0
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
          <button className="px-3 py-2 text-muted-foreground hover:text-foreground">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <button className="flex items-center gap-2 hover:text-foreground transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 hover:text-foreground transition-colors">
            <ArrowUpDown className="w-4 h-4" />
            Sort
          </button>
          <button className="flex items-center gap-2 hover:text-foreground transition-colors">
            <Layers className="w-4 h-4" />
            Group by
          </button>
        </div>
      </div>
    </header>
  );
}
