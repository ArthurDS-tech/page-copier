import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Upload, FileText, Image, BookOpen, Trash2, Plus, Settings, Heart, DollarSign, Wrench, CheckCircle, AlertTriangle, Edit, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AddProblemDialog } from '@/components/training/AddProblemDialog';
import { AddProductDialog } from '@/components/training/AddProductDialog';
import { AddTextTrainingDialog } from '@/components/training/AddTextTrainingDialog';
import { AddEmotionalResponseDialog } from '@/components/training/AddEmotionalResponseDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const initialDocuments = [
  { id: '1', name: 'Manual do Produto.pdf', type: 'PDF', size: '2.3 MB', date: '13 Nov 2025', status: 'processed' },
  { id: '2', name: 'FAQ Clientes.docx', type: 'DOCX', size: '1.1 MB', date: '12 Nov 2025', status: 'processed' },
  { id: '3', name: 'Políticas da Empresa.txt', type: 'TXT', size: '45 KB', date: '10 Nov 2025', status: 'processing' },
];

const initialImages = [
  { id: '1', name: 'Catálogo Produtos.jpg', size: '3.2 MB', date: '11 Nov 2025', status: 'processed' },
  { id: '2', name: 'Tabela Preços.png', size: '1.8 MB', date: '09 Nov 2025', status: 'processed' },
];

const initialProblems = [
  {
    id: '1',
    problem: 'App não abre no iPhone 12',
    solution: 'Desinstale o app, reinicie o celular e instale novamente da App Store',
    category: 'Problemas Técnicos - App',
    successRate: 92,
    casesResolved: 23,
    totalCases: 25,
  },
  {
    id: '2',
    problem: 'Pagamento não processa',
    solution: 'Verifique se o cartão está ativo e tem limite. Tente outro método de pagamento.',
    category: 'Problemas Técnicos - Pagamento',
    successRate: 88,
    casesResolved: 15,
    totalCases: 17,
  },
  {
    id: '3',
    problem: 'Erro de login',
    solution: 'Clique em "Esqueci minha senha" e siga as instruções no email',
    category: 'Problemas Técnicos - Acesso',
    successRate: 95,
    casesResolved: 38,
    totalCases: 40,
  },
];

const initialProducts = [
  { id: '1', name: 'Notebook Dell Inspiron 15', description: 'Notebook com Intel i5, 8GB RAM', price: 3500, maxDiscount: 15, maxInstallments: 12 },
  { id: '2', name: 'iPhone 15 Pro', description: 'Smartphone Apple 256GB', price: 7500, maxDiscount: 10, maxInstallments: 10 },
  { id: '3', name: 'Consultoria Premium', description: 'Pacote de consultoria mensal', price: 2000, maxDiscount: 20, maxInstallments: 6 },
];

const initialEmotionalResponses = [
  {
    id: '1',
    category: 'Falecimento',
    keywords: ['faleceu', 'morreu', 'óbito'],
    response: 'Sinto muito pela sua perda. 😔 Entendo que este é um momento difícil. Vou processar o cancelamento imediatamente e isentar qualquer taxa.',
    escalate: true,
    severity: 'high',
  },
  {
    id: '2',
    category: 'Doença',
    keywords: ['doente', 'hospital', 'internado'],
    response: 'Lamento saber que você está passando por isso. Vou ajudar da melhor forma possível.',
    escalate: true,
    severity: 'high',
  },
  {
    id: '3',
    category: 'Frustração',
    keywords: ['frustrado', 'cansado', 'desistir'],
    response: 'Entendo sua frustração e vou fazer o possível para resolver isso rapidamente.',
    escalate: false,
    severity: 'medium',
  },
];

