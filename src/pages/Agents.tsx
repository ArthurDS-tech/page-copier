import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { TrendingUp, Settings, BarChart3, Pause, Plus, Package, Briefcase, Heart, Eye, ArrowRight, Activity, Bot } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AgentDetailsDialog } from '@/components/agents/AgentDetailsDialog';

const agentsData = [
  {
    id: 'sales-coach',
    name: 'Sales Coach',
    icon: TrendingUp,
    status: 'active',
    description: 'Treina vendedores e sugere estratégias de vendas',
    frequency: 'Diário (8:00 AM)',
    stats: {
      conversations: 1247,
      resolution: 87,
      insights: 156,
      satisfaction: 4.8,
    },
    training: '230 casos de sucesso • 5.2k interações',
    cost: 28.63,
    included: true,
  },
  {
    id: 'customer-success',
    name: 'Customer Success',
    icon: Heart,
    status: 'active',
    description: 'Monitora saúde dos clientes e previne churn',
    frequency: 'Diário (9:00 AM)',
    stats: {
      conversations: 1247,
      resolution: 89,
      insights: 34,
      satisfaction: 4.6,
    },
    training: '320 casos • 8.7k interações',
    cost: 28.95,
    included: true,
  },
  {
    id: 'product-analyst',
    name: 'Product Analyst',
    icon: Package,
    status: 'inactive',
    description: 'Analisa dados e sugere melhorias em produtos',
    frequency: 'Semanal (Segunda-feira)',
    stats: {
      conversations: 0,
      resolution: 0,
      insights: 0,
      satisfaction: 0,
    },
    training: '180 relatórios • 3.8k interações',
    cost: 14.06,
    included: false,
  },
  {
    id: 'business-strategist',
    name: 'Business Strategist',
    icon: Briefcase,
    status: 'inactive',
    description: 'Cria estratégias de crescimento e expansão',
    frequency: 'Semanal (Sexta-feira)',
    stats: {
      conversations: 0,
      resolution: 0,
      insights: 0,
      satisfaction: 0,
    },
    training: '95 casos • 2.1k interações',
    cost: 13.92,
    included: false,
  },
  {
    id: 'general-ai',
    name: 'General AI Assistant',
    icon: Bot,
    status: 'inactive',
    description: 'Assistente geral treinado com seus dados',
    frequency: 'On-demand (24/7)',
    stats: {
      conversations: 0,
      resolution: 0,
      insights: 0,
      satisfaction: 0,
    },
    training: 'Responde perguntas instantaneamente',
    cost: 1.11,
    included: false,
  },
];

