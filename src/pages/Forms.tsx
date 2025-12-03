import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { FileText, Send, Save, Eye, Copy, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const savedForms = [
  {
    id: '1',
    name: 'Template de Boas-vindas',
    type: 'Mensagem Automática',
    lastModified: '13 Nov 2025',
    status: 'active',
  },
  {
    id: '2',
    name: 'Pesquisa de Satisfação',
    type: 'Formulário',
    lastModified: '12 Nov 2025',
    status: 'active',
  },
  {
    id: '3',
    name: 'Coleta de Feedback',
    type: 'Formulário',
    lastModified: '10 Nov 2025',
    status: 'draft',
  },
];

export default function Forms() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Formulários e Templates</h1>
                <p className="text-muted-foreground">Crie e gerencie mensagens automáticas e formulários</p>
              </div>
              <Button>
                <FileText className="w-4 h-4 mr-2" />
                Novo Template
              </Button>
            </div>

            <Tabs defaultValue="create" className="space-y-6">
              <TabsList>
                <TabsTrigger value="create">Criar Novo</TabsTrigger>
                <TabsTrigger value="saved">Templates Salvos</TabsTrigger>
              </TabsList>

              <TabsContent value="create" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Form Builder */}
                  <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6 space-y-6">
                    <div>
                      <h2 className="text-lg font-semibold text-foreground mb-4">Criar Template</h2>
                    </div>

                    {/* Form Type */}
                    <div className="space-y-2">
                      <Label htmlFor="form-type">Tipo de Template</Label>
                      <Select defaultValue="message">
                        <SelectTrigger id="form-type">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="message">Mensagem Automática</SelectItem>
                          <SelectItem value="form">Formulário</SelectItem>
                          <SelectItem value="survey">Pesquisa</SelectItem>
                          <SelectItem value="welcome">Boas-vindas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Template Name */}
                    <div className="space-y-2">
                      <Label htmlFor="template-name">Nome do Template</Label>
                      <Input
                        id="template-name"
                        placeholder="Ex: Mensagem de Boas-vindas"
                      />
                    </div>

                    {/* Channel */}
                    <div className="space-y-2">
                      <Label htmlFor="channel">Canal</Label>
                      <Select defaultValue="whatsapp">
                        <SelectTrigger id="channel">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="webchat">Webchat</SelectItem>
                          <SelectItem value="all">Todos os Canais</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Message Content */}
                    <div className="space-y-2">
                      <Label htmlFor="message">Conteúdo da Mensagem</Label>
                      <Textarea
                        id="message"
                        placeholder="Digite sua mensagem aqui..."
                        rows={8}
                        className="resize-none"
                      />
                      <p className="text-xs text-muted-foreground">
                        Use variáveis: {'{nome}'}, {'{empresa}'}, {'{produto}'}
                      </p>
                    </div>

                    {/* Quick Replies */}
                    <div className="space-y-2">
                      <Label>Respostas Rápidas (Opcional)</Label>
                      <div className="space-y-2">
                        <Input placeholder="Opção 1" />
                        <Input placeholder="Opção 2" />
                        <Input placeholder="Opção 3" />
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        + Adicionar Opção
                      </Button>
                    </div>

                    {/* Settings */}
                    <div className="space-y-4 pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Ativar Template</Label>
                          <p className="text-xs text-muted-foreground">
                            Template ficará disponível imediatamente
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Usar IA para Personalização</Label>
                          <p className="text-xs text-muted-foreground">
                            IA adaptará a mensagem ao contexto
                          </p>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Coletar Feedback</Label>
                          <p className="text-xs text-muted-foreground">
                            Adicionar pesquisa de satisfação
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                      <Button className="flex-1">
                        <Save className="w-4 h-4 mr-2" />
                        Salvar Template
                      </Button>
                      <Button variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        Visualizar
                      </Button>
                      <Button variant="outline">
                        <Send className="w-4 h-4 mr-2" />
                        Testar
                      </Button>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="text-sm font-semibold text-foreground mb-4">Preview</h3>
                    
                    {/* Phone mockup */}
                    <div className="bg-muted rounded-2xl p-4 aspect-[9/16] flex flex-col">
                      <div className="flex-1 space-y-3 overflow-y-auto">
                        {/* Message bubble */}
                        <div className="flex justify-end">
                          <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                            <p className="text-sm">
                              Olá! Bem-vindo à nossa plataforma. Como posso ajudar você hoje?
                            </p>
                          </div>
                        </div>

                        {/* Quick replies */}
                        <div className="space-y-2">
                          <button className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                            Ver produtos
                          </button>
                          <button className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                            Falar com atendente
                          </button>
                          <button className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                            Suporte técnico
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="mt-4 p-3 bg-muted/50 rounded-lg space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Caracteres:</span>
                        <span className="font-medium">87/1000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Variáveis:</span>
                        <span className="font-medium">0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Opções:</span>
                        <span className="font-medium">3</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="saved" className="space-y-6">
                <div className="bg-card rounded-xl border border-border">
                  <div className="p-6 border-b border-border">
                    <Input placeholder="Buscar templates..." />
                  </div>

                  <div className="divide-y divide-border">
                    {savedForms.map((form) => (
                      <div key={form.id} className="p-6 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-medium text-foreground">{form.name}</h3>
                              <Badge variant={form.status === 'active' ? 'default' : 'secondary'}>
                                {form.status === 'active' ? 'Ativo' : 'Rascunho'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{form.type}</p>
                            <p className="text-xs text-muted-foreground">
                              Última modificação: {form.lastModified}
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
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
