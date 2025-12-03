import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { MessageSquare, Filter, Plus, Search, Bot, User, Clock, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { ConversationDialog } from '@/components/ConversationDialog';
import { Conversation } from '@/types/kanban';

const conversations = [
  {
    id: '1',
    client: 'Maria Silva',
    message: 'Preciso de ajuda com o pedido #1234...',
    channel: 'WhatsApp',
    status: 'active',
    time: 'há 2 minutos',
    tags: ['hot_lead', 'suporte'],
  },
  {
    id: '2',
    client: 'Pedro Santos',
    message: 'Quanto custa o produto X?',
    channel: 'Instagram',
    status: 'waiting',
    time: 'há 5 minutos',
    tags: ['vendas', 'novo'],
  },
  {
    id: '3',
    client: 'Ana Costa',
    message: 'Obrigada pelo atendimento!',
    channel: 'WhatsApp',
    status: 'resolved',
    time: 'há 10 minutos',
    tags: ['resolvido', 'satisfeito'],
  },
  {
    id: '4',
    client: 'Carlos Oliveira',
    message: 'Isso é inaceitável! Quero falar com gerente!',
    channel: 'WhatsApp',
    status: 'escalated',
    time: 'há 15 minutos',
    tags: ['escalado', 'urgente', 'insatisfeito'],
  },
  {
    id: '5',
    client: 'Juliana Mendes',
    message: 'Vocês entregam em São Paulo?',
    channel: 'Instagram',
    status: 'active',
    time: 'há 20 minutos',
    tags: ['vendas', 'localização'],
  },
];

const statusConfig = {
  active: { label: 'Ativo', color: 'bg-success' },
  waiting: { label: 'Aguardando', color: 'bg-warning' },
  resolved: { label: 'Resolvido', color: 'bg-muted' },
  escalated: { label: 'Escalado', color: 'bg-destructive' },
};

export default function Conversations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [channelFilter, setChannelFilter] = useState('all');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || conv.status === statusFilter;
    const matchesChannel = channelFilter === 'all' || conv.channel === channelFilter;
    return matchesSearch && matchesStatus && matchesChannel;
  });

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
                <h1 className="text-3xl font-bold text-foreground mb-2">Conversas ({conversations.length})</h1>
                <p className="text-muted-foreground">Gerencie todas as conversas com clientes</p>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nova conversa
              </Button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar conversas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos status</SelectItem>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="waiting">Aguardando</SelectItem>
                  <SelectItem value="resolved">Resolvido</SelectItem>
                  <SelectItem value="escalated">Escalado</SelectItem>
                </SelectContent>
              </Select>

              <Select value={channelFilter} onValueChange={setChannelFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos canais</SelectItem>
                  <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="Webchat">Webchat</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Bot className="w-5 h-5" />
                  </div>
                  <Sparkles className="w-5 h-5 opacity-70" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium opacity-90">IA Ativa</p>
                  <p className="text-3xl font-bold">3</p>
                  <p className="text-xs opacity-75">conversas sendo atendidas</p>
                </div>
              </div>

              <div className="bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Total Ativas</p>
                  <p className="text-3xl font-bold text-foreground">{conversations.length}</p>
                  <p className="text-xs text-success">+12% vs ontem</p>
                </div>
              </div>

              <div className="bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-warning/10 rounded-lg">
                    <Clock className="w-5 h-5 text-warning" />
                  </div>
                  <Zap className="w-5 h-5 text-warning" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Tempo Médio</p>
                  <p className="text-3xl font-bold text-foreground">2.5m</p>
                  <p className="text-xs text-muted-foreground">resposta da IA</p>
                </div>
              </div>

              <div className="bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <User className="w-5 h-5 text-success" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Satisfação</p>
                  <p className="text-3xl font-bold text-foreground">94%</p>
                  <p className="text-xs text-success">+5% este mês</p>
                </div>
              </div>
            </div>

            {/* Conversations List */}
            <div className="bg-card rounded-xl border border-border shadow-sm">
              {filteredConversations.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Nenhuma conversa encontrada</h3>
                  <p className="text-sm text-muted-foreground">Tente ajustar os filtros de busca.</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {filteredConversations.map((conv) => {
                    const status = statusConfig[conv.status as keyof typeof statusConfig];
                    const hasAI = conv.tags.includes('ia_ativa') || conv.status === 'active';
                    
                    return (
                      <div
                        key={conv.id}
                        className="p-5 hover:bg-muted/30 transition-all cursor-pointer group relative"
                        onClick={() => {
                          // Mock conversation object for dialog
                          const mockConv: Conversation = {
                            id: conv.id,
                            clientName: conv.client,
                            subject: conv.message,
                            status: conv.status as any,
                            date: conv.time,
                            messageCount: Math.floor(Math.random() * 20) + 1,
                            attendants: [
                              {
                                id: '1',
                                name: conv.client,
                                type: 'human',
                                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${conv.client}`,
                              },
                              ...(hasAI ? [{
                                id: 'ai-1',
                                name: 'Assistente IA',
                                type: 'ai' as const,
                                avatar: '',
                              }] : []),
                            ],
                            isUrgent: conv.status === 'escalated',
                            isHighPriority: conv.tags.includes('urgente'),
                          };
                          setSelectedConversation(mockConv);
                          setDialogOpen(true);
                        }}
                      >
                        {/* AI Indicator */}
                        {hasAI && (
                          <div className="absolute top-5 left-0 w-1 h-12 bg-gradient-to-b from-blue-500 to-blue-600 rounded-r-full"></div>
                        )}

                        <div className="flex items-start gap-4 pl-3">
                          {/* Avatar with AI badge */}
                          <div className="relative flex-shrink-0">
                            <img
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${conv.client}`}
                              alt={conv.client}
                              className="w-12 h-12 rounded-full border-2 border-border group-hover:border-primary transition-colors"
                            />
                            {hasAI && (
                              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center border-2 border-card shadow-lg">
                                <Bot className="w-3.5 h-3.5 text-white" />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                {conv.client}
                              </span>
                              <Badge variant="outline" className="text-xs font-normal">
                                {conv.channel}
                              </Badge>
                              {hasAI && (
                                <Badge className="text-xs bg-gradient-to-r from-blue-500 to-blue-600 border-0">
                                  <Sparkles className="w-3 h-3 mr-1" />
                                  IA Atendendo
                                </Badge>
                              )}
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2 group-hover:text-foreground transition-colors">
                              {conv.message}
                            </p>
                            
                            <div className="flex items-center gap-2 flex-wrap">
                              {conv.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs font-normal">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="text-right flex-shrink-0 space-y-2">
                            <Badge 
                              variant={
                                conv.status === 'resolved' ? 'default' : 
                                conv.status === 'escalated' ? 'destructive' : 
                                'secondary'
                              }
                              className="font-medium"
                            >
                              {status.label}
                            </Badge>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                              <Clock className="w-3 h-3" />
                              {conv.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {filteredConversations.length > 0 && (
              <div className="text-center">
                <Button variant="outline">Carregar mais conversas</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConversationDialog
        conversation={selectedConversation}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
