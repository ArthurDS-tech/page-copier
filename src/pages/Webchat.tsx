import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useState } from 'react';
import {
  Globe,
  MessageSquare,
  Users,
  TrendingUp,
  Zap,
  Settings,
  Code,
  Palette,
  Eye,
  Copy,
  Check,
  Download,
  Smartphone,
  Monitor,
  Tablet,
  Send,
  Smile,
  Paperclip,
  X,
  Minimize2,
  Maximize2,
  MoreVertical,
  Bell,
  Volume2,
  Languages,
  Clock,
  BarChart3,
  FileText,
  RefreshCw,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';

const webchatStats = [
  { icon: MessageSquare, label: 'Conversas Hoje', value: '1.234', change: '+15%', color: 'text-blue-500' },
  { icon: Users, label: 'Visitantes Online', value: '89', change: '+8%', color: 'text-green-500' },
  { icon: TrendingUp, label: 'Taxa de Conversão', value: '12.5%', change: '+3%', color: 'text-purple-500' },
  { icon: Zap, label: 'Tempo Médio', value: '2.3min', change: '-15%', color: 'text-orange-500' },
];

const themes = [
  { id: 'default', name: 'Padrão', primary: '#3B82F6', secondary: '#1E40AF' },
  { id: 'purple', name: 'Roxo', primary: '#8B5CF6', secondary: '#6D28D9' },
  { id: 'green', name: 'Verde', primary: '#10B981', secondary: '#059669' },
  { id: 'orange', name: 'Laranja', primary: '#F59E0B', secondary: '#D97706' },
  { id: 'pink', name: 'Rosa', primary: '#EC4899', secondary: '#DB2777' },
  { id: 'dark', name: 'Escuro', primary: '#1F2937', secondary: '#111827' },
];

const positions = [
  { id: 'bottom-right', label: 'Inferior Direito', icon: '↘️' },
  { id: 'bottom-left', label: 'Inferior Esquerdo', icon: '↙️' },
  { id: 'top-right', label: 'Superior Direito', icon: '↗️' },
  { id: 'top-left', label: 'Superior Esquerdo', icon: '↖️' },
];

const devices = [
  { id: 'desktop', label: 'Desktop', icon: Monitor },
  { id: 'tablet', label: 'Tablet', icon: Tablet },
  { id: 'mobile', label: 'Mobile', icon: Smartphone },
];

export default function Webchat() {
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const [selectedPosition, setSelectedPosition] = useState(positions[0]);
  const [selectedDevice, setSelectedDevice] = useState(devices[0]);
  const [chatOpen, setChatOpen] = useState(true);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState('');

  const embedCode = `<!-- Orion AI Webchat -->
<script>
  (function(w,d,s,o,f,js,fjs){
    w['OrionAI']=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
    js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
    js.id=o;js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);
  }(window,document,'script','orionai','https://cdn.orionai.com/webchat.js'));
  orionai('init', { 
    apiKey: 'YOUR_API_KEY',
    theme: '${selectedTheme.id}',
    position: '${selectedPosition.id}'
  });
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const DeviceIcon = selectedDevice.icon;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-[1920px] mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Webchat</h1>
                  <p className="text-sm text-muted-foreground">Configure e personalize seu chat para o site</p>
                </div>
              </div>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Configurações Avançadas
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {webchatStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-card rounded-xl border border-border p-4 hover:shadow-lg hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center">
                        <Icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <Badge variant="outline" className="text-green-500 border-green-500/20 bg-green-500/10">
                        {stat.change}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                );
              })}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Customization Panel */}
              <div className="space-y-6">
                {/* Theme Selection */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Palette className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Tema</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {themes.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => setSelectedTheme(theme)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedTheme.id === theme.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: theme.primary }}
                          ></div>
                          <div
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: theme.secondary }}
                          ></div>
                        </div>
                        <p className="text-sm font-medium text-foreground">{theme.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Position Selection */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Maximize2 className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Posição</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {positions.map((position) => (
                      <button
                        key={position.id}
                        onClick={() => setSelectedPosition(position)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedPosition.id === position.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="text-2xl mb-2">{position.icon}</div>
                        <p className="text-sm font-medium text-foreground">{position.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Device Preview */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Eye className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Visualizar em</h3>
                  </div>
                  <div className="flex gap-2">
                    {devices.map((device) => {
                      const Icon = device.icon;
                      return (
                        <button
                          key={device.id}
                          onClick={() => setSelectedDevice(device)}
                          className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                            selectedDevice.id === device.id
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <Icon className="w-5 h-5 mx-auto mb-2" />
                          <p className="text-xs font-medium text-foreground">{device.label}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Embed Code */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Code className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">Código de Integração</h3>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copiar
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 font-mono text-xs overflow-x-auto">
                    <pre className="text-foreground">{embedCode}</pre>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Baixar SDK
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Code className="w-4 h-4 mr-2" />
                      Documentação
                    </Button>
                  </div>
                </div>
              </div>

              {/* Live Preview */}
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <DeviceIcon className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Preview ao Vivo</h3>
                  </div>
                  <Badge variant="outline" className="text-green-500 border-green-500/20 bg-green-500/10">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Online
                  </Badge>
                </div>

                {/* Device Frame */}
                <div className="relative bg-muted/30 rounded-2xl p-8 min-h-[600px]">
                  {/* Browser/Device Chrome */}
                  <div className="absolute top-4 left-4 right-4 h-8 bg-background rounded-t-lg border border-border flex items-center px-3 gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 bg-muted rounded px-3 py-1 text-xs text-muted-foreground">
                      https://seusite.com.br
                    </div>
                  </div>

                  {/* Website Content Placeholder */}
                  <div className="mt-12 bg-background rounded-lg border border-border p-6 min-h-[400px]">
                    <div className="space-y-4">
                      <div className="h-8 bg-muted rounded w-1/3"></div>
                      <div className="h-4 bg-muted rounded w-2/3"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                      <div className="h-32 bg-muted rounded"></div>
                    </div>
                  </div>

                  {/* Webchat Widget */}
                  <div
                    className={`absolute ${
                      selectedPosition.id === 'bottom-right'
                        ? 'bottom-8 right-8'
                        : selectedPosition.id === 'bottom-left'
                        ? 'bottom-8 left-8'
                        : selectedPosition.id === 'top-right'
                        ? 'top-20 right-8'
                        : 'top-20 left-8'
                    } transition-all duration-300`}
                  >
                    {chatOpen ? (
                      <div
                        className={`w-80 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden transition-all duration-300 ${
                          chatMinimized ? 'h-14' : 'h-[500px]'
                        }`}
                      >
                        {/* Chat Header */}
                        <div
                          className="p-4 flex items-center justify-between"
                          style={{
                            background: `linear-gradient(135deg, ${selectedTheme.primary}, ${selectedTheme.secondary})`,
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                              <MessageSquare className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-white">Orion AI</p>
                              <p className="text-xs text-white/80">Online agora</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button className="text-white/80 hover:text-white transition-colors p-1">
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>Configurações do Chat</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked>
                                  <Bell className="w-4 h-4 mr-2" />
                                  Notificações Sonoras
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem checked>
                                  <Volume2 className="w-4 h-4 mr-2" />
                                  Sons de Mensagem
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Languages className="w-4 h-4 mr-2" />
                                  Mudar Idioma
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Clock className="w-4 h-4 mr-2" />
                                  Horário de Atendimento
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <BarChart3 className="w-4 h-4 mr-2" />
                                  Ver Estatísticas
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <FileText className="w-4 h-4 mr-2" />
                                  Exportar Conversa
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <RefreshCw className="w-4 h-4 mr-2" />
                                  Reiniciar Chat
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <button
                              onClick={() => setChatMinimized(!chatMinimized)}
                              className="text-white/80 hover:text-white transition-colors p-1"
                            >
                              <Minimize2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setChatOpen(false)}
                              className="text-white/80 hover:text-white transition-colors p-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {!chatMinimized && (
                          <>
                            {/* Chat Messages */}
                            <div className="p-4 space-y-3 h-[360px] overflow-y-auto bg-muted/20">
                              <div className="flex justify-start">
                                <div className="bg-background border border-border rounded-2xl px-4 py-2 max-w-[80%]">
                                  <p className="text-sm text-foreground">
                                    Olá! 👋 Como posso ajudar você hoje?
                                  </p>
                                  <span className="text-xs text-muted-foreground">14:32</span>
                                </div>
                              </div>
                              <div className="flex justify-end">
                                <div
                                  className="rounded-2xl px-4 py-2 max-w-[80%]"
                                  style={{ backgroundColor: selectedTheme.primary }}
                                >
                                  <p className="text-sm text-white">
                                    Quero saber mais sobre os planos
                                  </p>
                                  <span className="text-xs text-white/80">14:33</span>
                                </div>
                              </div>
                              <div className="flex justify-start">
                                <div className="bg-background border border-border rounded-2xl px-4 py-2 max-w-[80%]">
                                  <p className="text-sm text-foreground">
                                    Claro! Temos 3 planos disponíveis: Básico, Pro e Enterprise. Qual te interessa mais?
                                  </p>
                                  <span className="text-xs text-muted-foreground">14:33</span>
                                </div>
                              </div>
                            </div>

                            {/* Chat Input */}
                            <div className="p-3 border-t border-border bg-background">
                              <div className="flex items-center gap-2">
                                <button className="text-muted-foreground hover:text-foreground transition-colors">
                                  <Paperclip className="w-4 h-4" />
                                </button>
                                <button className="text-muted-foreground hover:text-foreground transition-colors">
                                  <Smile className="w-4 h-4" />
                                </button>
                                <input
                                  type="text"
                                  value={message}
                                  onChange={(e) => setMessage(e.target.value)}
                                  placeholder="Digite sua mensagem..."
                                  className="flex-1 px-3 py-2 bg-muted rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <button
                                  className="w-8 h-8 rounded-full flex items-center justify-center"
                                  style={{ backgroundColor: selectedTheme.primary }}
                                >
                                  <Send className="w-4 h-4 text-white" />
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => setChatOpen(true)}
                        className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, ${selectedTheme.primary}, ${selectedTheme.secondary})`,
                        }}
                      >
                        <MessageSquare className="w-6 h-6 text-white" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
