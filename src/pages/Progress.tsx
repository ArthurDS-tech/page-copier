import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { TrendingUp, Target, Award, Zap, Users, MessageSquare, Bot, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress as ProgressBar } from '@/components/ui/progress';

const goals = [
  {
    id: '1',
    title: 'Mensagens Processadas',
    current: 7850,
    target: 10000,
    unit: 'msgs',
    icon: MessageSquare,
    color: 'bg-primary',
    trend: '+12%',
  },
  {
    id: '2',
    title: 'Taxa de Resolução IA',
    current: 87,
    target: 95,
    unit: '%',
    icon: Bot,
    color: 'bg-success',
    trend: '+5%',
  },
  {
    id: '3',
    title: 'Tempo Médio de Resposta',
    current: 8,
    target: 5,
    unit: 'min',
    icon: Clock,
    color: 'bg-warning',
    trend: '-2min',
    inverse: true,
  },
  {
    id: '4',
    title: 'Clientes Atendidos',
    current: 1240,
    target: 1500,
    unit: 'clientes',
    icon: Users,
    color: 'bg-primary',
    trend: '+8%',
  },
];

const achievements = [
  {
    id: '1',
    title: '1000 Conversas Resolvidas',
    description: 'Primeira milestone alcançada',
    date: '10 Nov 2025',
    icon: Award,
    color: 'bg-warning',
    completed: true,
  },
  {
    id: '2',
    title: 'Taxa de Satisfação 90%',
    description: 'Excelência no atendimento',
    date: '12 Nov 2025',
    icon: Target,
    color: 'bg-success',
    completed: true,
  },
  {
    id: '3',
    title: 'Resposta em < 1min',
    description: 'Velocidade recorde',
    date: '13 Nov 2025',
    icon: Zap,
    color: 'bg-primary',
    completed: true,
  },
  {
    id: '4',
    title: '5000 Mensagens/Dia',
    description: 'Meta em progresso',
    date: 'Em andamento',
    icon: TrendingUp,
    color: 'bg-muted',
    completed: false,
  },
];

const teamProgress = [
  { name: 'Lucas', avatar: 'https://i.pravatar.cc/150?img=11', resolved: 45, target: 50 },
  { name: 'Mariana', avatar: 'https://i.pravatar.cc/150?img=5', resolved: 38, target: 50 },
  { name: 'Pedro', avatar: 'https://i.pravatar.cc/150?img=12', resolved: 42, target: 50 },
  { name: 'Carla', avatar: 'https://i.pravatar.cc/150?img=16', resolved: 35, target: 50 },
];

export default function Progress() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Progresso e Metas</h1>
              <p className="text-muted-foreground">Acompanhe o desempenho e conquistas da equipe</p>
            </div>

            {/* Goals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {goals.map((goal) => {
                const Icon = goal.icon;
                const percentage = goal.inverse 
                  ? Math.max(0, 100 - ((goal.current / goal.target) * 100))
                  : (goal.current / goal.target) * 100;
                
                return (
                  <div key={goal.id} className="bg-card rounded-xl border border-border p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-lg ${goal.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant={percentage >= 80 ? 'default' : 'secondary'}>
                        {goal.trend}
                      </Badge>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">{goal.title}</h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-foreground">{goal.current}</span>
                        <span className="text-sm text-muted-foreground">/ {goal.target} {goal.unit}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <ProgressBar value={percentage} className="h-2" />
                      <p className="text-xs text-muted-foreground text-right">
                        {percentage.toFixed(0)}% completo
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Achievements */}
              <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-6">Conquistas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => {
                    const Icon = achievement.icon;
                    return (
                      <div
                        key={achievement.id}
                        className={`p-4 rounded-xl border transition-all ${
                          achievement.completed
                            ? 'bg-muted/50 border-border hover:bg-muted'
                            : 'bg-muted/20 border-dashed border-border/50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg ${achievement.color} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-foreground mb-1">{achievement.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant={achievement.completed ? 'default' : 'outline'} className="text-xs">
                                {achievement.completed ? 'Completo' : 'Em Progresso'}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{achievement.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Team Progress */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-6">Progresso da Equipe</h2>
                <div className="space-y-6">
                  {teamProgress.map((member) => {
                    const percentage = (member.resolved / member.target) * 100;
                    return (
                      <div key={member.name} className="space-y-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-10 h-10 rounded-full ring-2 ring-primary/20"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-foreground">{member.name}</span>
                              <span className="text-sm text-muted-foreground">
                                {member.resolved}/{member.target}
                              </span>
                            </div>
                            <ProgressBar value={percentage} className="h-2" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Team Stats */}
                <div className="mt-6 pt-6 border-t border-border space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Resolvido</span>
                    <span className="font-semibold text-foreground">160/200</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Média da Equipe</span>
                    <span className="font-semibold text-foreground">80%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Top Performer</span>
                    <Badge variant="default">Lucas</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly Overview */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">Visão Semanal</h2>
              <div className="grid grid-cols-7 gap-4">
                {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day, index) => {
                  const value = [85, 92, 78, 88, 95, 45, 30][index];
                  return (
                    <div key={day} className="text-center">
                      <div className="mb-2 text-sm font-medium text-muted-foreground">{day}</div>
                      <div className="h-32 bg-muted rounded-lg flex items-end justify-center p-2">
                        <div
                          className="w-full bg-primary rounded-t"
                          style={{ height: `${value}%` }}
                        ></div>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">{value}%</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
