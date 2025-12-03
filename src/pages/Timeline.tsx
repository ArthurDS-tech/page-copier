import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Clock, MessageSquare, User, Bot, CheckCircle, AlertTriangle, TrendingUp, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const timelineEvents = [
  {
    id: '1',
    type: 'message',
    title: 'Nova mensagem de João Silva',
    description: 'Dúvida sobre produto X',
    time: '2 minutos atrás',
    icon: MessageSquare,
    color: 'bg-primary',
    channel: 'WhatsApp',
  },
  {
    id: '2',
    type: 'ai-response',
    title: 'IA respondeu automaticamente',
    description: 'Conversa com Maria Santos',
    time: '5 minutos atrás',
    icon: Bot,
    color: 'bg-success',
    channel: 'Instagram',
  },
  {
    id: '3',
    type: 'escalation',
    title: 'Conversa escalada para humano',
    description: 'Pedro Costa - Problema complexo',
    time: '15 minutos atrás',
    icon: AlertTriangle,
    color: 'bg-warning',
    assignedTo: 'Lucas',
  },
  {
    id: '4',
    type: 'resolved',
    title: 'Conversa resolvida',
    description: 'Ana Oliveira - Informações de pagamento',
    time: '30 minutos atrás',
    icon: CheckCircle,
    color: 'bg-success',
    resolvedBy: 'IA',
  },
  {
    id: '5',
    type: 'message',
    title: 'Nova mensagem de Carlos Mendes',
    description: 'Reclamação sobre entrega',
    time: '1 hora atrás',
    icon: MessageSquare,
    color: 'bg-destructive',
    channel: 'WhatsApp',
  },
  {
    id: '6',
    type: 'user-action',
    title: 'Mariana assumiu conversa',
    description: 'Fernanda Rocha - Negociação',
    time: '2 horas atrás',
    icon: User,
    color: 'bg-primary',
    assignedTo: 'Mariana',
  },
  {
    id: '7',
    type: 'ai-response',
    title: 'IA respondeu automaticamente',
    description: 'Conversa com Juliana Lima',
    time: '3 horas atrás',
    icon: Bot,
    color: 'bg-success',
    channel: 'Webchat',
  },
  {
    id: '8',
    type: 'resolved',
    title: 'Conversa resolvida',
    description: 'Roberto Alves - Cancelamento',
    time: '4 horas atrás',
    icon: CheckCircle,
    color: 'bg-success',
    resolvedBy: 'Lucas',
  },
];

const stats = [
  { label: 'Eventos Hoje', value: '156', icon: TrendingUp, color: 'text-primary' },
  { label: 'Resoluções IA', value: '89', icon: Bot, color: 'text-success' },
  { label: 'Escalações', value: '12', icon: AlertTriangle, color: 'text-warning' },
  { label: 'Tempo Médio', value: '8min', icon: Clock, color: 'text-muted-foreground' },
];

export default function Timeline() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Timeline de Atividades</h1>
              <p className="text-muted-foreground">Acompanhe todas as atividades em tempo real</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="bg-card rounded-xl p-4 border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                      <Icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                );
              })}
            </div>

            {/* Timeline */}
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">Atividades Recentes</h2>
                <Badge variant="outline">Ao vivo</Badge>
              </div>

              <ScrollArea className="h-[600px] pr-4">
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>

                  {/* Events */}
                  <div className="space-y-6">
                    {timelineEvents.map((event, index) => {
                      const Icon = event.icon;
                      return (
                        <div key={event.id} className="relative flex gap-4 group">
                          {/* Icon */}
                          <div className={`relative z-10 w-12 h-12 rounded-full ${event.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 bg-muted/50 rounded-xl p-4 group-hover:bg-muted transition-colors">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <h3 className="font-medium text-foreground">{event.title}</h3>
                              <span className="text-xs text-muted-foreground whitespace-nowrap">{event.time}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                            
                            <div className="flex items-center gap-2 flex-wrap">
                              {event.channel && (
                                <Badge variant="outline" className="text-xs">
                                  {event.channel}
                                </Badge>
                              )}
                              {event.assignedTo && (
                                <Badge variant="secondary" className="text-xs">
                                  <User className="w-3 h-3 mr-1" />
                                  {event.assignedTo}
                                </Badge>
                              )}
                              {event.resolvedBy && (
                                <Badge variant="default" className="text-xs">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  {event.resolvedBy}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
