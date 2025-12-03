import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Target,
  Mail
} from 'lucide-react';

interface AgentReportsTabProps {
  agent: any;
}

export function AgentReportsTab({ agent }: AgentReportsTabProps) {
  const [reports] = useState([
    {
      id: 1,
      title: 'Relatório Diário - Análise de Vendas',
      date: 'Hoje, 8:15 AM',
      type: 'daily',
      insights: 15,
      priority: 'high',
      summary: '15 oportunidades identificadas, 3 alertas críticos, taxa de conversão em alta',
      status: 'new'
    },
    {
      id: 2,
      title: 'Relatório Diário - Análise de Vendas',
      date: 'Ontem, 8:10 AM',
      type: 'daily',
      insights: 12,
      priority: 'medium',
      summary: '12 insights gerados, 1 alerta de atenção, performance estável',
      status: 'read'
    },
    {
      id: 3,
      title: 'Relatório Semanal - Resumo de Performance',
      date: 'Segunda-feira, 8:00 AM',
      type: 'weekly',
      insights: 34,
      priority: 'high',
      summary: 'Análise completa da semana: 34 insights, tendências identificadas, recomendações estratégicas',
      status: 'read'
    },
    {
      id: 4,
      title: 'Relatório Diário - Análise de Vendas',
      date: 'Há 2 dias, 8:05 AM',
      type: 'daily',
      insights: 18,
      priority: 'medium',
      summary: '18 oportunidades, 2 alertas, sugestões de melhoria implementadas',
      status: 'read'
    },
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'medium':
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'low':
        return 'text-green-500 bg-green-500/10 border-green-500/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Alta Prioridade';
      case 'medium':
        return 'Média Prioridade';
      case 'low':
        return 'Baixa Prioridade';
      default:
        return 'Normal';
    }
  };

  return (
    <div className="space-y-6">
      {/* Reports Overview */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Resumo de Relatórios
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Total de Relatórios</span>
            </div>
            <p className="text-2xl font-bold text-foreground">127</p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-success" />
              <span className="text-xs text-muted-foreground">Insights Gerados</span>
            </div>
            <p className="text-2xl font-bold text-foreground">1,847</p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-warning" />
              <span className="text-xs text-muted-foreground">Alertas Ativos</span>
            </div>
            <p className="text-2xl font-bold text-foreground">3</p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span className="text-xs text-muted-foreground">Ações Tomadas</span>
            </div>
            <p className="text-2xl font-bold text-foreground">89</p>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Relatórios Recentes
          </h3>
          <Button variant="outline" size="sm">
            <Mail className="w-4 h-4 mr-2" />
            Enviar por Email
          </Button>
        </div>

        <div className="space-y-4">
          {reports.map((report) => (
            <div 
              key={report.id} 
              className={`rounded-lg p-4 border ${
                report.status === 'new' 
                  ? 'bg-primary/5 border-primary/20' 
                  : 'bg-muted/30 border-border'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-foreground">{report.title}</h4>
                    {report.status === 'new' && (
                      <Badge variant="default" className="text-xs">Novo</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {report.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {report.insights} insights
                    </span>
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getPriorityColor(report.priority)}`}
                >
                  {getPriorityLabel(report.priority)}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                {report.summary}
              </p>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Ver Relatório
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Principais Insights (Últimos 7 dias)
        </h3>
        
        <div className="space-y-3">
          <div className="bg-success/5 border border-success/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-foreground mb-1">Oportunidade de Upsell</p>
                <p className="text-sm text-muted-foreground mb-2">
                  23 clientes demonstraram interesse em features premium. Potencial de receita: R$ 34.500/mês
                </p>
                <Badge variant="outline" className="text-xs">
                  Impacto: Alto • Confiança: 94%
                </Badge>
              </div>
            </div>
          </div>

          <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-foreground mb-1">Alerta de Performance</p>
                <p className="text-sm text-muted-foreground mb-2">
                  Taxa de conversão caiu 12% nos últimos 3 dias. Principal objeção: preço
                </p>
                <Badge variant="outline" className="text-xs">
                  Impacto: Médio • Confiança: 87%
                </Badge>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-foreground mb-1">Tendência Positiva</p>
                <p className="text-sm text-muted-foreground mb-2">
                  Satisfação do cliente aumentou 18% após implementação de novo script de vendas
                </p>
                <Badge variant="outline" className="text-xs">
                  Impacto: Alto • Confiança: 96%
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-3">📊 Exportar Relatórios</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Exporte todos os relatórios e insights em diferentes formatos para análise externa
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar PDF
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar Excel
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
        </div>
      </div>
    </div>
  );
}
