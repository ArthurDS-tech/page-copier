import { KanbanColumn } from './KanbanColumn';
import { columns } from '@/data/mockData';

export function KanbanBoard() {
  return (
    <div className="flex-1 overflow-x-auto p-6 bg-background">
      <div className="flex gap-6 min-w-max pb-6">
        {columns.map((column) => (
          <KanbanColumn key={column.id} column={column} />
        ))}
      </div>
    </div>
  );
}
