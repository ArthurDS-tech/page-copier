import { Calendar, Paperclip, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Task, Priority } from '@/types/kanban';
import { cn } from '@/lib/utils';

const priorityLabels: Record<Priority, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
  done: 'Done',
};

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const avatarCount = task.assignees.length;
  const showExtraCount = avatarCount > 2;
  const visibleAvatars = task.assignees.slice(0, 2);
  const extraCount = avatarCount - 2;

  return (
    <div className="bg-card rounded-xl p-4 space-y-3 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer border border-border group">
      {/* Date and priority */}
      <div className="flex items-center justify-between">
        {task.dueDate ? (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            <span>{task.dueDate}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            <span>No due date</span>
          </div>
        )}
        <Badge variant={task.priority}>{priorityLabels[task.priority]}</Badge>
      </div>

      {/* Title */}
      <h3 className="text-sm font-medium text-foreground leading-snug group-hover:text-primary transition-colors">
        {task.title}
      </h3>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1">
        {/* Avatars */}
        <div className="flex items-center">
          {visibleAvatars.map((_, i) => (
            <img
              key={i}
              src={`https://i.pravatar.cc/150?img=${i + 10 + parseInt(task.id)}`}
              alt="Assignee"
              className={cn(
                "w-7 h-7 rounded-full border-2 border-card shadow-sm",
                i > 0 && "-ml-2"
              )}
            />
          ))}
          {showExtraCount && (
            <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground -ml-2 border-2 border-card">
              +{extraCount}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-muted-foreground">
          {task.attachments > 0 && (
            <div className="flex items-center gap-1 text-xs hover:text-foreground transition-colors">
              <Paperclip className="w-3.5 h-3.5" />
              <span>{task.attachments}</span>
            </div>
          )}
          {task.comments > 0 && (
            <div className="flex items-center gap-1 text-xs hover:text-foreground transition-colors">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{task.comments}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
