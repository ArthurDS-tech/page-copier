import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Target,
  Zap,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download
} from 'lucide-react';

interface AgentAnalyticsTabProps {
  agent: any;
}

export function AgentAnalyticsTab({ agent }: AgentAnalyticsTabProps) {
  return (
    <div className="space-y-6">
      {/* Performance Trends */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Tendências de Performance
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg p-4 border border-green-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Taxa de Sucesso</span>
              <TrendingUp className="w-4 h-4 text-success" />
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">{agent.stats.resolution}%</p>
            <div className="flex items-center gap-2 text-xs">
              <Badge variant="outline" className="text-success border-success/20">
                +5.2% vs mês passado
              </Badge>
            </div>
            <Progress value={agent.stats.resolution} className="h-2 mt-3" />
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg p-4 border border-blue-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Insights Gerados</span>
              <Target className="w-4 h-4 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">{agent.stats.insights}</p>
            <div className="flex items-center gap-2 text-xs">
              <Badge variant="outline" className="text-primary border-primary/20">
                +12.3% vs mês passado
              </Badge>
            </div>
            <Progress value={75} className="h-2 mt-3" />
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg p-4 border border-purple-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Satisfação</span>
              <CheckCircle2 className="w-4 h-4 text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">{agent.stats.satisfaction} ⭐</p>
            <div className="flex items-center gap-2 text-xs">
              <Badge variant="outline" className="text-purple-500 border-purple-500/20">
                +0.3 vs mês passado
              </Badge>
            </div>
            <Progress value={96} className="h-2 mt-3" />
          </div>

          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 rounded-lg p-4 border border-yellow-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Tempo Médio</span>
              <Clock className="w-4 h-4 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">2.3s</p>
            <div className="flex items-center gap-2 text-xs">
              <Badge variant="outline" className="text-success border-success/20">
                -0.5s vs mês passado
              </Badge>
            </div>
            <Progress value={85} className="h-2 mt-3" />
          </div>
        </div>
      </div>

      {/* Insights Breakdown */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Distribuição de Insights
        </h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-foreground">Oportunidades Identificadas</span>
              <span className="text-sm font-semibold text-foreground">67 (43%)</span>
            </div>
            <Progress value={43} className="h-2" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-foreground">Alertas de Atenção</span>
              <span className="text-sm font-semibold text-foreground">45 (29%)</span>
            </div>
            <Progress value={29} className="h-2" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-foreground">Recomendações Estratégicas</span>
              <span className="text-sm font-semibold text-foreground">28 (18%)</span>
            </div>
            <Progress value={18} className="h-2" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-foreground">Tendências Identificadas</span>
              <span className="text-sm font-semibold text-foreground">16 (10%)</span>
            </div>
            <Progress value={10} className="h-2" />
          </div>
        </div>
      </div>

      {/* Impact Analysis */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          Análise de Impacto
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-success/5 border border-success/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <span className="font-medium text-foreground">Alto Impacto</span>
            </div>
            <p className="text-3xl font-bold text-foreground mb-2">34</p>
            <p className="text-xs text-muted-foreground">
              Insights com potencial de alto impacto no negócio
            </p>
          </div>

          <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-warning" />
              <span className="font-medium text-foreground">Médio Impacto</span>
            </div>
            <p className="text-3xl font-bold text-foreground mb-2">89</p>
            <p className="text-xs text-muted-foreground">
              Insights com impacto moderado
            </p>
          </div>

          <div className="bg-muted/50 border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium text-foreground">Baixo Impacto</span>
            </div>
            <p className="text-3xl font-bold text-foreground mb-2">33</p>
            <p className="text-xs text-muted-foreground">
              Insights informativos
            </p>
          </div>
        </div>
      </div>

      {/* Action Tracking */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-primary" />
          Rastreamento de Ações
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
            <div className="flex-1">
              <p className="font-medium text-foreground mb-1">Ações Recomendadas</p>
              <p className="text-sm text-muted-foreground">Total de recomendações geradas</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">156</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-success/5 rounded-lg border border-success/20">
            <div className="flex-1">
              <p className="font-medium text-foreground mb-1">Ações Implementadas</p>
              <p className="text-sm text-muted-foreground">Recomendações que foram executadas</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-success">89</p>
              <p className="text-xs text-muted-foreground">57% taxa de adoção</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex-1">
              <p className="font-medium text-foreground mb-1">Resultados Positivos</p>
              <p className="text-sm text-muted-foreground">Ações que geraram impacto positivo</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">76</p>
              <p className="text-xs text-muted-foreground">85% taxa de sucesso</p>
            </div>
          </div>
        </div>
      </div>

      {/* ROI Estimation */}
      <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl border border-green-500/20 p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-success" />
          Estimativa de ROI
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Economia Estimada</p>
            <p className="text-2xl font-bold text-foreground">R$ 12.500</p>
            <p className="text-xs text-muted-foreground mt-1">Por mês</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">Receita Adicional</p>
            <p className="text-2xl font-bold text-foreground">R$ 34.500</p>
            <p className="text-xs text-muted-foreground mt-1">Potencial identificado</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">ROI Total</p>
            <p className="text-2xl font-bold text-success">1.247%</p>
            <p className="text-xs text-muted-foreground mt-1">Retorno sobre investimento</p>
          </div>
        </div>
      </div>

      {/* Export Analytics */}
      <div className="flex justify-end">
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Exportar Analytics
        </Button>
      </div>
    </div>
  );
}