export default function Training() {
  const { toast } = useToast();
  const [documents, setDocuments] = useState(initialDocuments);
  const [images, setImages] = useState(initialImages);
  const [problems, setProblems] = useState(initialProblems);
  const [products, setProducts] = useState(initialProducts);
  const [emotionalResponses, setEmotionalResponses] = useState(initialEmotionalResponses);
  
  // Dialog states
  const [problemDialogOpen, setProblemDialogOpen] = useState(false);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [textTrainingDialogOpen, setTextTrainingDialogOpen] = useState(false);
  const [emotionalDialogOpen, setEmotionalDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [deleteType, setDeleteType] = useState<string>('');

  const [negotiationRules, setNegotiationRules] = useState({
    maxDiscountPercent: 15,
    maxDiscountAmount: 500,
    minValueForDiscount: 100,
    maxInstallments: 12,
    requireApprovalAbove: 1000,
  });

  // Handlers
  const handleSaveProblem = (problem: any) => {
    const exists = problems.find(p => p.id === problem.id);
    if (exists) {
      setProblems(problems.map(p => p.id === problem.id ? problem : p));
      toast({ title: 'Problema atualizado!', description: 'O problema técnico foi atualizado com sucesso.' });
    } else {
      setProblems([...problems, problem]);
      toast({ title: 'Problema adicionado!', description: 'O problema técnico foi adicionado com sucesso.' });
    }
  };

  const handleSaveProduct = (product: any) => {
    const exists = products.find(p => p.id === product.id);
    if (exists) {
      setProducts(products.map(p => p.id === product.id ? product : p));
      toast({ title: 'Produto atualizado!', description: 'O produto foi atualizado com sucesso.' });
    } else {
      setProducts([...products, product]);
      toast({ title: 'Produto adicionado!', description: 'O produto foi adicionado com sucesso.' });
    }
  };

  const handleSaveTextTraining = (data: any) => {
    setDocuments([...documents, data]);
    toast({ title: 'Treinamento adicionado!', description: 'O conteúdo foi adicionado à base de conhecimento.' });
  };

  const handleSaveEmotionalResponse = (response: any) => {
    const exists = emotionalResponses.find(r => r.id === response.id);
    if (exists) {
      setEmotionalResponses(emotionalResponses.map(r => r.id === response.id ? response : r));
      toast({ title: 'Resposta atualizada!', description: 'A resposta emocional foi atualizada.' });
    } else {
      setEmotionalResponses([...emotionalResponses, response]);
      toast({ title: 'Resposta adicionada!', description: 'A resposta emocional foi adicionada.' });
    }
  };

  const handleDelete = () => {
    if (deleteType === 'problem') {
      setProblems(problems.filter(p => p.id !== selectedItem.id));
      toast({ title: 'Problema excluído', variant: 'destructive' });
    } else if (deleteType === 'product') {
      setProducts(products.filter(p => p.id !== selectedItem.id));
      toast({ title: 'Produto excluído', variant: 'destructive' });
    } else if (deleteType === 'emotional') {
      setEmotionalResponses(emotionalResponses.filter(r => r.id !== selectedItem.id));
      toast({ title: 'Resposta excluída', variant: 'destructive' });
    } else if (deleteType === 'document') {
      setDocuments(documents.filter(d => d.id !== selectedItem.id));
      toast({ title: 'Documento excluído', variant: 'destructive' });
    }
    setDeleteDialogOpen(false);
  };

  const openDeleteDialog = (item: any, type: string) => {
    setSelectedItem(item);
    setDeleteType(type);
    setDeleteDialogOpen(true);
  };

  const handleSaveNegotiationRules = () => {
    toast({ title: 'Regras salvas!', description: 'As regras de negociação foram atualizadas com sucesso.' });
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Treinamento Avançado da IA</h1>
              <p className="text-muted-foreground">Configure e gerencie a base de conhecimento da sua IA</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="bg-card rounded-xl border border-border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Documentos</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{documents.length}</p>
              </div>

              <div className="bg-card rounded-xl border border-border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-4 h-4 text-success" />
                  <span className="text-sm text-muted-foreground">Produtos</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{products.length}</p>
              </div>

              <div className="bg-card rounded-xl border border-border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Wrench className="w-4 h-4 text-warning" />
                  <span className="text-sm text-muted-foreground">Problemas</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{problems.length}</p>
              </div>

              <div className="bg-card rounded-xl border border-border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-success" />
                  <span className="text-sm text-muted-foreground">Negociações</span>
                </div>
                <p className="text-2xl font-bold text-foreground">89</p>
              </div>

              <div className="bg-card rounded-xl border border-border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-destructive" />
                  <span className="text-sm text-muted-foreground">Emocionais</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{emotionalResponses.length}</p>
              </div>
            </div>

            <Tabs defaultValue="documents" className="space-y-4">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="documents"><FileText className="w-4 h-4 mr-2" />Documentos</TabsTrigger>
                <TabsTrigger value="products"><Package className="w-4 h-4 mr-2" />Produtos</TabsTrigger>
                <TabsTrigger value="technical"><Wrench className="w-4 h-4 mr-2" />Problemas</TabsTrigger>
                <TabsTrigger value="negotiation"><DollarSign className="w-4 h-4 mr-2" />Negociação</TabsTrigger>
                <TabsTrigger value="emotional"><Heart className="w-4 h-4 mr-2" />Emocional</TabsTrigger>
                <TabsTrigger value="settings"><Settings className="w-4 h-4 mr-2" />Config</TabsTrigger>
              </TabsList>

              {/* Documents Tab */}
              <TabsContent value="documents" className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Treine a IA com documentos ou texto livre</p>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setTextTrainingDialogOpen(true)}>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Adicionar Texto
                    </Button>
                    <Button>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Arquivo
                    </Button>
                  </div>
                </div>

                <div className="bg-card rounded-xl border border-border divide-y divide-border">
                  {documents.map((doc) => (
                    <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">{doc.size} • {doc.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={doc.status === 'processed' ? 'default' : 'secondary'}>
                          {doc.status === 'processed' ? 'Processado' : 'Processando...'}
                        </Badge>
                        {doc.type && <Badge variant="outline">{doc.type}</Badge>}
                        <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(doc, 'document')}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Products Tab */}
              <TabsContent value="products" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">Catálogo de Produtos/Serviços</h3>
                    <p className="text-sm text-muted-foreground">Gerencie produtos e configure regras de negociação individuais</p>
                  </div>
                  <Button onClick={() => { setSelectedItem(null); setProductDialogOpen(true); }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Produto
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="bg-card rounded-xl border border-border p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">{product.name}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Preço: </span>
                              <span className="font-semibold text-foreground">R$ {product.price.toFixed(2)}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Desc. Máx: </span>
                              <span className="font-semibold text-success">{product.maxDiscount}%</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Parc: </span>
                              <span className="font-semibold text-foreground">{product.maxInstallments}x</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-3 border-t border-border">
                        <Button variant="outline" size="sm" onClick={() => { setSelectedItem(product); setProductDialogOpen(true); }}>
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive" onClick={() => openDeleteDialog(product, 'product')}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Excluir
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Technical Problems Tab */}
              <TabsContent value="technical" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">Problemas Técnicos Treinados</h3>
                    <p className="text-sm text-muted-foreground">Ensine a IA a resolver problemas específicos do seu negócio</p>
                  </div>
                  <Button onClick={() => { setSelectedItem(null); setProblemDialogOpen(true); }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Problema
                  </Button>
                </div>

                <div className="space-y-3">
                  {problems.map((problem) => (
                    <div key={problem.id} className="bg-card rounded-xl border border-border p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Wrench className="w-5 h-5 text-warning" />
                            <h4 className="font-semibold text-foreground">{problem.problem}</h4>
                          </div>
                          <Badge variant="outline" className="mb-3">{problem.category}</Badge>
                          <div className="bg-muted/50 rounded-lg p-3 mb-3">
                            <p className="text-sm text-foreground"><strong>Solução:</strong> {problem.solution}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Taxa de Sucesso: </span>
                            <span className="font-semibold text-success">{problem.successRate}%</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Casos: </span>
                            <span className="font-semibold text-foreground">{problem.casesResolved}/{problem.totalCases}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => { setSelectedItem(problem); setProblemDialogOpen(true); }}>Editar</Button>
                          <Button variant="outline" size="sm" className="text-destructive" onClick={() => openDeleteDialog(problem, 'problem')}>Excluir</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Negotiation Tab */}
              <TabsContent value="negotiation" className="space-y-4">
                <div className="bg-card rounded-xl border border-border p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Regras Globais de Negociação</h3>
                    <p className="text-sm text-muted-foreground">Configure limites padrão (podem ser sobrescritos por produto)</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maxDiscountPercent">Desconto Máximo (%)</Label>
                      <Input id="maxDiscountPercent" type="number" value={negotiationRules.maxDiscountPercent}
                        onChange={(e) => setNegotiationRules({...negotiationRules, maxDiscountPercent: Number(e.target.value)})} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxDiscountAmount">Desconto Máximo (R$)</Label>
                      <Input id="maxDiscountAmount" type="number" value={negotiationRules.maxDiscountAmount}
                        onChange={(e) => setNegotiationRules({...negotiationRules, maxDiscountAmount: Number(e.target.value)})} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="minValueForDiscount">Valor Mínimo para Desconto (R$)</Label>
                      <Input id="minValueForDiscount" type="number" value={negotiationRules.minValueForDiscount}
                        onChange={(e) => setNegotiationRules({...negotiationRules, minValueForDiscount: Number(e.target.value)})} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxInstallments">Parcelamento Máximo</Label>
                      <Input id="maxInstallments" type="number" value={negotiationRules.maxInstallments}
                        onChange={(e) => setNegotiationRules({...negotiationRules, maxInstallments: Number(e.target.value)})} />
                    </div>
                  </div>

                  <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">Requer Aprovação Humana Acima de:</p>
                        <Input type="number" value={negotiationRules.requireApprovalAbove}
                          onChange={(e) => setNegotiationRules({...negotiationRules, requireApprovalAbove: Number(e.target.value)})}
                          className="max-w-xs" />
                        <p className="text-xs text-muted-foreground">Negociações acima deste valor serão escaladas</p>
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleSaveNegotiationRules}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Salvar Regras
                  </Button>
                </div>

                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-4">Estatísticas de Negociação</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-foreground">89</p>
                      <p className="text-sm text-muted-foreground">Aprovadas Auto</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-foreground">12</p>
                      <p className="text-sm text-muted-foreground">Escaladas</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-success">94%</p>
                      <p className="text-sm text-muted-foreground">Taxa Conversão</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Emotional Support Tab */}
              <TabsContent value="emotional" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">Respostas Emocionais</h3>
                    <p className="text-sm text-muted-foreground">Configure respostas empáticas para situações delicadas</p>
                  </div>
                  <Button onClick={() => { setSelectedItem(null); setEmotionalDialogOpen(true); }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Resposta
                  </Button>
                </div>

                <div className="space-y-3">
                  {emotionalResponses.map((response) => (
                    <div key={response.id} className="bg-card rounded-xl border border-border p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <Heart className="w-5 h-5 text-destructive" />
                            <h4 className="font-semibold text-foreground">{response.category}</h4>
                            <Badge variant={response.severity === 'high' ? 'destructive' : response.severity === 'medium' ? 'default' : 'secondary'}>
                              {response.severity === 'high' ? 'Severo' : response.severity === 'medium' ? 'Moderado' : 'Leve'}
                            </Badge>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground mb-1">Palavras-chave:</p>
                              <div className="flex flex-wrap gap-2">
                                {response.keywords.map((keyword, i) => (
                                  <Badge key={i} variant="outline">{keyword}</Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-medium text-muted-foreground mb-1">Resposta:</p>
                              <div className="bg-muted/50 rounded-lg p-3">
                                <p className="text-sm text-foreground">{response.response}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {response.escalate && (
                                <Badge variant="default">
                                  <AlertTriangle className="w-3 h-3 mr-1" />
                                  Escala para humano
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-3 border-t border-border">
                        <Button variant="outline" size="sm" onClick={() => { setSelectedItem(response); setEmotionalDialogOpen(true); }}>Editar</Button>
                        <Button variant="outline" size="sm" className="text-destructive" onClick={() => openDeleteDialog(response, 'emotional')}>Excluir</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-4">
                <div className="bg-card rounded-xl border border-border p-6 space-y-6">
                  <h3 className="font-semibold text-foreground">Configurações Gerais</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="tone">Tom de Resposta</Label>
                      <Select defaultValue="professional">
                        <SelectTrigger id="tone"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Profissional e Formal</SelectItem>
                          <SelectItem value="friendly">Amigável e Casual</SelectItem>
                          <SelectItem value="technical">Técnico e Detalhado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language">Idioma Principal</Label>
                      <Select defaultValue="pt-br">
                        <SelectTrigger id="language"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pt-br">Português (BR)</SelectItem>
                          <SelectItem value="en">Inglês</SelectItem>
                          <SelectItem value="es">Espanhol</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between py-4 border-t border-border">
                      <div>
                        <p className="font-medium text-foreground">Usar Emojis nas Respostas</p>
                        <p className="text-sm text-muted-foreground">Torna as respostas mais amigáveis</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between py-4 border-t border-border">
                      <div>
                        <p className="font-medium text-foreground">Detecção Automática de Sentimento</p>
                        <p className="text-sm text-muted-foreground">IA ajusta tom baseado no sentimento do cliente</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between py-4 border-t border-border">
                      <div>
                        <p className="font-medium text-foreground">Aprendizado Contínuo</p>
                        <p className="text-sm text-muted-foreground">IA aprende com feedback dos clientes</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <Button>Salvar Configurações</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <AddProblemDialog open={problemDialogOpen} onOpenChange={setProblemDialogOpen} onSave={handleSaveProblem} problem={selectedItem} />
      <AddProductDialog open={productDialogOpen} onOpenChange={setProductDialogOpen} onSave={handleSaveProduct} product={selectedItem} />
      <AddTextTrainingDialog open={textTrainingDialogOpen} onOpenChange={setTextTrainingDialogOpen} onSave={handleSaveTextTraining} />
      <AddEmotionalResponseDialog open={emotionalDialogOpen} onOpenChange={setEmotionalDialogOpen} onSave={handleSaveEmotionalResponse} response={selectedItem} />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O item será excluído permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