export default function Agents() {
  const { toast } = useToast();
  const [agents, setAgents] = useState(agentsData);
  const [upsellDialogOpen, setUpsellDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const currentPlan = 'growth'; // Simula plano atual
  const activeAgentsCount = agents.filter(a => a.status === 'active').length;
  const planLimits = {
    starter: 1,
    growth: 2,
    professional: 3,
    enterprise: 5,
  };
  const currentLimit = planLimits[currentPlan as keyof typeof planLimits];

  const handleToggleAgent = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    if (!agent) return;

    if (agent.status === 'inactive' && !agent.included) {
      // Abrir dialog de upsell
      setSelectedAgent(agent);
      setUpsellDialogOpen(true);
      return;
    }

    const newStatus = agent.status === 'active' ? 'paused' : 'active';
    setAgents(agents.map(a => 
      a.id === agentId ? { ...a, status: newStatus } : a
    ));

    toast({
      title: newStatus === 'active' ? 'Agente ativado!' : 'Agente pausado!',
      description: `${agent.name} foi ${newStatus === 'active' ? 'ativado' : 'pausado'} com sucesso.`,
    });
  };

  const handleAddAgent = () => {
    if (!selectedAgent) return;

    setAgents(agents.map(a => 
      a.id === selectedAgent.id ? { ...a, status: 'active', included: true } : a
    ));

    setUpsellDialogOpen(false);

    toast({
      title: 'Agente adicionado!',
      description: `${selectedAgent.name} foi adicionado por R$ ${(selectedAgent.cost * 3.5).toFixed(2)}/mês.`,
    });
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-8 space-y-8">
            {/* Header Section */}
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-foreground tracking-tight">Agentes Corporativos</h1>
                <p className="text-sm text-muted-foreground mt-1">Consultores virtuais analisando seu negócio continuamente</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Plano {currentPlan}</p>
                  <p className="text-sm font-medium text-foreground">{activeAgentsCount}/{currentLimit} ativos</p>
                </div>
                <Button variant="outline" size="sm" className="h-9">
                  Upgrade
                  <ArrowRight className="w-3 h-3 ml-2" />
                </Button>
              </div>
            </div>

            {/* Stats Grid - Minimal */}
            <div className="grid grid-cols-4 gap-6">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Insights gerados</p>
                <p className="text-2xl font-semibold text-foreground">
                  {agents.filter(a => a.status === 'active').reduce((acc, a) => acc + a.stats.insights, 0)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Taxa média</p>
                <p className="text-2xl font-semibold text-foreground">
                  {Math.round(agents.filter(a => a.status === 'active').reduce((acc, a) => acc + a.stats.resolution, 0) / activeAgentsCount || 0)}%
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Análises</p>
                <p className="text-2xl font-semibold text-foreground">
                  {agents.filter(a => a.status === 'active').reduce((acc, a) => acc + a.stats.conversations, 0)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Economia</p>
                <p className="text-2xl font-semibold text-foreground">R$ 3.5k</p>
              </div>
            </div>

            {/* Active Agents - Clean Design */}
            <div className="space-y-3">
              {agents.filter(a => a.status === 'active').map((agent) => {
                const Icon = agent.icon;
                return (
                  <div 
                    key={agent.id} 
                    className="group bg-card border border-border hover:border-primary/30 transition-all duration-200 rounded-lg overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-base font-medium text-foreground">{agent.name}</h3>
                              <div className="flex items-center gap-1">
                                <Activity className="w-3 h-3 text-green-500" />
                                <span className="text-xs text-muted-foreground">Ativo</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{agent.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">{agent.frequency}</p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => {
                            setSelectedAgent(agent);
                            setDetailsDialogOpen(true);
                          }}
                        >
                          Ver detalhes
                          <ArrowRight className="w-3 h-3 ml-2" />
                        </Button>
                      </div>

                      {/* Stats Row */}
                      <div className="grid grid-cols-4 gap-6 pt-4 border-t border-border">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Análises</p>
                          <p className="text-lg font-semibold text-foreground">{agent.stats.conversations.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Taxa de sucesso</p>
                          <p className="text-lg font-semibold text-foreground">{agent.stats.resolution}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Insights</p>
                          <p className="text-lg font-semibold text-foreground">{agent.stats.insights}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Satisfação</p>
                          <p className="text-lg font-semibold text-foreground">{agent.stats.satisfaction}/5</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="px-6 py-3 bg-muted/30 border-t border-border flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{agent.training}</p>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 text-xs">
                          <Settings className="w-3 h-3 mr-1" />
                          Config
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 text-xs">
                          <BarChart3 className="w-3 h-3 mr-1" />
                          Relatórios
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 text-xs"
                          onClick={() => handleToggleAgent(agent.id)}
                        >
                          <Pause className="w-3 h-3 mr-1" />
                          Pausar
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Available Agents - Minimal Cards */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-muted-foreground">Agentes disponíveis</h2>
                <p className="text-xs text-muted-foreground">R$ 99/mês cada</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {agents.filter(a => a.status === 'inactive').map((agent) => {
                  const Icon = agent.icon;
                  const priceInBRL = (agent.cost * 3.5).toFixed(2);
                  
                  return (
                    <div 
                      key={agent.id} 
                      className="group bg-card border border-dashed border-border hover:border-primary/50 transition-all duration-200 rounded-lg p-5"
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-foreground mb-1">{agent.name}</h3>
                          <p className="text-xs text-muted-foreground line-clamp-2">{agent.description}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="pt-3 border-t border-border">
                          <p className="text-xs text-muted-foreground mb-1">{agent.frequency}</p>
                          <p className="text-xs text-muted-foreground">{agent.training}</p>
                        </div>

                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full h-8 text-xs"
                          onClick={() => handleToggleAgent(agent.id)}
                        >
                          Adicionar
                          <Plus className="w-3 h-3 ml-2" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Info Footer */}
            <div className="pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Agentes corporativos analisam automaticamente suas conversas e geram insights acionáveis. 
                Adicione quantos precisar e cancele quando quiser.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Details Dialog */}
      <AgentDetailsDialog
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        agent={selectedAgent}
      />

      {/* Upsell Dialog */}
      <Dialog open={upsellDialogOpen} onOpenChange={setUpsellDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar {selectedAgent?.name}</DialogTitle>
            <DialogDescription>
              Expanda as capacidades da sua IA com este agente especializado
            </DialogDescription>
          </DialogHeader>

          {selectedAgent && (
            <div className="space-y-4 py-4">
              <div className="flex items-start gap-3">
                {(() => {
                  const Icon = selectedAgent.icon;
                  return (
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  );
                })()}
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{selectedAgent.name}</h4>
                  <p className="text-sm text-muted-foreground">{selectedAgent.description}</p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium text-foreground">O que você ganha:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✅ Análise automática especializada</li>
                  <li>✅ Relatórios {selectedAgent.frequency.toLowerCase()}</li>
                  <li>✅ Insights acionáveis</li>
                  <li>✅ Recomendações personalizadas</li>
                </ul>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Custo mensal:</span>
                  <span className="text-2xl font-bold text-primary">R$ {(selectedAgent.cost * 3.5).toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Cobrado junto com seu plano atual. Cancele quando quiser.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setUpsellDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddAgent}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Agente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
