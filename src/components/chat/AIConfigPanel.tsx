import { useState } from 'react';
import { 
  Settings, 
  Bot, 
  Zap, 
  MessageSquare, 
  Clock, 
  Target,
  Brain,
  Shield,
  AlertCircle,
  CheckCircle2,
  X,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Users,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AIConfigPanelProps {
  conversationId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function AIConfigPanel({ conversationId, isOpen, onClose }: AIConfigPanelProps) {
  const [aiEnabled, setAiEnabled] = useState(true);
  const [autoResponse, setAutoResponse] = useState(true);
  const [responseDelay, setResponseDelay] = useState(2);
  const [maxMessages, setMaxMessages] = useState(10);
  const [transferToHuman, setTransferToHuman] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState('general');
  const [tone, setTone] = useState('friendly');
  const [language, setLanguage] = useState('pt-BR');
  
  const [expandedSection, setExpandedSection] = useState<string | null>('behavior');

  if (!isOpen) return null;

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-border bg-gradient-to-r from-card to-muted/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Configurações de IA</h2>
                <p className="text-xs text-muted-foreground">Configure o comportamento da IA para esta conversa</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-xl">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Status Geral */}
          <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-emerald-500" />
                <span className="font-semibold text-sm">Status da IA</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={aiEnabled}
                  onChange={(e) => setAiEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
              </label>
            </div>
            {aiEnabled ? (
              <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>IA ativa e monitorando esta conversa</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <AlertCircle className="w-4 h-4" />
                <span>IA desativada - apenas atendimento manual</span>
              </div>
            )}
          </div>

          {/* Comportamento */}
          <div className="border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection('behavior')}
              className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-primary" />
                <span className="font-semibold text-sm">Comportamento</span>
              </div>
              {expandedSection === 'behavior' ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            
            {expandedSection === 'behavior' && (
              <div className="p-4 pt-0 space-y-4 border-t border-border/50">
                {/* Resposta Automática */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">Resposta Automática</label>
                    <input
                      type="checkbox"
                      checked={autoResponse}
                      onChange={(e) => setAutoResponse(e.target.checked)}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    IA responde automaticamente sem aprovação manual
                  </p>
                </div>

                {/* Delay de Resposta */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Delay de Resposta: {responseDelay}s
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={responseDelay}
                    onChange={(e) => setResponseDelay(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Tempo de espera antes da IA responder (mais natural)
                  </p>
                </div>

                {/* Máximo de Mensagens */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Máximo de Mensagens Consecutivas: {maxMessages}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={maxMessages}
                    onChange={(e) => setMaxMessages(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Limite de mensagens antes de transferir para humano
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Agente de IA */}
          <div className="border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection('agent')}
              className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Brain className="w-5 h-5 text-purple-500" />
                <span className="font-semibold text-sm">Agente de IA</span>
              </div>
              {expandedSection === 'agent' ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            
            {expandedSection === 'agent' && (
              <div className="p-4 pt-0 space-y-3 border-t border-border/50">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'general', name: 'Geral', icon: MessageSquare, desc: 'Atendimento geral' },
                    { id: 'sales', name: 'Vendas', icon: TrendingUp, desc: 'Foco em conversão' },
                    { id: 'support', name: 'Suporte', icon: Shield, desc: 'Resolução de problemas' },
                    { id: 'success', name: 'Sucesso', icon: Target, desc: 'Retenção de clientes' },
                  ].map((agent) => (
                    <button
                      key={agent.id}
                      onClick={() => setSelectedAgent(agent.id)}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        selectedAgent === agent.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <agent.icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{agent.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{agent.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tom de Voz */}
          <div className="border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection('tone')}
              className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-sm">Tom de Voz</span>
              </div>
              {expandedSection === 'tone' ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            
            {expandedSection === 'tone' && (
              <div className="p-4 pt-0 space-y-3 border-t border-border/50">
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'friendly', label: 'Amigável', emoji: '😊' },
                    { id: 'professional', label: 'Profissional', emoji: '💼' },
                    { id: 'casual', label: 'Casual', emoji: '😎' },
                    { id: 'formal', label: 'Formal', emoji: '🎩' },
                    { id: 'enthusiastic', label: 'Entusiasmado', emoji: '🎉' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTone(t.id)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        tone === t.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      {t.emoji} {t.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Transferência para Humano */}
          <div className="border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection('transfer')}
              className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="font-semibold text-sm">Transferência</span>
              </div>
              {expandedSection === 'transfer' ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            
            {expandedSection === 'transfer' && (
              <div className="p-4 pt-0 space-y-4 border-t border-border/50">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">Transferir Automaticamente</label>
                    <input
                      type="checkbox"
                      checked={transferToHuman}
                      onChange={(e) => setTransferToHuman(e.target.checked)}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Transfere para humano quando IA não consegue resolver
                  </p>
                </div>

                <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                  <p className="text-xs font-medium">Gatilhos de Transferência:</p>
                  <div className="space-y-1.5">
                    {[
                      'Cliente solicita falar com humano',
                      'Sentimento negativo detectado',
                      'Limite de mensagens atingido',
                      'Problema complexo identificado',
                    ].map((trigger, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        <span className="text-xs text-muted-foreground">{trigger}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Idioma */}
          <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
            <label className="text-sm font-medium mb-3 block">Idioma de Atendimento</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="pt-BR">🇧🇷 Português (Brasil)</option>
              <option value="en-US">🇺🇸 English (US)</option>
              <option value="es-ES">🇪🇸 Español</option>
              <option value="fr-FR">🇫🇷 Français</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-border bg-muted/20">
          <div className="flex items-center justify-between gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Salvar Configurações
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
