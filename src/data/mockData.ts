import { NavItem, Channel, Column, Conversation, Attendant } from '@/types/kanban';

export const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
  { id: 'inbox', label: 'Inbox', icon: 'inbox', badge: 3 },
  { id: 'conversations', label: 'Conversas', icon: 'message-square', badge: 18 },
  { id: 'analytics', label: 'Analytics', icon: 'bar-chart' },
  { id: 'clients', label: 'Clientes', icon: 'users' },
  { id: 'flows', label: 'Flows', icon: 'git-branch', badge: 5 },
  { id: 'settings', label: 'Configurações', icon: 'settings' },
];

export const channels: Channel[] = [
  { id: 'whatsapp', name: 'WhatsApp Business', isActive: true },
  { id: 'instagram', name: 'Instagram Direct' },
  { id: 'webchat', name: 'Webchat' },
  { id: 'agents', name: 'Agentes IA' },
  { id: 'training', name: 'Treinamento' },
];

const aiAttendant: Attendant = { id: 'ai', name: 'Orion IA', type: 'ai' };
const lucasAttendant: Attendant = { id: 'lucas', name: 'Lucas', avatar: 'https://i.pravatar.cc/150?img=11', type: 'human' };
const marianaAttendant: Attendant = { id: 'mariana', name: 'Mariana', avatar: 'https://i.pravatar.cc/150?img=5', type: 'human' };
const pedroAttendant: Attendant = { id: 'pedro', name: 'Pedro', avatar: 'https://i.pravatar.cc/150?img=12', type: 'human' };

export const columns: Column[] = [
  {
    id: 'new',
    title: 'Novas Conversas',
    count: 4,
    conversations: [
      {
        id: '1',
        clientName: 'João Silva',
        subject: 'Dúvida sobre produto',
        date: '13 Nov, 2025',
        status: 'new',
        messageCount: 3,
        attendants: [{ id: 'joao', name: 'João Silva', avatar: 'https://i.pravatar.cc/150?img=1', type: 'human' }, aiAttendant],
        timeElapsed: '2min',
      },
      {
        id: '2',
        clientName: 'Maria Santos',
        subject: 'Solicitação de orçamento',
        date: '13 Nov, 2025',
        status: 'waiting',
        messageCount: 1,
        attendants: [{ id: 'maria', name: 'Maria Santos', avatar: 'https://i.pravatar.cc/150?img=2', type: 'human' }],
        timeElapsed: '5min',
      },
    ],
  },
  {
    id: 'in-progress',
    title: 'Em Atendimento',
    count: 6,
    conversations: [
      {
        id: '3',
        clientName: 'Pedro Costa',
        subject: 'Problema com entrega',
        date: '13 Nov, 2025',
        status: 'ai-responding',
        messageCount: 5,
        attendants: [{ id: 'pedro-c', name: 'Pedro Costa', avatar: 'https://i.pravatar.cc/150?img=3', type: 'human' }, aiAttendant],
        isHighPriority: true,
      },
      {
        id: '4',
        clientName: 'Ana Oliveira',
        subject: 'Informações de pagamento',
        date: '12 Nov, 2025',
        status: 'waiting-client',
        messageCount: 8,
        attendants: [{ id: 'ana', name: 'Ana Oliveira', avatar: 'https://i.pravatar.cc/150?img=4', type: 'human' }, aiAttendant],
        timeElapsed: '2h',
      },
      {
        id: '5',
        clientName: 'Carlos Mendes',
        subject: 'Reclamação sobre produto',
        date: '12 Nov, 2025',
        status: 'complex',
        messageCount: 13,
        attendants: [
          { id: 'carlos', name: 'Carlos Mendes', avatar: 'https://i.pravatar.cc/150?img=6', type: 'human' },
          lucasAttendant,
          marianaAttendant,
        ],
        sentiment: 'negative',
      },
      {
        id: '6',
        clientName: 'Juliana Lima',
        subject: 'Dúvida técnica',
        date: '11 Nov, 2025',
        status: 'waiting',
        messageCount: 4,
        attendants: [{ id: 'juliana', name: 'Juliana Lima', avatar: 'https://i.pravatar.cc/150?img=7', type: 'human' }, aiAttendant],
      },
    ],
  },
  {
    id: 'escalated',
    title: 'Escaladas para Humano',
    count: 3,
    conversations: [
      {
        id: '7',
        clientName: 'Roberto Alves',
        subject: 'Cancelamento urgente',
        date: '13 Nov, 2025',
        status: 'urgent',
        messageCount: 6,
        attendants: [{ id: 'roberto', name: 'Roberto Alves', avatar: 'https://i.pravatar.cc/150?img=8', type: 'human' }, lucasAttendant],
        assignedTo: 'Lucas',
        isUrgent: true,
      },
      {
        id: '8',
        clientName: 'Fernanda Rocha',
        subject: 'Negociação de desconto',
        date: '12 Nov, 2025',
        status: 'waiting',
        messageCount: 3,
        attendants: [{ id: 'fernanda', name: 'Fernanda Rocha', avatar: 'https://i.pravatar.cc/150?img=9', type: 'human' }, marianaAttendant],
        assignedTo: 'Mariana',
      },
      {
        id: '9',
        clientName: 'Ricardo Souza',
        subject: 'Problema técnico complexo',
        date: '11 Nov, 2025',
        status: 'waiting',
        messageCount: 8,
        attendants: [{ id: 'ricardo', name: 'Ricardo Souza', avatar: 'https://i.pravatar.cc/150?img=10', type: 'human' }, pedroAttendant],
        assignedTo: 'Pedro',
      },
    ],
  },
  {
    id: 'resolved',
    title: 'Resolvidas Hoje',
    count: 8,
    conversations: [
      {
        id: '10',
        clientName: 'Beatriz Lima',
        subject: 'Informações sobre entrega',
        date: '13 Nov, 2025',
        status: 'resolved',
        messageCount: 4,
        attendants: [{ id: 'beatriz', name: 'Beatriz Lima', avatar: 'https://i.pravatar.cc/150?img=13', type: 'human' }, aiAttendant],
        timeElapsed: '8min',
        sentiment: 'positive',
      },
      {
        id: '11',
        clientName: 'Gabriel Santos',
        subject: 'Dúvida sobre produto',
        date: '12 Nov, 2025',
        status: 'resolved',
        messageCount: 4,
        attendants: [{ id: 'gabriel', name: 'Gabriel Santos', avatar: 'https://i.pravatar.cc/150?img=14', type: 'human' }, aiAttendant],
        timeElapsed: '12min',
      },
      {
        id: '12',
        clientName: 'Camila Ferreira',
        subject: 'Suporte técnico',
        date: '11 Nov, 2025',
        status: 'resolved',
        messageCount: 9,
        attendants: [{ id: 'camila', name: 'Camila Ferreira', avatar: 'https://i.pravatar.cc/150?img=15', type: 'human' }, lucasAttendant],
        timeElapsed: '45min',
        sentiment: 'positive',
      },
    ],
  },
];

export const teamMembers = [
  { id: '1', name: 'Lucas', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: '2', name: 'Mariana', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: '3', name: 'Pedro', avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: '4', name: 'Carla', avatar: 'https://i.pravatar.cc/150?img=16' },
];
