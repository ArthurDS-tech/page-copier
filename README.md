# Frontend - Orion.AI Dashboard

Interface web moderna e responsiva para gerenciamento da plataforma Orion.AI de atendimento automatizado com IA.

## 🚀 Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **TailwindCSS** - Framework CSS utility-first
- **React Router** - Roteamento
- **Lucide React** - Ícones modernos
- **Zustand** - Gerenciamento de estado
- **React Query** - Gerenciamento de dados assíncronos

## 📁 Estrutura de Pastas

```
Frontend/
├── src/
│   ├── components/        # Componentes reutilizáveis
│   │   ├── Header.tsx     # Cabeçalho da aplicação
│   │   ├── Sidebar.tsx    # Menu lateral
│   │   └── ui/            # Componentes UI base (shadcn/ui)
│   ├── pages/             # Páginas da aplicação
│   │   ├── Index.tsx      # Dashboard principal
│   │   └── NotFound.tsx   # Página 404
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilitários e helpers
│   ├── types/             # Definições TypeScript
│   ├── data/              # Dados mock e constantes
│   ├── App.tsx            # Componente raiz
│   ├── main.tsx           # Entry point
│   └── index.css          # Estilos globais
├── public/                # Assets estáticos
├── package.json           # Dependências
├── vite.config.ts         # Configuração Vite
├── tailwind.config.ts     # Configuração Tailwind
└── tsconfig.json          # Configuração TypeScript
```

## 🎨 Páginas Implementadas

### Dashboard Principal (`/`)
**Arquivo:** `src/pages/Index.tsx`

**Funcionalidades:**
- **Métricas em Tempo Real:**
  - Mensagens utilizadas vs limite do plano
  - Conversas ativas
  - Tempo médio de resposta
  - Taxa de satisfação do cliente

- **Atividade Recente:**
  - Lista de conversas recentes
  - Status de cada conversa (Resolvido, Ativo, Escalado)
  - Canal de origem (WhatsApp, Instagram)
  - Timestamp das interações

- **Status do Sistema:**
  - Status da IA (Online/Offline)
  - Conexão WhatsApp
  - Conexão Instagram
  - Fluxos ativos
  - Agentes IA ativos

- **Top Intenções:**
  - Análise das principais intenções dos clientes
  - Gráficos de barras com percentuais
  - Contagem de ocorrências

- **Métricas de Performance:**
  - Taxa de resolução por IA
  - Taxa de conversão de leads
  - Economia de tempo com automação

**Componentes Visuais:**
- Cards informativos com ícones
- Gráficos de progresso
- Badges de status
- Lista de atividades com hover effects
- Layout responsivo (mobile-first)

## ✅ Páginas Implementadas

### 1. Dashboard (`/` ou `/dashboard`)
**Arquivo:** `src/pages/Dashboard.tsx` e `src/pages/Index.tsx`

**Funcionalidades:**
- Métricas em tempo real (mensagens, conversas ativas, tempo médio, taxa de resolução)
- Atividade recente com status e canais
- Status do sistema (IA, WhatsApp, Instagram, Fluxos)
- Cards informativos com ícones e badges
- Layout responsivo

### 2. Timeline (`/timeline`)
**Arquivo:** `src/pages/Timeline.tsx`

**Funcionalidades:**
- Timeline visual de todas as atividades
- Eventos em tempo real (mensagens, respostas IA, escalações, resoluções)
- Estatísticas de eventos do dia
- Filtros por tipo de evento
- Indicadores visuais por tipo de atividade
- Scroll infinito para histórico completo

### 3. Calendar (`/calendar`)
**Arquivo:** `src/pages/Calendar.tsx`

**Funcionalidades:**
- Calendário mensal interativo
- Eventos do dia com detalhes
- Próximos eventos na sidebar
- Resumo de eventos (hoje, semana, mês)
- Navegação entre meses
- Indicadores visuais de dias com eventos
- Informações de local e participantes

### 4. Progress (`/progress`)
**Arquivo:** `src/pages/Progress.tsx`

**Funcionalidades:**
- Metas e objetivos com progresso visual
- Conquistas e badges
- Progresso individual da equipe
- Gráfico semanal de performance
- Métricas de tendência
- Comparação com metas estabelecidas
- Top performers

### 5. Forms (`/forms`)
**Arquivo:** `src/pages/Forms.tsx`

