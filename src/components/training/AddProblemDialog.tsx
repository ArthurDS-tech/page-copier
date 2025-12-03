import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

interface AddProblemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (problem: any) => void;
  problem?: any;
}

export function AddProblemDialog({ open, onOpenChange, onSave, problem }: AddProblemDialogProps) {
  const [formData, setFormData] = useState({
    problem: problem?.problem || '',
    solution: problem?.solution || '',
    category: problem?.category || 'Problemas Técnicos - App',
  });

  const handleSave = () => {
    onSave({
      id: problem?.id || Date.now().toString(),
      ...formData,
      successRate: problem?.successRate || 0,
      casesResolved: problem?.casesResolved || 0,
      totalCases: problem?.totalCases || 0,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{problem ? 'Editar' : 'Adicionar'} Problema Técnico</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="problem">Descrição do Problema</Label>
            <Textarea
              id="problem"
              placeholder="Ex: App não abre no iPhone 12"
              value={formData.problem}
              onChange={(e) => setFormData({...formData, problem: e.target.value})}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="solution">Solução</Label>
            <Textarea
              id="solution"
              placeholder="Ex: Desinstale o app, reinicie o celular e instale novamente..."
              value={formData.solution}
              onChange={(e) => setFormData({...formData, solution: e.target.value})}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Problemas Técnicos - App">Problemas Técnicos - App</SelectItem>
                <SelectItem value="Problemas Técnicos - Pagamento">Problemas Técnicos - Pagamento</SelectItem>
                <SelectItem value="Problemas Técnicos - Acesso">Problemas Técnicos - Acesso</SelectItem>
                <SelectItem value="Problemas Técnicos - Entrega">Problemas Técnicos - Entrega</SelectItem>
                <SelectItem value="Problemas Técnicos - Produto">Problemas Técnicos - Produto</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSave} disabled={!formData.problem || !formData.solution}>
            {problem ? 'Salvar' : 'Adicionar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
