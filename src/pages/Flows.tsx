import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { GitBranch, Play, Pause, Edit, Trash2, BarChart3, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FlowDialog } from '@/components/FlowDialog';
import { FlowMetricsDialog } from '@/components/FlowMetricsDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const initialFlows = [
  {
    id: '1',
    name: 'Boas-vindas Automáticas',
    status: 'active',
    trigger: '📥 Nova mensagem de cliente desconhecido',
    steps: [
      'Enviar mensagem de boas-vindas',
      'Adicionar tag "novo_cliente"',
      'Criar registro no CRM',
      'Notificar equipe de vendas',
    ],
    agents: ['agent-1', 'agent-3'],
    products: ['prod-1'],
    executions: 247,
    successRate: 98,
    lastExecution: 'há 5 minutos',
  },
  {
    id: '2',
    name: 'Follow-up Automático',
    status: 'active',
    trigger: '⏰ 24h sem resposta do cliente',
    steps: [
      'Verificar se cliente está ativo',
      'Enviar mensagem de follow-up',
      'Se não responder em 48h → Notificar gerente',
    ],
    agents: ['agent-2'],
    products: [],
    executions: 89,
    successRate: 95,
    lastExecution: 'há 1 hora',
  },
  {
    id: '3',
    name: 'Qualificação de Leads',
    status: 'paused',
    trigger: '🏷️ Tag "lead" adicionada',
    steps: [
      'Fazer 3 perguntas de qualificação',
      'Calcular score baseado nas respostas',
      'Se score > 70 → Tag "hot_lead"',
      'Se score < 30 → Tag "cold_lead"',
      'Notificar vendedor responsável',
    ],
    agents: ['agent-1'],
    products: ['prod-2', 'prod-3'],
    executions: 156,
    successRate: 92,
    lastExecution: 'há 3 dias',
  },
  {
    id: '4',
    name: 'Carrinho Abandonado',
    status: 'active',
    trigger: '🛒 Produto adicionado mas não comprado',
    steps: [
      'Aguardar 2 horas',
      'Enviar lembrete com desconto de 10%',
      'Se não comprar em 24h → Desconto de 15%',
      'Notificar equipe de vendas',
    ],
    agents: ['agent-1'],
    products: ['prod-1', 'prod-2'],
    executions: 134,
    successRate: 87,
    lastExecution: 'há 30 minutos',
  },
  {
    id: '5',
    name: 'Pesquisa de Satisfação',
    status: 'active',
    trigger: '✅ Conversa marcada como resolvida',
    steps: [
      'Aguardar 1 hora',
      'Enviar pesquisa NPS',
      'Se nota < 7 → Escalar para gerente',
      'Registrar feedback no CRM',
    ],
    agents: ['agent-2'],
    products: [],
    executions: 312,
    successRate: 94,
    lastExecution: 'há 15 minutos',
  },
  {
    id: '6',
    name: 'Aniversário do Cliente',
    status: 'active',
    trigger: '🎂 Data de aniversário',
    steps: [
      'Enviar mensagem de parabéns',
      'Oferecer cupom de desconto especial',
      'Adicionar tag "aniversariante"',
    ],
    agents: ['agent-3'],
    products: ['prod-1'],
    executions: 45,
    successRate: 100,
    lastExecution: 'há 2 horas',
  },
];

const templates = [
  { id: '1', name: 'Boas-vindas', icon: '📥' },
  { id: '2', name: 'Follow-up', icon: '⏰' },
  { id: '3', name: 'Qualificação', icon: '🎯' },
  { id: '4', name: 'Carrinho abandonado', icon: '🛒' },
  { id: '5', name: 'Aniversário', icon: '🎂' },
  { id: '6', name: 'Pesquisa NPS', icon: '📊' },
];

