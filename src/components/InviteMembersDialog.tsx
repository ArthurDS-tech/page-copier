import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, Mail, UserPlus, Shield, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InviteMembersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentMembers: Array<{ id: string; name: string; email: string; role: string; avatar: string }>;
}

export function InviteMembersDialog({ open, onOpenChange, currentMembers }: InviteMembersDialogProps) {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'admin' | 'member' | 'viewer'>('member');

  const handleInvite = () => {
    if (!email || !email.includes('@')) {
      toast({
        title: 'Email inválido',
        description: 'Por favor, insira um email válido.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Convite enviado!',
      description: `Convite enviado para ${email} como ${role === 'admin' ? 'Administrador' : role === 'member' ? 'Membro' : 'Visualizador'}.`,
    });

    setEmail('');
    setRole('member');
  };

  const handleRemoveMember = (memberId: string, memberName: string) => {
    toast({
      title: 'Membro removido',
      description: `${memberName} foi removido da equipe.`,
      variant: 'destructive',
    });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'member':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'viewer':
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'member':
        return 'Membro';
      case 'viewer':
        return 'Visualizador';
      default:
        return role;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Users className="w-5 h-5 text-primary" />
            Gerenciar Equipe
          </DialogTitle>
          <DialogDescription>
            Convide novos membros ou gerencie a equipe atual
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Invite Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Convidar novo membro
            </h3>
            
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="email@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'admin' | 'member' | 'viewer')}
                className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="viewer">Visualizador</option>
                <option value="member">Membro</option>
                <option value="admin">Administrador</option>
              </select>
              
              <Button onClick={handleInvite}>
                <Mail className="w-4 h-4 mr-2" />
                Enviar
              </Button>
            </div>

            {/* Role descriptions */}
            <div className="bg-muted/30 rounded-lg p-4 space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-red-500 mt-0.5" />
                <div>
                  <span className="font-semibold text-foreground">Administrador:</span>
                  <span className="text-muted-foreground"> Acesso total, pode gerenciar equipe e configurações</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-blue-500 mt-0.5" />
                <div>
                  <span className="font-semibold text-foreground">Membro:</span>
                  <span className="text-muted-foreground"> Pode criar e editar flows, agentes e treinamentos</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-gray-500 mt-0.5" />
                <div>
                  <span className="font-semibold text-foreground">Visualizador:</span>
                  <span className="text-muted-foreground"> Apenas visualização, sem permissão de edição</span>
                </div>
              </div>
            </div>
          </div>

          {/* Current Members */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Users className="w-4 h-4" />
              Membros atuais ({currentMembers.length})
            </h3>

            <div className="space-y-2">
              {currentMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 bg-card border border-border rounded-lg hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-full border-2 border-border"
                    />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={getRoleBadgeColor(member.role)}>
                      {getRoleLabel(member.role)}
                    </Badge>
                    
                    {member.role !== 'admin' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveMember(member.id, member.name)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
