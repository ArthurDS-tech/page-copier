import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { User, Building, Lock, Bell, CreditCard, Users as UsersIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

export default function Settings() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Configurações</h1>
              <p className="text-muted-foreground">Gerencie as configurações da sua conta</p>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="profile">
                  <User className="w-4 h-4 mr-2" />
                  Perfil
                </TabsTrigger>
                <TabsTrigger value="company">
                  <Building className="w-4 h-4 mr-2" />
                  Empresa
                </TabsTrigger>
                <TabsTrigger value="security">
                  <Lock className="w-4 h-4 mr-2" />
                  Segurança
                </TabsTrigger>
                <TabsTrigger value="notifications">
                  <Bell className="w-4 h-4 mr-2" />
                  Notificações
                </TabsTrigger>
                <TabsTrigger value="billing">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Plano
                </TabsTrigger>
                <TabsTrigger value="team">
                  <UsersIcon className="w-4 h-4 mr-2" />
                  Equipe
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-4">
                <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                  <h3 className="font-semibold text-foreground">Perfil do Usuário</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" defaultValue="João Silva" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="joao@empresa.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" defaultValue="+55 11 99999-9999" />
                  </div>

                  <Button>Salvar Alterações</Button>
                </div>
              </TabsContent>

              <TabsContent value="company" className="space-y-4">
                <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                  <h3 className="font-semibold text-foreground">Informações da Empresa</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Nome da Empresa</Label>
                    <Input id="company-name" defaultValue="Empresa ABC" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input id="cnpj" defaultValue="00.000.000/0000-00" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" defaultValue="https://empresa.com" />
                  </div>

                  <Button>Salvar Alterações</Button>
                </div>
              </TabsContent>

              <TabsContent value="security" className="space-y-4">
                <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                  <h3 className="font-semibold text-foreground">Segurança</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Senha Atual</Label>
                    <Input id="current-password" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nova Senha</Label>
                    <Input id="new-password" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                    <Input id="confirm-password" type="password" />
                  </div>

                  <div className="flex items-center justify-between py-4 border-t border-border">
                    <div>
                      <p className="font-medium text-foreground">Autenticação de Dois Fatores</p>
                      <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança</p>
                    </div>
                    <Switch />
                  </div>

                  <Button>Alterar Senha</Button>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-4">
                <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                  <h3 className="font-semibold text-foreground">Preferências de Notificações</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Notificações por Email</p>
                        <p className="text-sm text-muted-foreground">Receba atualizações por email</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Notificações Push</p>
                        <p className="text-sm text-muted-foreground">Receba notificações no navegador</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Relatórios Semanais</p>
                        <p className="text-sm text-muted-foreground">Resumo semanal por email</p>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <Button>Salvar Preferências</Button>
                </div>
              </TabsContent>

              <TabsContent value="billing" className="space-y-4">
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-4">Plano Atual</h3>
                  
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-lg font-bold text-foreground">ENTERPRISE</p>
                      <p className="text-2xl font-bold text-primary">R$ 499/mês</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Renovação em 13 Dez 2025</p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Mensagens incluídas</span>
                      <span className="font-medium text-foreground">Ilimitadas</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Agentes IA</span>
                      <span className="font-medium text-foreground">5 agentes</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Usuários</span>
                      <span className="font-medium text-foreground">10 usuários</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline">Alterar Plano</Button>
                    <Button variant="outline" className="text-destructive">Cancelar Assinatura</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="team" className="space-y-4">
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Membros da Equipe</h3>
                    <Button>Adicionar Membro</Button>
                  </div>

                  <div className="space-y-3">
                    {[
                      { name: 'João Silva', email: 'joao@empresa.com', role: 'Admin' },
                      { name: 'Maria Santos', email: 'maria@empresa.com', role: 'Atendente' },
                      { name: 'Pedro Costa', email: 'pedro@empresa.com', role: 'Atendente' },
                    ].map((member, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium text-foreground">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{member.role}</span>
                          <Button variant="ghost" size="sm">Editar</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
