import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Settings, Save, Clock, Bell, Mail, Zap } from 'lucide-react';

interface AgentConfigTabProps {
  agent: any;
}

export function AgentConfigTab({ agent }: AgentConfigTabProps) {
  const { toast } = useToast();
  const [config, setConfig] = useState({
    enabled: agent.status === 'active',
    frequency: 'daily',
    executionTime: '08:00',
    notifications: true,
    emailReports: true,
    autoActions: false,
    minConfidence: 80,
    maxInsights: 50,
    customPrompt: '',
  });

  const handleSave = () => {
    toast({
      title: 'Configurações salvas!',
      description: 'As configurações do agente foram atualizadas com sucesso.',
    });
  };

  return (
    <div className="space-y-6">
      {/* General Settings */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          Configurações Gerais
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Agente Ativo</Label>
              <p className="text-sm text-muted-foreground">
                Ativar ou pausar execução do agente
              </p>
            </div>
            <Switch
              checked={config.enabled}
              onCheckedChange={(checked) => setConfig({ ...config, enabled: checked })}
            />
          </div>

          <div className="space-y-2">
            <Label>Frequência de Execução</Label>
            <Select
              value={config.frequency}
              onValueChange={(value) => setConfig({ ...config, frequency: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">A cada hora</SelectItem>
                <SelectItem value="daily">Diariamente</SelectItem>
                <SelectItem value="weekly">Semanalmente</SelectItem>
                <SelectItem value="monthly">Mensalmente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Horário de Execução</Label>
            <Input
              type="time"
              value={config.executionTime}
              onChange={(e) => setConfig({ ...config, executionTime: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Horário em que o agente será executado (fuso horário: America/Sao_Paulo)
            </p>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Notificações
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificações In-App</Label>
              <p className="text-sm text-muted-foreground">
                Receber notificações no dashboard
              </p>
            </div>
            <Switch
              checked={config.notifications}
              onCheckedChange={(checked) => setConfig({ ...config, notifications: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Relatórios por Email</Label>
              <p className="text-sm text-muted-foreground">
                Enviar relatórios automáticos por email
              </p>
            </div>
            <Switch
              checked={config.emailReports}
              onCheckedChange={(checked) => setConfig({ ...config, emailReports: checked })}
            />
          </div>
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          Configurações Avançadas
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Ações Automáticas</Label>
              <p className="text-sm text-muted-foreground">
                Permitir que o agente execute ações automaticamente
              </p>
            </div>
            <Switch
              checked={config.autoActions}
              onCheckedChange={(checked) => setConfig({ ...config, autoActions: checked })}
            />
          </div>

          <div className="space-y-2">
            <Label>Confiança Mínima (%)</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={config.minConfidence}
              onChange={(e) => setConfig({ ...config, minConfidence: parseInt(e.target.value) })}
            />
            <p className="text-xs text-muted-foreground">
              Nível mínimo de confiança para gerar insights (0-100)
            </p>
          </div>

          <div className="space-y-2">
            <Label>Máximo de Insights por Relatório</Label>
            <Input
              type="number"
              min="1"
              max="100"
              value={config.maxInsights}
              onChange={(e) => setConfig({ ...config, maxInsights: parseInt(e.target.value) })}
            />
            <p className="text-xs text-muted-foreground">
              Número máximo de insights a serem gerados em cada execução
            </p>
          </div>

          <div className="space-y-2">
            <Label>Prompt Customizado (Opcional)</Label>
            <Textarea
              placeholder="Adicione instruções específicas para este agente..."
              value={config.customPrompt}
              onChange={(e) => setConfig({ ...config, customPrompt: e.target.value })}
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              Instruções adicionais que serão incluídas no contexto do agente
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">
          Restaurar Padrões
        </Button>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
}
