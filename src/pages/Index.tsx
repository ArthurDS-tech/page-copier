import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { KanbanBoard } from '@/components/KanbanBoard';

const Index = () => {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <KanbanBoard />
      </div>
    </div>
  );
};

export default Index;
