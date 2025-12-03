import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Settings, 
  BookOpen, 
  BarChart3, 
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  Target,
  Zap,
  Brain,
  FileText,
  Calendar,
  Users,
  DollarSign
} from 'lucide-react';
import { AgentOverviewTab } from '@/components/agents/tabs/AgentOverviewTab';
import { AgentConfigTab } from '@/components/agents/tabs/AgentConfigTab';
import { AgentTrainingTab } from '@/components/agents/tabs/AgentTrainingTab';
import { AgentReportsTab } from '@/components/agents/tabs/AgentReportsTab';
import { AgentAnalyticsTab } from '@/components/agents/tabs/AgentAnalyticsTab';

interface AgentDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agent: any;
}

export function AgentDetailsDialog({ open, onOpenChange, agent }: AgentDetailsDialogProps) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!agent) return null;

  const Icon = agent.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl">{agent.name}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">{agent.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                  {agent.status === 'active' ? '✓ Ativo' : '⏸ Pausado'}
                </Badge>
                <Badge variant="outline">
                  <Clock className="w-3 h-3 mr-1" />
                  {agent.frequency}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="text-xs">
              <Activity className="w-4 h-4 mr-1" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="config" className="text-xs">
              <Settings className="w-4 h-4 mr-1" />
              Configurações
            </TabsTrigger>
            <TabsTrigger value="training" className="text-xs">
              <BookOpen className="w-4 h-4 mr-1" />
              Treinamento
            </TabsTrigger>
            <TabsTrigger value="reports" className="text-xs">
              <FileText className="w-4 h-4 mr-1" />
              Relatórios
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs">
              <BarChart3 className="w-4 h-4 mr-1" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto mt-4">
            <TabsContent value="overview" className="mt-0">
              <AgentOverviewTab agent={agent} />
            </TabsContent>

            <TabsContent value="config" className="mt-0">
              <AgentConfigTab agent={agent} />
            </TabsContent>

            <TabsContent value="training" className="mt-0">
              <AgentTrainingTab agent={agent} />
            </TabsContent>

            <TabsContent value="reports" className="mt-0">
              <AgentReportsTab agent={agent} />
            </TabsContent>

            <TabsContent value="analytics" className="mt-0">
              <AgentAnalyticsTab agent={agent} />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
