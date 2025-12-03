import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Conversation } from '@/types/kanban';
import { Badge } from '@/components/ui/badge';
import { Calendar, MessageSquare, Bot, User, Clock, Smile, Frown, AlertTriangle, Flame, Zap, Phone, Mail, MapPin, Tag, TrendingUp, Send, Sparkles, Brain, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const statusLabels: Record<string, string> = {
  new: 'Novo',
  'ai-responding': 'IA Respondendo',
  'waiting-client': 'Aguardando Cliente',
  complex: 'Complexo',
  urgent: 'Urgente',
  waiting: 'Aguardando',
  resolved: 'Resolvida',
};

interface ConversationDialogProps {
  conversation: Conversation | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConversationDialog({ conversation, open, onOpenChange }: ConversationDialogProps) {
  if (!conversation) return null;

  const clientAttendant = conversation.attendants.find(a => a.type === 'human' && !['Lucas', 'Mariana', 'Pedro', 'Carla'].includes(a.name));
  const serviceAttendants = conversation.attendants.filter(a => a.type === 'ai' || ['Lucas', 'Mariana', 'Pedro', 'Carla'].includes(a.name));

  const hasAI = serviceAttendants.some(a => a.type === 'ai');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0">
        <div className="flex flex-col h-full max-h-[90vh]">
          {/* Header with AI indicator */}
          <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-background to-muted/30">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <DialogTitle className="text-xl font-semibold">
                    {conversation.clientName}
                  </DialogTitle>
                  {hasAI && (
                    <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 border-0">
                      <Sparkles className="w-3 h-3 mr-1" />
                      IA Ativa
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{conversation.subject}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={conversation.status} className="shrink-0">
                  {statusLabels[conversation.status]}
                </Badge>
              </div>
            </div>

            {/* AI Status Bar */}
            {hasAI && (
              <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                        Assistente IA está atendendo
                      </p>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-blue-700 dark:text-blue-300">Online</span>
                      </div>
                    </div>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      Analisando contexto e gerando respostas inteligentes em tempo real
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-center px-3 py-1 bg-white/50 dark:bg-black/20 rounded-lg">
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Confiança</p>
                      <p className="text-sm font-bold text-blue-900 dark:text-blue-100">94%</p>
                    </div>
                    <div className="text-center px-3 py-1 bg-white/50 dark:bg-black/20 rounded-lg">
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Tempo</p>
                      <p className="text-sm font-bold text-blue-900 dark:text-blue-100">1.2s</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogHeader>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <div className="grid grid-cols-3 h-full">
              {/* Main conversation area */}
              <div className="col-span-2 flex flex-col border-r">
                {/* Messages */}
                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-4">
                    {/* Mock messages */}
                    <div className="flex gap-3">
                      <img
                        src={clientAttendant?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                        alt={clientAttendant?.name || 'Cliente'}
                        className="w-8 h-8 rounded-full shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">{clientAttendant?.name || 'Cliente'}</span>
                          <span className="text-xs text-muted-foreground">{conversation.date}</span>
                        </div>
                        <div className="bg-muted rounded-lg p-3 text-sm">
                          {conversation.subject}
                        </div>
                      </div>
                    </div>

                    {serviceAttendants.map((attendant) => (
                      <div key={attendant.id} className="flex gap-3 flex-row-reverse">
                        {attendant.type === 'ai' ? (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0 shadow-lg">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                        ) : (
                          <img
                            src={attendant.avatar}
                            alt={attendant.name}
                            className="w-8 h-8 rounded-full shrink-0"
                          />
                        )}
                        <div className="flex-1 text-right">
                          <div className="flex items-center gap-2 mb-1 justify-end">
                            <span className="text-xs text-muted-foreground">{conversation.date}</span>
                            <span className="text-sm font-medium">{attendant.name}</span>
                            {attendant.type === 'ai' && (
                              <Badge className="text-xs bg-gradient-to-r from-blue-500 to-blue-600 border-0">
                                <Brain className="w-3 h-3 mr-1" />
                                IA
                              </Badge>
                            )}
                          </div>
                          <div className={cn(
                            "rounded-lg p-3 text-sm inline-block max-w-[80%]",
                            attendant.type === 'ai' 
                              ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg" 
                              : "bg-primary text-primary-foreground"
                          )}>
                            <p>Olá! Como posso ajudar você hoje?</p>
                            {attendant.type === 'ai' && (
                              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/20">
                                <Activity className="w-3 h-3 opacity-70" />
                                <span className="text-xs opacity-90">Resposta gerada por IA</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Digite sua mensagem..."
                      className="resize-none"
                      rows={2}
                    />
                    <Button size="icon" className="shrink-0">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sidebar with details */}
              <div className="col-span-1 bg-muted/30">
                <ScrollArea className="h-full">
                  <div className="p-6 space-y-6">
                    {/* Client info */}
                    <div>
                      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Informações do Cliente
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="w-3.5 h-3.5" />
                          <span>+55 11 98765-4321</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="w-3.5 h-3.5" />
                          <span>cliente@email.com</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>São Paulo, SP</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Conversation metrics */}
                    <div>
                      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Métricas
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground flex items-center gap-2">
                            <MessageSquare className="w-3.5 h-3.5" />
                            Mensagens
                          </span>
                          <span className="font-medium">{conversation.messageCount}</span>
                        </div>
                        {conversation.timeElapsed && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5" />
                              Tempo decorrido
                            </span>
                            <span className="font-medium">{conversation.timeElapsed}</span>
                          </div>
                        )}
                        {conversation.sentiment && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground flex items-center gap-2">
                              {conversation.sentiment === 'positive' ? (
                                <Smile className="w-3.5 h-3.5" />
                              ) : conversation.sentiment === 'negative' ? (
                                <Frown className="w-3.5 h-3.5" />
                              ) : (
                                <AlertTriangle className="w-3.5 h-3.5" />
                              )}
                              Sentimento
                            </span>
                            <Badge variant={conversation.sentiment === 'positive' ? 'default' : 'destructive'}>
                              {conversation.sentiment === 'positive' ? 'Positivo' : 
                               conversation.sentiment === 'negative' ? 'Negativo' : 'Neutro'}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator />

                    {/* Tags and flags */}
                    <div>
                      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {conversation.isUrgent && (
                          <Badge variant="destructive" className="text-xs">
                            <Flame className="w-3 h-3 mr-1" />
                            Urgente
                          </Badge>
                        )}
                        {conversation.isHighPriority && (
                          <Badge variant="default" className="text-xs">
                            <Zap className="w-3 h-3 mr-1" />
                            Alta Prioridade
                          </Badge>
                        )}
                        {serviceAttendants.some(a => a.type === 'ai') && (
                          <Badge variant="outline" className="text-xs">
                            <Bot className="w-3 h-3 mr-1" />
                            IA Ativa
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Separator />

                    {/* Attendants */}
                    <div>
                      <h3 className="text-sm font-semibold mb-3">Atendentes</h3>
                      <div className="space-y-2">
                        {serviceAttendants.map((attendant) => (
                          <div key={attendant.id} className="flex items-center gap-2">
                            {attendant.type === 'ai' ? (
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                                <Bot className="w-4 h-4 text-white" />
                              </div>
                            ) : (
                              <img
                                src={attendant.avatar}
                                alt={attendant.name}
                                className="w-8 h-8 rounded-full"
                              />
                            )}
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium">{attendant.name}</p>
                                {attendant.type === 'ai' && (
                                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {attendant.type === 'ai' ? 'Assistente IA • Online' : 'Atendente'}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2 pt-4">
                      <Button variant="outline" className="w-full justify-start">
                        <User className="w-4 h-4 mr-2" />
                        Atribuir a mim
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Escalar conversa
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:from-blue-100 hover:to-blue-200"
                      >
                        <Bot className="w-4 h-4 mr-2" />
                        {hasAI ? 'IA Ativa' : 'Ativar IA'}
                      </Button>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
