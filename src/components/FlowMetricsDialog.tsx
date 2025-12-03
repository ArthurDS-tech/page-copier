import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity, CheckCircle, XCircle, Clock } from 'lucide-react';

interface FlowMetricsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  flow: any;
}

export function FlowMetricsDialog({ open, onOpenChange, flow }: FlowMetricsDialogProps) {
  if (!flow) return null;

  // Dados mock para o gráfico
  const executionData = [
    { day: 'Seg', executions: 45, success: 43 },
    { day: 'Ter', executions: 52, success: 50 },
    { day: 'Qua', executions: 38, success: 37 },
    { day: 'Qui', executions: 61, success: 59 },
    { day: 'Sex', executions: 48, success: 47 },
    { day: 'Sáb', executions: 23, success: 22 },
    { day: 'Dom', executions: 18, success: 18 },
  ];

  const maxExecutions = Math.max(...executionData.map(d => d.executions));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Métricas: {flow.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Execuções</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{flow.executions}</p>
              <p className="text-xs text-success flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                +12% vs semana passada
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm text-muted-foreground">Taxa de Sucesso</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{flow.successRate}%</p>
              <p className="text-xs text-success flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                +3% vs semana passada
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-4 h-4 text-destructive" />
                <span className="text-sm text-muted-foreground">Falhas</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {Math.round(flow.executions * (1 - flow.successRate / 100))}
              </p>
              <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                <TrendingDown className="w-3 h-3" />
                -5% vs semana passada
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-warning" />
                <span className="text-sm text-muted-foreground">Tempo Médio</span>
              </div>
              <p className="text-2xl font-bold text-foreground">2.3s</p>
              <p className="text-xs text-success flex items-center gap-1 mt-1">
                <TrendingDown className="w-3 h-3" />
                -0.5s vs semana passada
              </p>
            </div>
          </div>

          {/* Gráfico de Execuções */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Execuções nos Últimos 7 Dias</h3>
            <div className="space-y-3">
              {executionData.map((data) => (
                <div key={data.day} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-8">{data.day}</span>
                  <div className="flex-1 flex gap-1">
                    <div className="flex-1 bg-muted rounded-full h-8 flex items-center overflow-hidden">
                      <div
                        className="bg-primary h-full flex items-center justify-end pr-2"
                        style={{ width: `${(data.executions / maxExecutions) * 100}%` }}
                      >
                        <span className="text-xs text-primary-foreground font-medium">
                          {data.executions}
                        </span>
                      </div>
                    </div>
                    <div className="w-16 text-xs text-muted-foreground flex items-center">
                      {data.success}/{data.executions}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-muted-foreground">Total de execuções</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <span className="text-muted-foreground">Execuções bem-sucedidas</span>
              </div>
            </div>
          </div>

          {/* Detalhes do Flow */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Detalhes do Flow</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant={flow.status === 'active' ? 'default' : 'secondary'}>
                  {flow.status === 'active' ? 'Ativo' : 'Pausado'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Trigger</span>
                <span className="text-sm text-foreground">{flow.trigger}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Número de passos</span>
                <span className="text-sm text-foreground">{flow.steps.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Última execução</span>
                <span className="text-sm text-foreground">{flow.lastExecution}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Criado em</span>
                <span className="text-sm text-foreground">13 Nov 2025</span>
              </div>
            </div>
          </div>

          {/* Performance por Passo */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Performance por Passo</h3>
            <div className="space-y-3">
              {flow.steps.map((step: string, index: number) => {
                const successRate = 100 - (index * 2); // Mock data
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                          {index + 1}
                        </span>
                        <span className="text-sm text-foreground">{step}</span>
                      </div>
                      <span className="text-sm font-medium text-success">{successRate}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-success h-full rounded-full"
                        style={{ width: `${successRate}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
