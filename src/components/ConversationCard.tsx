import { Calendar, MessageSquare, Bot, User, Clock, Smile, Frown, CheckCircle, AlertTriangle, Flame, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Conversation, ConversationStatus } from '@/types/kanban';
import { cn } from '@/lib/utils';

const statusLabels: Record<ConversationStatus, string> = {
  new: 'Novo',
  'ai-responding': 'IA Respondendo',
  'waiting-client': 'Aguardando Cliente',
  complex: 'Complexo',
  urgent: 'Urgente',
  waiting: 'Aguardando',
  resolved: 'Resolvida',
};

interface ConversationCardProps {
  conversation: Conversation;
  onClick?: () => void;
}

export function ConversationCard({ conversation, onClick }: ConversationCardProps) {
  const clientAttendant = conversation.attendants.find(a => a.type === 'human' && !['Lucas', 'Mariana', 'Pedro', 'Carla'].includes(a.name));
  const serviceAttendants = conversation.attendants.filter(a => a.type === 'ai' || ['Lucas', 'Mariana', 'Pedro', 'Carla'].includes(a.name));

  return (
    <div 
      onClick={onClick}
      className="bg-card rounded-xl p-4 space-y-3 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer border border-border group"
    >
      {/* Date and status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="w-3.5 h-3.5" />
          <span>{conversation.date}</span>
        </div>
        <Badge variant={conversation.status}>{statusLabels[conversation.status]}</Badge>
      </div>

      {/* Client name and subject */}
      <div>
        <h3 className="text-sm font-medium text-foreground leading-snug group-hover:text-primary transition-colors">
          {conversation.clientName}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">{conversation.subject}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1">
        {/* Avatars */}
        <div className="flex items-center">
          {clientAttendant && (
            <img
              src={clientAttendant.avatar}
              alt={clientAttendant.name}
              className="w-7 h-7 rounded-full border-2 border-card shadow-sm"
            />
          )}
          {serviceAttendants.map((attendant, i) => (
            attendant.type === 'ai' ? (
              <div
                key={attendant.id}
                className={cn(
                  "w-7 h-7 rounded-full bg-primary flex items-center justify-center border-2 border-card shadow-sm",
                  i > 0 || clientAttendant ? "-ml-2" : ""
                )}
              >
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
            ) : (
              <img
                key={attendant.id}
                src={attendant.avatar}
                alt={attendant.name}
                className={cn(
                  "w-7 h-7 rounded-full border-2 border-card shadow-sm",
                  i > 0 || clientAttendant ? "-ml-2" : ""
                )}
              />
            )
          ))}
        </div>

        {/* Metrics */}
        <div className="flex items-center gap-2 text-muted-foreground flex-wrap justify-end">
          <div className="flex items-center gap-1 text-xs hover:text-foreground transition-colors">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{conversation.messageCount}</span>
          </div>

          {serviceAttendants.some(a => a.type === 'ai') && (
            <div className="flex items-center gap-1 text-xs text-primary">
              <Bot className="w-3.5 h-3.5" />
              <span>IA</span>
            </div>
          )}

          {conversation.assignedTo && (
            <div className="flex items-center gap-1 text-xs hover:text-foreground transition-colors">
              <User className="w-3.5 h-3.5" />
              <span>{conversation.assignedTo}</span>
            </div>
          )}

          {conversation.isHighPriority && (
            <div className="flex items-center gap-1 text-xs text-warning">
              <Zap className="w-3.5 h-3.5" />
            </div>
          )}

          {conversation.isUrgent && (
            <div className="flex items-center gap-1 text-xs text-destructive">
              <Flame className="w-3.5 h-3.5" />
            </div>
          )}

          {conversation.sentiment === 'negative' && (
            <div className="flex items-center gap-1 text-xs text-destructive">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
          )}

          {conversation.sentiment === 'positive' && (
            <div className="flex items-center gap-1 text-xs text-success">
              <Smile className="w-3.5 h-3.5" />
            </div>
          )}

          {conversation.status === 'resolved' && (
            <div className="flex items-center gap-1 text-xs text-success">
              <CheckCircle className="w-3.5 h-3.5" />
            </div>
          )}

          {conversation.timeElapsed && (
            <div className="flex items-center gap-1 text-xs hover:text-foreground transition-colors">
              <Clock className="w-3.5 h-3.5" />
              <span>{conversation.timeElapsed}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
