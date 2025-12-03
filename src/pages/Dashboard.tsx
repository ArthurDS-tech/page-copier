import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import {
  MessageSquare,
  Bot,
  TrendingUp,
  Users,
  CheckCircle2,
  Zap,
  Calendar,
  ArrowUpRight,
  MoreVertical,
  CheckSquare,
  GripVertical,
  XCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Clock,
  Target,
} from 'lucide-react';
import { useState } from 'react';

// Mini Statistics Data - Adaptado para plataforma de WhatsApp/IA
const miniStats = [
  {
    icon: MessageSquare,
    name: 'Mensagens Hoje',
    value: '12.458',
    hiddenValue: '••••',
    tooltip: 'Total de mensagens processadas pela IA hoje',
    iconBg: 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800',
    iconColor: 'text-blue-500',
  },
  {
    icon: Bot,
    name: 'Conversas Ativas',
    value: '1.485',
    hiddenValue: '••••',
    tooltip: 'Conversas sendo atendidas pela IA agora',
    iconBg: 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800',
    iconColor: 'text-blue-500',
  },
  {
    icon: TrendingUp,
    name: 'Taxa de Resolução',
    value: '87.3%',
    hiddenValue: '••%',
    growth: '+5.2%',
    tooltip: 'Conversas resolvidas automaticamente pela IA',
    iconBg: 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800',
    iconColor: 'text-blue-500',
  },
  {
    icon: Users,
    name: 'Clientes Ativos',
    value: '3.247',
    hiddenValue: '••••',
    tooltip: 'Total de clientes únicos este mês',
    iconBg: 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800',
    iconColor: 'text-blue-500',
  },
  {
    icon: Zap,
    name: 'Automações Ativas',
    value: '154',
    hiddenValue: '•••',
    tooltip: 'Fluxos e automações em execução',
    iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    iconColor: 'text-white',
  },
  {
    icon: CheckCircle2,
    name: 'Agentes Treinados',
    value: '12',
    hiddenValue: '••',
    tooltip: 'Agentes de IA configurados e ativos',
    iconBg: 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800',
    iconColor: 'text-blue-500',
  },
];

// Weekly Messages Data - Mensagens por dia da semana
const weeklyMessagesData = [
  { day: 'Seg', value: 1840, tooltip: '1.840 mensagens' },
  { day: 'Ter', value: 2260, tooltip: '2.260 mensagens' },
  { day: 'Qua', value: 1950, tooltip: '1.950 mensagens' },
  { day: 'Qui', value: 2680, tooltip: '2.680 mensagens' },
  { day: 'Sex', value: 2150, tooltip: '2.150 mensagens' },
  { day: 'Sáb', value: 1420, tooltip: '1.420 mensagens' },
  { day: 'Dom', value: 980, tooltip: '980 mensagens' },
];

// Daily Conversations Data - Conversas por hora
const dailyConversationsData = [
  { hour: '00h', value: 120, tooltip: '120 conversas' },
  { hour: '04h', value: 85, tooltip: '85 conversas' },
  { hour: '08h', value: 340, tooltip: '340 conversas' },
  { hour: '12h', value: 580, tooltip: '580 conversas' },
  { hour: '16h', value: 420, tooltip: '420 conversas' },
  { hour: '20h', value: 290, tooltip: '290 conversas' },
  { hour: '24h', value: 150, tooltip: '150 conversas' },
];

// Agents Performance Table
const agentsPerformanceData = [
  { name: 'Agente Vendas', checked: true, efficiency: '94.5%', interactions: 2458, lastActive: 'Agora' },
  { name: 'Agente Suporte', checked: true, efficiency: '89.2%', interactions: 1845, lastActive: '2min atrás' },
  { name: 'Agente FAQ', checked: true, efficiency: '96.8%', interactions: 3124, lastActive: 'Agora' },
  { name: 'Agente Cobrança', checked: true, efficiency: '87.3%', interactions: 658, lastActive: '5min atrás' },
  { name: 'Agente Onboarding', checked: true, efficiency: '91.7%', interactions: 428, lastActive: '1min atrás' },
];

