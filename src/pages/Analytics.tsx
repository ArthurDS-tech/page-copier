import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { TrendingUp, MessageSquare, Users, Clock, Star, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Analytics() {
  const metrics = [
    { label: 'Conversas', value: '1,247', change: '+12%', icon: MessageSquare },
    { label: 'Clientes', value: '856', change: '+8%', icon: Users },
    { label: 'Taxa Resolução', value: '87%', change: '+3%', icon: TrendingUp },
    { label: 'Satisfação', value: '4.5/5', change: '+0.2', icon: Star },
    { label: 'Tempo Resp.', value: '2.3s', change: '-0.5s', icon: Clock },
    { label: 'Taxa IA', value: '92%', change: '+5%', icon: TrendingUp },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
                <p className="text-muted-foreground">Métricas e insights do seu atendimento</p>
              </div>
              <div className="flex items-center gap-3">
                <Select defaultValue="30">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Últimos 7 dias</SelectItem>
                    <SelectItem value="30">Últimos 30 dias</SelectItem>
                    <SelectItem value="90">Últimos 90 dias</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {metrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div key={metric.label} className="bg-card rounded-xl border border-border p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{metric.label}</span>
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">{metric.value}</p>
                    <p className="text-sm text-success">{metric.change} vs período anterior</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Conversas por Dia</h2>
              <div className="h-64 flex items-end justify-between gap-2">
                {[45, 52, 38, 61, 48, 23, 18].map((value, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-primary rounded-t" style={{ height: `${(value / 61) * 100}%` }}></div>
                    <span className="text-xs text-muted-foreground">
                      {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Top Tags</h2>
                <div className="space-y-3">
                  {[
                    { name: 'hot_lead', count: 247, percent: 20 },
                    { name: 'suporte', count: 189, percent: 15 },
                    { name: 'vip', count: 156, percent: 12 },
                    { name: 'cold_lead', count: 134, percent: 11 },
                  ].map((tag) => (
                    <div key={tag.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-foreground">{tag.name}</span>
                        <span className="text-sm text-muted-foreground">{tag.count} ({tag.percent}%)</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-full rounded-full" style={{ width: `${tag.percent * 5}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Canais</h2>
                <div className="space-y-4">
                  {[
                    { name: 'WhatsApp', count: 856, percent: 69 },
                    { name: 'Instagram', count: 234, percent: 19 },
                    { name: 'Webchat', count: 157, percent: 12 },
                  ].map((channel) => (
                    <div key={channel.name} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-foreground">{channel.name}</span>
                          <span className="text-sm text-muted-foreground">{channel.count}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-success h-full rounded-full" style={{ width: `${channel.percent}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
