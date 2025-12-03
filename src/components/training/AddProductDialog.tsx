import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (product: any) => void;
  product?: any;
}

export function AddProductDialog({ open, onOpenChange, onSave, product }: AddProductDialogProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    maxDiscount: product?.maxDiscount || 15,
    maxInstallments: product?.maxInstallments || 12,
  });

  const handleSave = () => {
    onSave({
      id: product?.id || Date.now().toString(),
      ...formData,
      price: Number(formData.price),
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{product ? 'Editar' : 'Adicionar'} Produto/Serviço</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Produto/Serviço</Label>
            <Input
              id="name"
              placeholder="Ex: Notebook Dell Inspiron 15"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descrição detalhada do produto..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$)</Label>
              <Input
                id="price"
                type="number"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxDiscount">Desconto Máximo (%)</Label>
              <Input
                id="maxDiscount"
                type="number"
                value={formData.maxDiscount}
                onChange={(e) => setFormData({...formData, maxDiscount: Number(e.target.value)})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxInstallments">Parcelamento Máximo</Label>
            <Input
              id="maxInstallments"
              type="number"
              value={formData.maxInstallments}
              onChange={(e) => setFormData({...formData, maxInstallments: Number(e.target.value)})}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSave} disabled={!formData.name || !formData.price}>
            {product ? 'Salvar' : 'Adicionar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
