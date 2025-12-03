import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  BookOpen, 
  Upload, 
  FileText, 
  CheckCircle2, 
  Clock,
  TrendingUp,
  Brain,
  Target,
  Plus
} from 'lucide-react';

interface AgentTrainingTabProps {
  agent: any;
}

export function AgentTrainingTab({ agent }: AgentTrainingTabProps) {
  const { toast } = useToast();
  const [trainingData] = useState([
    {
      id: 1,
      type: 'conversations',
      name: 'Conversas de Vendas',
      count: 1247,
      lastUpdate: 'Hoje, 8:15 AM',
      quality: 95,
      status: 'active'
    },
    {
      id: 2,
      type: 'documents',
      name: 'Documentos de Produto',
      count: 45,
      lastUpdate: 'Há 2 dias',
      quality: 88,
      status: 'active'
    },
    {
      id: 3,
      type: 'feedback',
      name: 'Feedback de Clientes',
      count: 234,
      lastUpdate: 'Ontem',
      quality: 92,
      status: 'active'
    },
    {
      id: 4,
      type: 'outcomes',
      name: 'Resultados de Vendas',
      count: 156,
      lastUpdate: 'Hoje, 8:15 AM',
      quality: 97,
      status: 'active'
    },
  ]);

  const handleAddTraining = () => {
    toast({
      title: 'Adicionar Treinamento',
      description: 'Funcionalidade em desenvolvimento.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Training Overview */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          Visão Geral do Treinamento
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Fontes de Dados</span>
            </div>
            <p className="text-2xl font-bold text-foreground">4</p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-success" />
              <span className="text-xs text-muted-foreground">Total de Exemplos</span>
            </div>
            <p className="text-2xl font-bold text-foreground">1,682</p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-warning" />
              <span className="text-xs text-muted-foreground">Qualidade Média</span>
            </div>
            <p className="text-2xl font-bold text-foreground">93%</p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Última Atualização</span>
            </div>
            <p className="text-sm font-semibold text-foreground">Hoje</p>
          </div>
        </div>
      </div>

      {/* Training Sources */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Fontes de Treinamento
          </h3>
          <Button size="sm" onClick={handleAddTraining}>
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Fonte
          </Button>
        </div>

        <div className="space-y-4">
          {trainingData.map((source) => (
            <div key={source.id} className="bg-muted/30 rounded-lg p-4 border border-border">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-foreground">{source.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {source.status === 'active' ? '✓ Ativo' : '⏸ Pausado'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {source.count} exemplos • Atualizado: {source.lastUpdate}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Qualidade dos Dados</span>
                  <span className="font-semibold text-foreground">{source.quality}%</span>
                </div>
                <Progress value={source.quality} className="h-2" />
              </div>

              <div className="flex items-center gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Ver Exemplos
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Atualizar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Training Tips */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Dicas para Melhorar o Treinamento
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
            <span>Adicione mais exemplos de conversas bem-sucedidas para melhorar a precisão</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
            <span>Mantenha os documentos de produto atualizados para insights mais relevantes</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
            <span>Revise e valide os insights gerados para melhorar o aprendizado contínuo</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
            <span>Adicione feedback sobre resultados de vendas para correlação com estratégias</span>
          </li>
        </ul>
      </div>

      {/* Training History */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Histórico de Atualizações
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3 pb-3 border-b border-border">
            <div className="w-2 h-2 rounded-full bg-success mt-2" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Treinamento atualizado com sucesso</p>
              <p className="text-xs text-muted-foreground">
                Adicionados 156 novos exemplos de conversas • Hoje, 8:15 AM
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 pb-3 border-b border-border">
            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Documentos de produto atualizados</p>
              <p className="text-xs text-muted-foreground">
                3 novos documentos adicionados • Há 2 dias
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-warning mt-2" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Qualidade de dados melhorada</p>
              <p className="text-xs text-muted-foreground">
                Qualidade aumentou de 89% para 93% • Há 5 dias
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
