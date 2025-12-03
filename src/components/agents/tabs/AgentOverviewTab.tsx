import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Target,
  Zap,
  Clock,
  Calendar,
  Activity
} from 'lucide-react';

interface AgentOverviewTabProps {
  agent: any;
}

export function AgentOverviewTab({ agent }: AgentOverviewTabProps) {
  return (
    <div className="space-y-6">
      {/* Status Card */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Status do Agente
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span className="text-xs text-muted-foreground">Status</span>
            </div>
            <p className="text-lg font-bold text-foreground">
              {agent.status === 'active' ? 'Ativo' : 'Pausado'}
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Frequência</span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              {agent.frequency}
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-warning" />
              <span className="text-xs text-muted-foreground">Última Execução</span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              Hoje, 8:15 AM
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-success" />
              <span className="text-xs text-muted-foreground">Próxima</span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              Amanhã, 8:00 AM
            </p>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Métricas de Performance
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg p-4 border border-blue-500/20">
            <p className="text-xs text-muted-foreground mb-1">Análises Realizadas</p>
            <p className="text-3xl font-bold text-foreground mb-1">{agent.stats.conversations}</p>
            <Badge variant="outline" className="text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12% vs mês passado
            </Badge>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg p-4 border border-green-500/20">
            <p className="text-xs text-muted-foreground mb-1">Taxa de Sucesso</p>
            <p className="text-3xl font-bold text-success mb-1">{agent.stats.resolution}%</p>
            <Badge variant="outline" className="text-xs">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Excelente
            </Badge>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg p-4 border border-purple-500/20">
            <p className="text-xs text-muted-foreground mb-1">Insights Gerados</p>
            <p className="text-3xl font-bold text-foreground mb-1">{agent.stats.insights}</p>
            <Badge variant="outline" className="text-xs">
              <Target className="w-3 h-3 mr-1" />
              34 esta semana
            </Badge>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 rounded-lg p-4 border border-yellow-500/20">
            <p className="text-xs text-muted-foreground mb-1">Satisfação</p>
            <p className="text-3xl font-bold text-foreground mb-1">{agent.stats.satisfaction} ⭐</p>
            <Badge variant="outline" className="text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />
              +0.3 vs mês passado
            </Badge>
          </div>
        </div>
      </div>

      {/* Recent Insights */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Insights Recentes
        </h3>
        <div className="space-y-3">
          <div className="bg-success/5 border border-success/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-foreground mb-1">Oportunidade Identificada</p>
                <p className="text-sm text-muted-foreground">
                  15 clientes mencionaram interesse em "plano anual" nas últimas 48h. 
                  Recomendação: criar campanha de upsell com desconto de 20%.
                </p>
                <p className="text-xs text-muted-foreground mt-2">Hoje, 8:15 AM</p>
              </div>
            </div>
          </div>

          <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-foreground mb-1">Atenção Necessária</p>
                <p className="text-sm text-muted-foreground">
                  Taxa de conversão caiu 8% nos últimos 3 dias. Principal objeção: "preço muito alto". 
                  Sugestão: revisar estratégia de precificação ou criar tier intermediário.
                </p>
                <p className="text-xs text-muted-foreground mt-2">Ontem, 8:10 AM</p>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-foreground mb-1">Tendência Positiva</p>
                <p className="text-sm text-muted-foreground">
                  Tempo médio de resposta melhorou 23% esta semana. 
                  Clientes estão 35% mais satisfeitos com o atendimento.
                </p>
                <p className="text-xs text-muted-foreground mt-2">Há 2 dias, 8:05 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Training Info */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-2">🎯 Treinamento</h3>
        <p className="text-sm text-muted-foreground mb-4">{agent.training}</p>
        <Button variant="outline" size="sm">
          <Target className="w-4 h-4 mr-2" />
          Ver Detalhes do Treinamento
        </Button>
      </div>
    </div>
  );
}
