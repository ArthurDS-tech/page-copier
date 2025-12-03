import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Bot, Package } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FlowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  flow?: any;
  onSave: (flow: any) => void;
}

const availableAgents = [
  { id: 'agent-1', name: 'Agente Vendas', type: 'Vendas' },
  { id: 'agent-2', name: 'Agente Suporte', type: 'Suporte' },
  { id: 'agent-3', name: 'Agente FAQ', type: 'FAQ' },
  { id: 'agent-4', name: 'Agente Cobrança', type: 'Cobrança' },
];

const availableProducts = [
  { id: 'prod-1', name: 'Plano Básico', price: 'R$ 49/mês' },
  { id: 'prod-2', name: 'Plano Pro', price: 'R$ 99/mês' },
  { id: 'prod-3', name: 'Plano Enterprise', price: 'R$ 299/mês' },
  { id: 'prod-4', name: 'Consultoria', price: 'R$ 500/hora' },
];

export function FlowDialog({ open, onOpenChange, flow, onSave }: FlowDialogProps) {
  const [name, setName] = useState('');
  const [trigger, setTrigger] = useState('');
  const [steps, setSteps] = useState<string[]>(['']);
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  useEffect(() => {
    if (flow) {
      setName(flow.name || '');
      setTrigger(flow.trigger || '');
      setSteps(flow.steps || ['']);
      setSelectedAgents(flow.agents || []);
      setSelectedProducts(flow.products || []);
    } else {
      setName('');
      setTrigger('');
      setSteps(['']);
      setSelectedAgents([]);
      setSelectedProducts([]);
    }
  }, [flow, open]);

  const handleAddStep = () => {
    setSteps([...steps, '']);
  };

  const handleRemoveStep = (index: number) => {
    if (steps.length > 1) {
      setSteps(steps.filter((_, i) => i !== index));
    }
  };

  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const toggleAgent = (agentId: string) => {
    setSelectedAgents(prev =>
      prev.includes(agentId)
        ? prev.filter(id => id !== agentId)
        : [...prev, agentId]
    );
  };

  const toggleProduct = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSave = () => {
    if (!name || !trigger || steps.filter(s => s.trim()).length === 0) {
      return;
    }

    const flowData = {
      id: flow?.id || Date.now().toString(),
      name,
      trigger,
      steps: steps.filter(s => s.trim() !== ''),
      agents: selectedAgents,
      products: selectedProducts,
      status: flow?.status || 'active',
      executions: flow?.executions || 0,
      successRate: flow?.successRate || 100,
      lastExecution: 'agora',
    };
    
    onSave(flowData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{flow ? 'Editar Flow' : 'Criar Novo Flow'}</DialogTitle>
          <DialogDescription>
            {flow ? 'Modifique as configurações do seu flow de automação.' : 'Configure um novo flow de automação para seu atendimento.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Nome do Flow */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Flow</Label>
            <Input
              id="name"
              placeholder="Ex: Boas-vindas Automáticas"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Trigger */}
          <div className="space-y-2">
            <Label htmlFor="trigger">Trigger (Gatilho)</Label>
            <Select value={trigger} onValueChange={setTrigger}>
              <SelectTrigger id="trigger">
                <SelectValue placeholder="Selecione o gatilho" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="📥 Nova mensagem de cliente desconhecido">
                  📥 Nova mensagem de cliente desconhecido
                </SelectItem>
                <SelectItem value="⏰ 24h sem resposta do cliente">
                  ⏰ 24h sem resposta do cliente
                </SelectItem>
                <SelectItem value="🏷️ Tag adicionada">
                  🏷️ Tag adicionada
                </SelectItem>
                <SelectItem value="🛒 Produto adicionado mas não comprado">
                  🛒 Produto adicionado mas não comprado
                </SelectItem>
                <SelectItem value="✅ Conversa marcada como resolvida">
                  ✅ Conversa marcada como resolvida
                </SelectItem>
                <SelectItem value="🎂 Data de aniversário">
                  🎂 Data de aniversário
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Agentes de IA */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-primary" />
              Agentes de IA (opcional)
            </Label>
            <p className="text-xs text-muted-foreground">Selecione os agentes que podem ser acionados neste flow</p>
            <div className="grid grid-cols-2 gap-2">
              {availableAgents.map((agent) => (
                <button
                  key={agent.id}
                  type="button"
                  onClick={() => toggleAgent(agent.id)}
                  className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                    selectedAgents.includes(agent.id)
                      ? 'border-primary bg-primary/10 text-foreground'
                      : 'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Bot className="w-4 h-4" />
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">{agent.name}</p>
                    <p className="text-xs opacity-70">{agent.type}</p>
                  </div>
                  {selectedAgents.includes(agent.id) && (
                    <Badge variant="default" className="text-xs">✓</Badge>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Produtos */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Package className="w-4 h-4 text-primary" />
              Produtos (opcional)
            </Label>
            <p className="text-xs text-muted-foreground">Selecione os produtos relacionados a este flow</p>
            <div className="grid grid-cols-2 gap-2">
              {availableProducts.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => toggleProduct(product.id)}
                  className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                    selectedProducts.includes(product.id)
                      ? 'border-primary bg-primary/10 text-foreground'
                      : 'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs opacity-70">{product.price}</p>
                  </div>
                  {selectedProducts.includes(product.id) && (
                    <Badge variant="default" className="text-xs">✓</Badge>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Passos */}
          <div className="space-y-2">
            <Label>Passos do Fluxo</Label>
            <div className="space-y-2">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex-shrink-0 w-8 h-10 flex items-center justify-center">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                      {index + 1}
                    </span>
                  </div>
                  <Textarea
                    placeholder={`Passo ${index + 1}: Ex: Enviar mensagem de boas-vindas`}
                    value={step}
                    onChange={(e) => handleStepChange(index, e.target.value)}
                    rows={2}
                    className="flex-1"
                  />
                  {steps.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveStep(index)}
                      className="flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddStep}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Passo
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={!name || !trigger || steps.filter(s => s.trim()).length === 0}>
            {flow ? 'Salvar Alterações' : 'Criar Flow'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