export default function Flows() {
  const { toast } = useToast();
  const [flows, setFlows] = useState(initialFlows);
  const [filteredFlows, setFilteredFlows] = useState(initialFlows);
  const [statusFilter, setStatusFilter] = useState('all');
  const [triggerFilter, setTriggerFilter] = useState('all-triggers');
  
  // Dialogs state
  const [flowDialogOpen, setFlowDialogOpen] = useState(false);
  const [metricsDialogOpen, setMetricsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedFlow, setSelectedFlow] = useState<any>(null);

  // Filter flows
  const applyFilters = (statusF: string, triggerF: string, flowsList = flows) => {
    let filtered = [...flowsList];
    
    if (statusF !== 'all') {
      filtered = filtered.filter(f => f.status === statusF);
    }
    
    if (triggerF !== 'all-triggers') {
      filtered = filtered.filter(f => f.trigger.includes(triggerF));
    }
    
    setFilteredFlows(filtered);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    applyFilters(value, triggerFilter);
  };

  const handleTriggerFilterChange = (value: string) => {
    setTriggerFilter(value);
    applyFilters(statusFilter, value);
  };

  // Create/Edit flow
  const handleSaveFlow = (flowData: any) => {
    const existingIndex = flows.findIndex(f => f.id === flowData.id);
    let newFlows;
    
    if (existingIndex >= 0) {
      // Edit existing
      newFlows = [...flows];
      newFlows[existingIndex] = flowData;
      toast({
        title: 'Flow atualizado!',
        description: `O flow "${flowData.name}" foi atualizado com sucesso.`,
      });
    } else {
      // Create new
      newFlows = [...flows, flowData];
      toast({
        title: 'Flow criado!',
        description: `O flow "${flowData.name}" foi criado com sucesso.`,
      });
    }
    
    setFlows(newFlows);
    applyFilters(statusFilter, triggerFilter, newFlows);
  };

  // Toggle flow status
  const handleToggleStatus = (flowId: string) => {
    const newFlows = flows.map(f => {
      if (f.id === flowId) {
        const newStatus = f.status === 'active' ? 'paused' : 'active';
        toast({
          title: newStatus === 'active' ? 'Flow ativado!' : 'Flow pausado!',
          description: `O flow "${f.name}" foi ${newStatus === 'active' ? 'ativado' : 'pausado'}.`,
        });
        return { ...f, status: newStatus };
      }
      return f;
    });
    setFlows(newFlows);
    applyFilters(statusFilter, triggerFilter, newFlows);
  };

  // Delete flow
  const handleDeleteFlow = () => {
    if (!selectedFlow) return;
    
    const newFlows = flows.filter(f => f.id !== selectedFlow.id);
    setFlows(newFlows);
    applyFilters(statusFilter, triggerFilter, newFlows);
    setDeleteDialogOpen(false);
    
    toast({
      title: 'Flow excluído!',
      description: `O flow "${selectedFlow.name}" foi excluído com sucesso.`,
      variant: 'destructive',
    });
  };

  // Open dialogs
  const handleCreateFlow = () => {
    setSelectedFlow(null);
    setFlowDialogOpen(true);
  };

  const handleEditFlow = (flow: any) => {
    setSelectedFlow(flow);
    setFlowDialogOpen(true);
  };

  const handleViewMetrics = (flow: any) => {
    setSelectedFlow(flow);
    setMetricsDialogOpen(true);
  };

  const handleDeleteClick = (flow: any) => {
    setSelectedFlow(flow);
    setDeleteDialogOpen(true);
  };

  // Use template
  const handleUseTemplate = (template: any) => {
    const templateFlows: Record<string, any> = {
      '1': {
        name: 'Boas-vindas Automáticas',
        trigger: '📥 Nova mensagem de cliente desconhecido',
        steps: [
          'Enviar mensagem de boas-vindas',
          'Adicionar tag "novo_cliente"',
          'Criar registro no CRM',
        ],
      },
      '2': {
        name: 'Follow-up Automático',
        trigger: '⏰ 24h sem resposta do cliente',
        steps: [
          'Verificar se cliente está ativo',
          'Enviar mensagem de follow-up',
        ],
      },
      '3': {
        name: 'Qualificação de Leads',
        trigger: '🏷️ Tag adicionada',
        steps: [
          'Fazer 3 perguntas de qualificação',
          'Calcular score baseado nas respostas',
          'Notificar vendedor responsável',
        ],
      },
      '4': {
        name: 'Carrinho Abandonado',
        trigger: '🛒 Produto adicionado mas não comprado',
        steps: [
          'Aguardar 2 horas',
          'Enviar lembrete com desconto',
        ],
      },
      '5': {
        name: 'Aniversário do Cliente',
        trigger: '🎂 Data de aniversário',
        steps: [
          'Enviar mensagem de parabéns',
          'Oferecer cupom de desconto especial',
        ],
      },
      '6': {
        name: 'Pesquisa NPS',
        trigger: '✅ Conversa marcada como resolvida',
        steps: [
          'Aguardar 1 hora',
          'Enviar pesquisa NPS',
        ],
      },
    };

    const templateData = templateFlows[template.id];
    if (templateData) {
      setSelectedFlow(templateData);
      setFlowDialogOpen(true);
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Automações (Flows)</h1>
                <p className="text-muted-foreground">Crie e gerencie fluxos automáticos de atendimento</p>
              </div>
              <Button onClick={handleCreateFlow}>
                <Plus className="w-4 h-4 mr-2" />
                Criar novo flow
              </Button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3">
              <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Ativos</SelectItem>
                  <SelectItem value="paused">Pausados</SelectItem>
                  <SelectItem value="inactive">Inativos</SelectItem>
                </SelectContent>
              </Select>

              <Select value={triggerFilter} onValueChange={handleTriggerFilterChange}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-triggers">Todos os triggers</SelectItem>
                  <SelectItem value="📥">Nova mensagem</SelectItem>
                  <SelectItem value="🏷️">Tag adicionada</SelectItem>
                  <SelectItem value="⏰">Tempo decorrido</SelectItem>
                  <SelectItem value="🛒">Carrinho abandonado</SelectItem>
                  <SelectItem value="✅">Conversa resolvida</SelectItem>
                  <SelectItem value="🎂">Aniversário</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex-1"></div>
              
              <Badge variant="outline" className="text-sm">
                {filteredFlows.length} flow{filteredFlows.length !== 1 ? 's' : ''}
              </Badge>
            </div>

            {/* Flows List */}
            <div className="space-y-4">
              {filteredFlows.length === 0 ? (
                <div className="bg-card rounded-xl border border-border p-12 text-center">
                  <GitBranch className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum flow encontrado</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {statusFilter !== 'all' || triggerFilter !== 'all-triggers'
                      ? 'Tente ajustar os filtros ou criar um novo flow.'
                      : 'Comece criando seu primeiro flow de automação.'}
                  </p>
                  <Button onClick={handleCreateFlow}>
                    <Plus className="w-4 h-4 mr-2" />
                    Criar primeiro flow
                  </Button>
                </div>
              ) : (
                filteredFlows.map((flow) => (
                <div key={flow.id} className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
                  {/* Flow Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <GitBranch className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground">{flow.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          <span className="font-medium">Trigger:</span> {flow.trigger}
                        </p>
                        {/* Agentes e Produtos */}
                        {(flow.agents?.length > 0 || flow.products?.length > 0) && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {flow.agents?.map((agentId: string) => (
                              <Badge key={agentId} variant="outline" className="text-xs bg-blue-500/10 text-blue-500 border-blue-500/20">
                                🤖 {agentId.replace('agent-', 'Agente ')}
                              </Badge>
                            ))}
                            {flow.products?.map((productId: string) => (
                              <Badge key={productId} variant="outline" className="text-xs bg-green-500/10 text-green-500 border-green-500/20">
                                📦 {productId.replace('prod-', 'Produto ')}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <Badge variant={flow.status === 'active' ? 'default' : 'secondary'} className="flex-shrink-0">
                      {flow.status === 'active' ? '✓ Ativo' : '⏸️ Pausado'}
                    </Badge>
                  </div>

                  {/* Flow Steps */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-foreground mb-3">Fluxo:</p>
                    <div className="space-y-2">
                      {flow.steps.map((step, index) => (
                        <div key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                            {index + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Flow Stats */}
                  <div className="flex items-center gap-6 mb-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Executado: </span>
                      <span className="font-semibold text-foreground">{flow.executions} vezes</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Taxa de sucesso: </span>
                      <span className="font-semibold text-success">{flow.successRate}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Última execução: </span>
                      <span className="font-semibold text-foreground">{flow.lastExecution}</span>
                    </div>
                  </div>

                  {/* Flow Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t border-border">
                    <Button variant="outline" size="sm" onClick={() => handleEditFlow(flow)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleViewMetrics(flow)}>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Ver métricas
                    </Button>
                    {flow.status === 'active' ? (
                      <Button variant="outline" size="sm" onClick={() => handleToggleStatus(flow.id)}>
                        <Pause className="w-4 h-4 mr-2" />
                        Pausar
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => handleToggleStatus(flow.id)}>
                        <Play className="w-4 h-4 mr-2" />
                        Ativar
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteClick(flow)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Excluir
                    </Button>
                  </div>
                </div>
              ))
              )}
            </div>

            {/* Templates Section */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">💡 Templates de Flows</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Comece rápido com nossos templates prontos
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {templates.map((template) => (
                  <Button
                    key={template.id}
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center gap-2"
                    onClick={() => handleUseTemplate(template)}
                  >
                    <span className="text-2xl">{template.icon}</span>
                    <span className="text-xs text-center">{template.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <GitBranch className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">Dica: Automatize seu atendimento</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Flows permitem que você crie automações poderosas sem código. Configure triggers, 
                    defina ações e deixe a IA fazer o trabalho pesado por você.
                  </p>
                  <Button variant="outline" size="sm">
                    Saiba mais sobre Flows
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <FlowDialog
        open={flowDialogOpen}
        onOpenChange={setFlowDialogOpen}
        flow={selectedFlow}
        onSave={handleSaveFlow}
      />

      <FlowMetricsDialog
        open={metricsDialogOpen}
        onOpenChange={setMetricsDialogOpen}
        flow={selectedFlow}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O flow "{selectedFlow?.name}" será excluído permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteFlow} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