**Funcionalidades:**
- Criador de templates de mensagens
- Formulários personalizados
- Preview em tempo real (mockup de celular)
- Templates salvos e gerenciáveis
- Respostas rápidas configuráveis
- Variáveis dinâmicas
- Configurações de ativação e personalização IA
- Suporte para múltiplos canais

## 🎯 Próximas Páginas a Implementar

### 1. Analytics (`/analytics`)
- Dashboards detalhados
- Gráficos de tendências
- Relatórios exportáveis
- Análise de sentimento
- Métricas de performance por período

### 2. Treinamento IA (`/training`)
- Upload de documentos (PDF, DOCX, TXT)
- Upload de imagens para OCR
- Gerenciamento de base de conhecimento
- Configuração de tom de resposta
- Templates de respostas

### 3. Fluxos (`/flows`)
- Flow Builder visual (drag & drop)
- Criação de automações
- Triggers e condições
- Testes de fluxos
- Logs de execução

### 4. Agentes Corporativos (`/agents`)
- Configuração de agentes especializados
- Relatórios gerados pelos agentes
- Agendamento de análises
- Insights e recomendações

### 5. CRM Inteligente (`/crm`)
- Lista de contatos
- Perfis de clientes
- Scoring automático
- Tags inteligentes
- Histórico completo de interações

### 6. Configurações (`/settings`)
- Configurações da conta
- Gerenciamento de usuários
- Integrações (WhatsApp, Instagram)
- Configurações de IA
- Limites e planos

## 🔧 Como Executar

### Desenvolvimento
```bash
cd Frontend
npm install
npm run dev
```

Acesse: `http://localhost:5173`

### Build para Produção
```bash
npm run build
npm run preview
```

### Lint e Type Check
```bash
npm run lint
npm run type-check
```

## 🎨 Design System

### Cores Principais
- **Primary (Indigo):** `#4F46E5` - Ações principais, links
- **Success (Green):** `#10B981` - Sucesso, confirmações
- **Warning (Yellow):** `#F59E0B` - Avisos, atenção
- **Error (Red):** `#EF4444` - Erros, ações destrutivas
- **Info (Blue):** `#3B82F6` - Informações

### Tipografia
- **Font Family:** Inter (Google Fonts)
- **Headings:** Font weight 600-700
- **Body:** Font weight 400
- **Small:** Font weight 500

### Espaçamento
- Seguindo escala Tailwind: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

### Componentes UI
Utilizando **shadcn/ui** para componentes base:
- Button
- Card
- Dialog
- Dropdown
- Input
- Select
- Toast
- Tooltip
- Badge
- Avatar
- Tabs
- Table

## 📱 Responsividade

O dashboard é totalmente responsivo com breakpoints:
- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

## 🔐 Autenticação

Integração com Supabase Auth:
- Login com email/senha
- Registro de novos usuários
- Recuperação de senha
- Sessões persistentes
- Proteção de rotas

## 🌐 API Integration

Todas as chamadas de API serão feitas para os microserviços:
- **Auth Service:** `http://localhost:8001`
- **Message Processor:** `http://localhost:8002`
- **LLM Engine:** `http://localhost:8003`
- **Analytics:** `http://localhost:8008`
- **Smart CRM:** `http://localhost:8009`

## 📊 Estado Global

Gerenciamento de estado com Zustand:
- User state
- Tenant state
- Conversations state
- Notifications state
- UI state (sidebar, modals)

## 🧪 Testes (A Implementar)

```bash
npm run test          # Unit tests
npm run test:e2e      # E2E tests com Playwright
npm run test:coverage # Coverage report
```

## 🚀 Deploy

### Vercel (Recomendado)
```bash
vercel --prod
```

### Docker
```bash
docker build -t orion-frontend .
docker run -p 3000:3000 orion-frontend
```

## 📝 Convenções de Código

- **Componentes:** PascalCase (`DashboardCard.tsx`)
- **Hooks:** camelCase com prefixo `use` (`useAuth.ts`)
- **Utils:** camelCase (`formatDate.ts`)
- **Tipos:** PascalCase com sufixo `Type` ou interface (`UserType`, `IUser`)
- **Constantes:** UPPER_SNAKE_CASE (`API_BASE_URL`)

## 🤝 Contribuindo

1. Crie uma branch para sua feature: `git checkout -b feature/nova-funcionalidade`
2. Commit suas mudanças: `git commit -m 'feat: adiciona nova funcionalidade'`
3. Push para a branch: `git push origin feature/nova-funcionalidade`
4. Abra um Pull Request

## 📄 Licença

Propriedade da Orion.AI - Todos os direitos reservados
