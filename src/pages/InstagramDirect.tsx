import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { AIConfigPanel } from '@/components/chat/AIConfigPanel';
import { useState } from 'react';
import {
  Search,
  MoreHorizontal,
  Heart,
  Send,
  Image as ImageIcon,
  Smile,
  Phone,
  Video,
  Info,
  Archive,
  Star,
  Tag,
  UserPlus,
  Download,
  Share2,
  Zap,
  MessageSquare,
  TrendingUp,
  Sparkles,
  Settings,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const conversations = [
  {
    id: '1',
    username: '@maria.santos',
    name: 'Maria Santos',
    avatar: 'https://i.pravatar.cc/150?img=5',
    lastMessage: 'Adorei o produto! Quando chega?',
    time: '2min',
    unread: 2,
    verified: true,
    statusLabel: 'Alto potencial',
    statusColor: 'purple',
  },
  {
    id: '2',
    username: '@joao.silva',
    name: 'João Silva',
    avatar: 'https://i.pravatar.cc/150?img=11',
    lastMessage: 'Qual o preço do plano Pro?',
    time: '5min',
    unread: 1,
    verified: false,
    statusLabel: 'Aguardando resposta',
    statusColor: 'yellow',
  },
  {
    id: '3',
    username: '@ana.costa',
    name: 'Ana Costa',
    avatar: 'https://i.pravatar.cc/150?img=16',
    lastMessage: 'Obrigada pelo atendimento! ❤️',
    time: '15min',
    unread: 0,
    verified: true,
    statusLabel: 'Conversa encerrada',
    statusColor: 'gray',
  },
  {
    id: '4',
    username: '@pedro.alves',
    name: 'Pedro Alves',
    avatar: 'https://i.pravatar.cc/150?img=12',
    lastMessage: 'Preciso de ajuda urgente',
    time: '20min',
    unread: 3,
    verified: false,
    statusLabel: 'Urgente',
    statusColor: 'red',
  },
];

const messages = [
  {
    id: '1',
    type: 'received',
    content: 'Oi! Vi seu produto no Instagram e fiquei interessada 😍',
    time: '14:32',
  },
  {
    id: '2',
    type: 'sent',
    content: 'Olá Maria! Que ótimo! Qual produto você gostou?',
    time: '14:33',
    agent: 'IA',
  },
  {
    id: '3',
    type: 'received',
    content: 'O Plano Pro! Quanto custa?',
    time: '14:34',
  },
  {
    id: '4',
    type: 'sent',
    content: 'O Plano Pro custa R$ 99/mês e inclui:\n• Atendimento ilimitado\n• 5 agentes de IA\n• Integrações avançadas\n• Suporte prioritário',
    time: '14:34',
    agent: 'IA',
  },
  {
    id: '5',
    type: 'received',
    content: 'Adorei! Quando chega?',
    time: '14:35',
  },
];

export default function InstagramDirect() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [showAIConfig, setShowAIConfig] = useState(false);

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar forceCollapsed={true} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 flex overflow-hidden">
          {/* Conversations List */}
          <div className="w-[360px] border-r border-border flex flex-col bg-gradient-to-b from-card to-card/50 backdrop-blur-sm">
            {/* Header - Limpo e Minimalista */}
            <div className="p-4 border-b border-border/30 bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Instagram</p>
                    <p className="text-xs text-muted-foreground">{conversations.length} conversas</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                    <span className="text-muted-foreground font-medium">Ativo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-border/50">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                <Input
                  placeholder="Buscar conversas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10 bg-background/60 backdrop-blur-sm border-border/50 rounded-xl focus:bg-background transition-all"
                />
              </div>
            </div>

            {/* Conversations - Cards Inteligentes */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              {filteredConversations.map((conv) => {
                const isSelected = selectedConversation.id === conv.id;
                
                // Cores de status
                const statusColors = {
                  purple: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
                  blue: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
                  yellow: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
                  red: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
                  gray: 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20',
                  pink: 'bg-pink-500/10 text-pink-700 dark:text-pink-400 border-pink-500/20',
                };
                
                return (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`w-full p-3.5 flex items-start gap-3 hover:bg-muted/40 transition-all relative group border-b border-border/30 ${
                      isSelected ? 'bg-muted/60' : ''
                    }`}
                  >
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${
                        conv.verified ? 'border-blue-500/50' : 'border-border/30'
                      } ${isSelected ? 'scale-105' : 'group-hover:scale-105'}`}>
                        <img
                          src={conv.avatar}
                          alt={conv.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {conv.verified && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-card">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      {conv.unread > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                          {conv.unread}
                        </div>
                      )}
                    </div>
                    
                    {/* Conteúdo */}
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm text-foreground truncate">
                          {conv.name}
                        </span>
                        <span className="text-[11px] text-muted-foreground flex-shrink-0 ml-2">
                          {conv.time}
                        </span>
                      </div>
                      
                      <p className="text-[11px] text-muted-foreground/70 mb-1.5">
                        {conv.username}
                      </p>
                      
                      <p className={`text-xs mb-2 truncate ${conv.unread > 0 ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                        {conv.lastMessage}
                      </p>
                      
                      {/* Status Badge - Limpo e Claro */}
                      <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-medium border ${statusColors[conv.statusColor as keyof typeof statusColors]}`}>
                        {conv.statusColor === 'red' && <span>🔥</span>}
                        {conv.statusColor === 'purple' && <span>⭐</span>}
                        <span>{conv.statusLabel}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-background">
            {/* Chat Header */}
            <div className="h-16 border-b border-border/50 flex items-center justify-between px-5 bg-gradient-to-r from-background to-muted/20">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`w-11 h-11 rounded-full overflow-hidden border-2 ${
                    selectedConversation.verified ? 'border-blue-500' : 'border-border'
                  }`}>
                    <img
                      src={selectedConversation.avatar}
                      alt={selectedConversation.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {selectedConversation.verified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-background shadow-lg">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">
                      {selectedConversation.name}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">
                    {selectedConversation.username}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-9 w-9 rounded-xl hover:bg-muted"
                  onClick={() => setShowAIConfig(true)}
                  title="Configurações de IA"
                >
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-muted">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-muted">
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-muted">
                  <Info className="w-4 h-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-muted">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem>
                      <Heart className="w-4 h-4 mr-2" />
                      Ver Posts Curtidos
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Tag className="w-4 h-4 mr-2" />
                      Adicionar Tag
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Atribuir a Alguém
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Zap className="w-4 h-4 mr-2" />
                      Criar Automação
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Download className="w-4 h-4 mr-2" />
                      Exportar Conversa
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share2 className="w-4 h-4 mr-2" />
                      Compartilhar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Archive className="w-4 h-4 mr-2" />
                      Arquivar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-gradient-to-b from-background to-muted/10">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                      msg.type === 'sent'
                        ? msg.agent
                          ? 'bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 text-white shadow-lg shadow-pink-500/20'
                          : 'bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/20'
                        : 'bg-card border border-border/50 text-foreground'
                    }`}
                  >
                    {msg.agent && (
                      <div className="flex items-center gap-2 mb-2.5 pb-2.5 border-b border-white/20">
                        <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                          <Sparkles className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[11px] font-semibold opacity-95">Assistente IA</p>
                        </div>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
                    <div className="flex items-center justify-between mt-2.5 gap-2">
                      <p className={`text-[10px] font-medium ${msg.type === 'sent' ? 'opacity-75' : 'text-muted-foreground'}`}>
                        {msg.time}
                      </p>
                      {msg.agent && (
                        <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full">
                          <Zap className="w-2.5 h-2.5 opacity-80" />
                          <span className="text-[9px] font-medium opacity-80">Auto</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-border/50 p-5 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-muted">
                  <ImageIcon className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-muted">
                  <Heart className="w-5 h-5" />
                </Button>
                <Input
                  placeholder="Mensagem..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="flex-1 h-11 rounded-xl bg-background border-border/50 focus:border-pink-500 transition-all"
                />
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-muted">
                  <Smile className="w-5 h-5" />
                </Button>
                <Button size="icon" className="h-11 w-11 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-700 shadow-lg shadow-pink-500/20">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AIConfigPanel
        conversationId={selectedConversation.id}
        isOpen={showAIConfig}
        onClose={() => setShowAIConfig(false)}
      />
    </div>
  );
}
