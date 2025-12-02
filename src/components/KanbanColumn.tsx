import { MoreHorizontal, Plus } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { Column } from '@/types/kanban';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  column: Column;
}

const columnColors: Record<string, string> = {
  backlog: 'bg-muted-foreground',
  todo: 'bg-primary',
  progress: 'bg-warning',
  done: 'bg-success',
};

export function KanbanColumn({ column }: KanbanColumnProps) {
  return (
    <div className="flex-shrink-0 w-80">
      {/* Column header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-3">
          <span className={cn("w-2 h-2 rounded-full", columnColors[column.id])}></span>
          <h2 className="text-sm font-semibold text-foreground">{column.title}</h2>
          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-muted text-muted-foreground">
            {column.count}
          </span>
        </div>
        <button className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        
        {/* Add task button */}
        <button className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all border-2 border-dashed border-border hover:border-primary/30">
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>
    </div>
  );
}
