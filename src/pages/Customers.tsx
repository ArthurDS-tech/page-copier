import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Users, Search, Plus, Star, TrendingUp, Mail, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const customers = [
  {
    id: '1',
    name: 'Maria Silva',
    email: 'maria@email.com',
    phone: '+55 11 98765-4321',
    score: 95,
    tags: ['vip', 'hot_lead'],
    lastContact: 'há 2 dias',
    totalSpent: 'R$ 12.450',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Pedro Santos',
    email: 'pedro@email.com',
    phone: '+55 11 98765-4322',
    score: 78,
    tags: ['ativo', 'recorrente'],
    lastContact: 'há 5 dias',
    totalSpent: 'R$ 8.200',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    name: 'Ana Costa',
    email: 'ana@email.com',
    phone: '+55 11 98765-4323',
    score: 62,
    tags: ['novo', 'potencial'],
    lastContact: 'há 1 semana',
    totalSpent: 'R$ 3.500',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: '4',
    name: 'Carlos Oliveira',
    email: 'carlos@email.com',
    phone: '+55 11 98765-4324',
    score: 45,
    tags: ['inativo', 'risco_churn'],
    lastContact: 'há 2 semanas',
    totalSpent: 'R$ 1.200',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
];

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

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
                <h1 className="text-3xl font-bold text-foreground mb-2">Clientes ({customers.length})</h1>
                <p className="text-muted-foreground">CRM inteligente com scoring automático</p>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar cliente
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card rounded-xl border border-border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Total de Clientes</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{customers.length}</p>
              </div>

              <div className="bg-card rounded-xl border border-border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-warning" />
                  <span className="text-sm text-muted-foreground">VIP</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {customers.filter(c => c.tags.includes('vip')).length}
                </p>
              </div>

              <div className="bg-card rounded-xl border border-border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-sm text-muted-foreground">Score Médio</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {Math.round(customers.reduce((acc, c) => acc + c.score, 0) / customers.length)}
                </p>
              </div>

              <div className="bg-card rounded-xl border border-border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Receita Total</span>
                </div>
                <p className="text-2xl font-bold text-foreground">R$ 25.3k</p>
              </div>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar clientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Customers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={customer.avatar}
                      alt={customer.name}
                      className="w-16 h-16 rounded-full ring-2 ring-primary/20"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1">{customer.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-2xl font-bold ${getScoreColor(customer.score)}`}>
                          {customer.score}
                        </span>
                        <span className="text-xs text-muted-foreground">score</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {customer.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-3.5 h-3.5" />
                      <span className="truncate">{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{customer.phone}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-sm">
                    <div>
                      <p className="text-muted-foreground">Último contato</p>
                      <p className="font-medium text-foreground">{customer.lastContact}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground">Total gasto</p>
                      <p className="font-medium text-foreground">{customer.totalSpent}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