// Automation Flows Table
const automationFlowsData = [
  { name: 'Boas-vindas Novos Clientes', status: 'Ativo', date: '01 Dez 2025', performance: 95.5 },
  { name: 'Follow-up Vendas', status: 'Ativo', date: '28 Nov 2025', performance: 88.2 },
  { name: 'Pesquisa Satisfação', status: 'Pausado', date: '15 Nov 2025', performance: 72.8 },
  { name: 'Recuperação Carrinho', status: 'Ativo', date: '10 Nov 2025', performance: 91.3 },
];

// Training Tasks
const trainingTasks = [
  { name: 'Atualizar Base de Conhecimento', checked: false },
  { name: 'Revisar Respostas Automáticas', checked: true },
  { name: 'Treinar Novo Produto', checked: true },
  { name: 'Adicionar FAQs', checked: false },
  { name: 'Configurar Intents', checked: true },
];

export default function Dashboard() {
  const [showSensitiveData, setShowSensitiveData] = useState(true);
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1920px] mx-auto p-5 md:p-8 space-y-5">
            {/* Header com botão de privacidade */}
            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                <p className="text-sm text-muted-foreground">Visão geral da sua plataforma de IA</p>
              </div>
              <button
                onClick={() => setShowSensitiveData(!showSensitiveData)}
                className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-all duration-200 group"
              >
                {showSensitiveData ? (
                  <>
                    <Eye className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      Ocultar Dados
                    </span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      Mostrar Dados
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Mini Statistics Grid - 6 cards com tooltips */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
              {miniStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="relative bg-card rounded-2xl border border-border p-4 hover:shadow-lg hover:border-primary/30 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 group cursor-pointer"
                    style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
                    title={stat.tooltip}
                  >
                    {/* Tooltip on hover */}
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                      {stat.tooltip}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                    </div>

                    <div className="flex items-center h-full">
                      <div className={`w-14 h-14 rounded-xl ${stat.iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-7 h-7 ${stat.iconColor}`} />
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-xs text-muted-foreground mb-1">{stat.name}</p>
                        <p className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                          {showSensitiveData ? stat.value : stat.hiddenValue}
                        </p>
                        {stat.growth && showSensitiveData && (
                          <div className="flex items-center gap-1 mt-1">
                            <ArrowUpRight className="w-3 h-3 text-green-500" />
                            <span className="text-xs text-green-500 font-bold">{stat.growth}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total Messages & Weekly Messages */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              {/* Total Messages Card */}
              <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300 animate-in fade-in slide-in-from-left-6" style={{ animationDelay: '300ms', animationFillMode: 'backwards' }}>
                <div className="flex items-center justify-between mb-6">
                  <button className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg text-sm text-muted-foreground hover:bg-muted/80 transition-colors">
                    <Calendar className="w-4 h-4" />
                    Últimos 7 dias
                  </button>
                  <button className="w-9 h-9 rounded-lg bg-muted hover:bg-muted/80 hover:scale-110 flex items-center justify-center transition-all duration-300">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-shrink-0 space-y-4">
                    {/* Main Value */}
                    <div>
                      <p className="text-5xl font-bold text-foreground mb-2 hover:text-primary transition-colors duration-300">
                        {showSensitiveData ? '13.280' : '•••••'}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground font-medium">Mensagens Processadas</span>
                        {showSensitiveData && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-green-500/10 rounded-full">
                            <ArrowUpRight className="w-3.5 h-3.5 text-green-500" />
                            <span className="text-xs text-green-500 font-bold">+18.2%</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-2 bg-green-500/10 rounded-lg border border-green-500/20">
                      <CheckCircle2 className="w-5 h-5 text-green-500 animate-pulse" />
                      <span className="text-sm text-green-500 font-bold">Performance Excelente</span>
                    </div>

                    {/* Additional Stats */}
                    {showSensitiveData && (
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">Média/dia</p>
                          <p className="text-lg font-bold text-foreground">1.897</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">Pico</p>
                          <p className="text-lg font-bold text-foreground">2.680</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Interactive Line Chart SVG */}
                  <div className="flex-1 h-64 relative group">
                    <svg className="w-full h-full" viewBox="0 0 700 200" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.05" />
                        </linearGradient>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      
                      {/* Grid lines */}
                      <g opacity="0.1">
                        <line x1="0" y1="40" x2="700" y2="40" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5"/>
                        <line x1="0" y1="80" x2="700" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5"/>
                        <line x1="0" y1="120" x2="700" y2="120" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5"/>
                        <line x1="0" y1="160" x2="700" y2="160" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5"/>
                      </g>
                      
                      {/* Area fill */}
                      <path
                        d="M 0 150 L 100 110 L 200 130 L 300 70 L 400 100 L 500 50 L 600 85 L 700 60 L 700 200 L 0 200 Z"
                        fill="url(#lineGradient)"
                        className="transition-all duration-500"
                      />
                      
                      {/* Main line */}
                      <path
                        d="M 0 150 L 100 110 L 200 130 L 300 70 L 400 100 L 500 50 L 600 85 L 700 60"
                        fill="none"
                        stroke="rgb(59, 130, 246)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#glow)"
                        className="transition-all duration-500"
                      />
                      
                      {/* Data points */}
                      {showSensitiveData && (
                        <g>
                          <circle cx="0" cy="150" r="5" fill="rgb(59, 130, 246)" className="hover:r-7 transition-all cursor-pointer" opacity="0.8"/>
                          <circle cx="100" cy="110" r="5" fill="rgb(59, 130, 246)" className="hover:r-7 transition-all cursor-pointer" opacity="0.8"/>
                          <circle cx="200" cy="130" r="5" fill="rgb(59, 130, 246)" className="hover:r-7 transition-all cursor-pointer" opacity="0.8"/>
                          <circle cx="300" cy="70" r="5" fill="rgb(59, 130, 246)" className="hover:r-7 transition-all cursor-pointer" opacity="0.8"/>
                          <circle cx="400" cy="100" r="5" fill="rgb(59, 130, 246)" className="hover:r-7 transition-all cursor-pointer" opacity="0.8"/>
                          <circle cx="500" cy="50" r="5" fill="rgb(59, 130, 246)" className="hover:r-7 transition-all cursor-pointer" opacity="0.8"/>
                          <circle cx="600" cy="85" r="5" fill="rgb(59, 130, 246)" className="hover:r-7 transition-all cursor-pointer" opacity="0.8"/>
                          <circle cx="700" cy="60" r="6" fill="rgb(34, 197, 94)" className="animate-pulse" opacity="1"/>
                        </g>
                      )}
                    </svg>
                    
                    {/* Labels */}
                    {showSensitiveData && (
                      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-xs text-muted-foreground">
                        <span>Seg</span>
                        <span>Ter</span>
                        <span>Qua</span>
                        <span>Qui</span>
                        <span>Sex</span>
                        <span>Sáb</span>
                        <span className="text-green-500 font-semibold">Dom</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Weekly Messages Card */}
              <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300 animate-in fade-in slide-in-from-right-6" style={{ animationDelay: '400ms', animationFillMode: 'backwards' }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-foreground">Mensagens Semanais</h3>
                  <button className="w-9 h-9 rounded-lg bg-muted hover:bg-muted/80 hover:scale-110 flex items-center justify-center transition-all duration-300">
                    <Target className="w-5 h-5 text-primary" />
                  </button>
                </div>

                {/* Bar Chart com tooltips */}
                <div className="h-60 flex items-end justify-between gap-2">
                  {weeklyMessagesData.map((item, index) => (
                    <div key={index} className="relative flex-1 flex flex-col items-center gap-2 group">
                      {/* Tooltip */}
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                        {showSensitiveData ? item.tooltip : '••••'}
                      </div>
                      <div
                        className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg group-hover:from-blue-600 group-hover:to-blue-500 group-hover:scale-105 transition-all duration-300 cursor-pointer"
                        style={{ height: `${(item.value / 30) * 2.5}px` }}
                      ></div>
                      <span className="text-xs text-muted-foreground group-hover:text-foreground group-hover:font-semibold transition-all duration-200">
                        {item.day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Check Table & Daily Traffic + Pie Chart */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              {/* Agents Performance Table */}
              <div className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 animate-in fade-in slide-in-from-left-6" style={{ animationDelay: '500ms', animationFillMode: 'backwards' }}>
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Performance dos Agentes</h3>
                    <p className="text-xs text-muted-foreground mt-1">Eficiência e interações dos agentes de IA</p>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground hover:scale-110 hover:rotate-90 transition-all duration-300">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 text-xs text-muted-foreground font-semibold uppercase">Agente</th>
                        <th className="text-left p-4 text-xs text-muted-foreground font-semibold uppercase">Eficiência</th>
                        <th className="text-left p-4 text-xs text-muted-foreground font-semibold uppercase">Interações</th>
                        <th className="text-left p-4 text-xs text-muted-foreground font-semibold uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {agentsPerformanceData.map((row, index) => (
                        <tr key={index} className="border-b border-border/50 hover:bg-muted/30 hover:scale-[1.01] transition-all duration-200 group">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                defaultChecked={row.checked}
                                className="w-4 h-4 rounded border-border text-primary focus:ring-primary transition-transform hover:scale-125 duration-200"
                              />
                              <div className="flex items-center gap-2">
                                <Bot className="w-4 h-4 text-primary" />
                                <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                                  {row.name}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="text-sm font-bold text-green-500">
                              {showSensitiveData ? row.efficiency : '••%'}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="text-sm font-bold text-foreground">
                              {showSensitiveData ? row.interactions.toLocaleString() : '••••'}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-green-500" />
                              <span className="text-xs text-muted-foreground">{row.lastActive}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Daily Traffic & Pie Chart */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Daily Conversations */}
                <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300 animate-in fade-in slide-in-from-bottom-6" style={{ animationDelay: '600ms', animationFillMode: 'backwards' }}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Conversas por Hora</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-foreground">
                          {showSensitiveData ? '1.985' : '••••'}
                        </span>
                        <span className="text-sm text-muted-foreground">Hoje</span>
                      </div>
                    </div>
                    {showSensitiveData && (
                      <div className="flex items-center gap-1">
                        <ArrowUpRight className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-500 font-bold">+12.8%</span>
                      </div>
                    )}
                  </div>

                  {/* Mini Bar Chart com tooltips */}
                  <div className="h-60 flex items-end justify-between gap-1">
                    {dailyConversationsData.map((item, index) => (
                      <div key={index} className="relative flex-1 flex flex-col items-center gap-2 group">
                        {/* Tooltip */}
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                          {showSensitiveData ? item.tooltip : '•••'}
                        </div>
                        <div
                          className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t group-hover:from-blue-600 group-hover:to-blue-500 group-hover:scale-105 transition-all duration-300 cursor-pointer"
                          style={{ height: `${item.value / 2.5}px` }}
                        ></div>
                        <span className="text-xs text-muted-foreground group-hover:text-foreground group-hover:font-semibold transition-all duration-200">
                          {item.hour}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-card rounded-2xl border border-border p-6 animate-in fade-in slide-in-from-bottom-6" style={{ animationDelay: '700ms', animationFillMode: 'backwards' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-foreground">Seu Gráfico</h3>
                    <select className="text-sm bg-muted border-0 rounded-lg px-3 py-1.5 text-foreground font-bold focus:ring-2 focus:ring-primary">
                      <option>Mensal</option>
                      <option>Diário</option>
                      <option>Anual</option>
                    </select>
                  </div>

                  {/* Pie Chart SVG */}
                  <div className="flex items-center justify-center h-40 mb-4">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="64" cy="64" r="56" fill="none" stroke="rgb(59, 130, 246)" strokeWidth="24" strokeDasharray="221 352" />
                        <circle cx="64" cy="64" r="56" fill="none" stroke="rgb(34, 211, 238)" strokeWidth="24" strokeDasharray="88 352" strokeDashoffset="-221" />
                      </svg>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="bg-muted/30 rounded-xl p-4 flex items-center justify-around gap-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="text-xs text-muted-foreground font-bold">Seus arquivos</span>
                      </div>
                      <span className="text-lg font-bold text-foreground">63%</span>
                    </div>
                    <div className="w-px h-12 bg-border"></div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                        <span className="text-xs text-muted-foreground font-bold">Sistema</span>
                      </div>
                      <span className="text-lg font-bold text-foreground">25%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Complex Table & Tasks + Calendar */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              {/* Automation Flows Table */}
              <div className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 animate-in fade-in slide-in-from-left-6" style={{ animationDelay: '800ms', animationFillMode: 'backwards' }}>
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Fluxos de Automação</h3>
                    <p className="text-xs text-muted-foreground mt-1">Status e performance dos fluxos ativos</p>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground hover:scale-110 hover:rotate-90 transition-all duration-300">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 text-xs text-muted-foreground font-semibold uppercase">Fluxo</th>
                        <th className="text-left p-4 text-xs text-muted-foreground font-semibold uppercase">Status</th>
                        <th className="text-left p-4 text-xs text-muted-foreground font-semibold uppercase">Criado em</th>
                        <th className="text-left p-4 text-xs text-muted-foreground font-semibold uppercase">Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {automationFlowsData.map((row, index) => (
                        <tr key={index} className="border-b border-border/50 hover:bg-muted/30 hover:scale-[1.01] transition-all duration-200 group">
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-primary" />
                              <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                                {row.name}
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              {row.status === 'Ativo' && <CheckCircle2 className="w-5 h-5 text-green-500 animate-pulse" />}
                              {row.status === 'Pausado' && <XCircle className="w-5 h-5 text-orange-500" />}
                              <span className="text-sm font-bold text-foreground">{row.status}</span>
                            </div>
                          </td>
                          <td className="p-4 text-sm font-bold text-foreground">{row.date}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-28 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
                                  style={{ width: `${row.performance}%` }}
                                ></div>
                              </div>
                              <span className="text-xs font-bold text-muted-foreground">
                                {showSensitiveData ? `${row.performance}%` : '••%'}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tasks & Calendar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Training Tasks */}
                <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300 animate-in fade-in slide-in-from-bottom-6" style={{ animationDelay: '900ms', animationFillMode: 'backwards' }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <CheckSquare className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground">Tarefas de Treinamento</h3>
                      <p className="text-xs text-muted-foreground">Melhorias pendentes da IA</p>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground hover:scale-110 hover:rotate-90 transition-all duration-300">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-5 px-3">
                    {trainingTasks.map((task, index) => (
                      <div key={index} className="flex items-center gap-3 group hover:bg-muted/30 p-2 rounded-lg transition-all duration-200">
                        <input
                          type="checkbox"
                          defaultChecked={task.checked}
                          className="w-4 h-4 rounded border-border text-primary focus:ring-primary transition-transform hover:scale-125 duration-200"
                        />
                        <span className={`flex-1 text-sm font-bold transition-all duration-200 ${
                          task.checked ? 'text-muted-foreground line-through' : 'text-foreground group-hover:text-primary'
                        }`}>
                          {task.name}
                        </span>
                        <GripVertical className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-move" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mini Calendar */}
                <div className="bg-card rounded-2xl border border-border p-6 animate-in fade-in slide-in-from-bottom-6" style={{ animationDelay: '1000ms', animationFillMode: 'backwards' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-foreground">Dezembro 2025</h3>
                    <div className="flex gap-2">
                      <button className="w-7 h-7 rounded hover:bg-muted flex items-center justify-center transition-colors">
                        <span className="text-lg font-bold">‹</span>
                      </button>
                      <button className="w-7 h-7 rounded hover:bg-muted flex items-center justify-center transition-colors">
                        <span className="text-lg font-bold">›</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center">
                    {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, i) => (
                      <div key={i} className="text-xs text-muted-foreground font-bold py-2">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <button
                        key={day}
                        className={`text-sm py-2 rounded-lg hover:bg-muted transition-colors font-semibold ${
                          day === 3 ? 'bg-primary text-primary-foreground' : 'text-foreground'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
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
