import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface AddTextTrainingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: any) => void;
}

export function AddTextTrainingDialog({ open, onOpenChange, onSave }: AddTextTrainingDialogProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const handleSave = () => {
    onSave({
      id: Date.now().toString(),
      ...formData,
      type: 'text',
      date: new Date().toLocaleDateString('pt-BR'),
      status: 'processed',
      size: `${(formData.content.length / 1024).toFixed(2)} KB`,
    });
    setFormData({ title: '', content: '' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Treinar IA com Texto</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título do Conteúdo</Label>
            <Input
              id="title"
              placeholder="Ex: Política de Devolução"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Conteúdo para Treinamento</Label>
            <Textarea
              id="content"
              placeholder="Cole ou digite o texto que a IA deve aprender..."
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              rows={15}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              {formData.content.length} caracteres • {(formData.content.length / 1024).toFixed(2)} KB
            </p>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              💡 <strong>Dica:</strong> Adicione informações importantes como políticas, procedimentos, 
              perguntas frequentes, descrições de produtos, ou qualquer conteúdo que a IA deve conhecer.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSave} disabled={!formData.title || !formData.content}>
            Adicionar Treinamento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
