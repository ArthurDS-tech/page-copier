import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useState } from 'react';

interface AddEmotionalResponseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (response: any) => void;
  response?: any;
}

export function AddEmotionalResponseDialog({ open, onOpenChange, onSave, response }: AddEmotionalResponseDialogProps) {
  const [formData, setFormData] = useState({
    category: response?.category || '',
    keywords: response?.keywords || [],
    responseText: response?.response || '',
    escalate: response?.escalate || false,
    severity: response?.severity || 'medium',
  });
  const [newKeyword, setNewKeyword] = useState('');

  const handleAddKeyword = () => {
    if (newKeyword && !formData.keywords.includes(newKeyword)) {
      setFormData({...formData, keywords: [...formData.keywords, newKeyword]});
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setFormData({...formData, keywords: formData.keywords.filter(k => k !== keyword)});
  };

  const handleSave = () => {
    onSave({
      id: response?.id || Date.now().toString(),
      category: formData.category,
      keywords: formData.keywords,
      response: formData.responseText,
      escalate: formData.escalate,
      severity: formData.severity,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{response ? 'Editar' : 'Adicionar'} Resposta Emocional</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Input
              id="category"
              placeholder="Ex: Falecimento, Doença, Frustração"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label>Palavras-chave</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Digite uma palavra-chave"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
              />
              <Button type="button" onClick={handleAddKeyword}>Adicionar</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.keywords.map((keyword) => (
                <Badge key={keyword} variant="secondary" className="gap-1">
                  {keyword}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => handleRemoveKeyword(keyword)} />
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="response">Resposta Empática</Label>
            <Textarea
              id="response"
              placeholder="Digite a resposta que a IA deve dar..."
              value={formData.responseText}
              onChange={(e) => setFormData({...formData, responseText: e.target.value})}
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="severity">Nível de Severidade</Label>
            <Select value={formData.severity} onValueChange={(value) => setFormData({...formData, severity: value})}>
              <SelectTrigger id="severity">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">Alto (Severo)</SelectItem>
                <SelectItem value="medium">Médio (Moderado)</SelectItem>
                <SelectItem value="low">Baixo (Leve)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between py-4 border-t border-border">
            <div>
              <p className="font-medium text-foreground">Escalar para Humano</p>
              <p className="text-sm text-muted-foreground">Notificar equipe após responder</p>
            </div>
            <Switch
              checked={formData.escalate}
              onCheckedChange={(checked) => setFormData({...formData, escalate: checked})}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSave} disabled={!formData.category || formData.keywords.length === 0 || !formData.responseText}>
            {response ? 'Salvar' : 'Adicionar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
