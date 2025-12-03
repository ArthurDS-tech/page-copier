import { useState } from 'react';
import { KanbanColumn } from './KanbanColumn';
import { ConversationDialog } from './ConversationDialog';
import { columns } from '@/data/mockData';
import { Conversation } from '@/types/kanban';

export function KanbanBoard() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleConversationClick = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setDialogOpen(true);
  };

  return (
    <>
      <div className="flex-1 overflow-x-auto p-6 bg-background">
        <div className="flex gap-6 min-w-max pb-6">
          {columns.map((column) => (
            <KanbanColumn 
              key={column.id} 
              column={column}
              onConversationClick={handleConversationClick}
            />
          ))}
        </div>
      </div>

      <ConversationDialog
        conversation={selectedConversation}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}
