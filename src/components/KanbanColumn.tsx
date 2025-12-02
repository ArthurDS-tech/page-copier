import { MoreHorizontal, Plus } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { Column } from '@/types/kanban';

interface KanbanColumnProps {
  column: Column;
}

export function KanbanColumn({ column }: KanbanColumnProps) {
  return (
    <div className="flex-shrink-0 w-72">
      {/* Column header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium text-muted-foreground">{column.title}</h2>
          <span className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">
            {column.count}
          </span>
        </div>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        
        {/* Add task button */}
        <button className="w-full flex items-center justify-center gap-2 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-card/50 rounded-lg transition-colors border border-dashed border-border">
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
