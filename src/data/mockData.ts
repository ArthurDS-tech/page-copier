import { Column, Project, NavItem } from '@/types/kanban';

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'tasks', label: 'My Tasks', icon: 'check-circle', badge: 7 },
  { id: 'inbox', label: 'Inbox', icon: 'inbox', badge: 27 },
  { id: 'analytics', label: 'Analytics', icon: 'bar-chart' },
  { id: 'docs', label: 'Docs', icon: 'file-text' },
  { id: 'calendar', label: 'Calendar', icon: 'calendar', badge: 4 },
  { id: 'settings', label: 'Settings', icon: 'settings' },
];

export const projects: Project[] = [
  { id: 'product', name: 'Product & Engineering', isActive: true },
  { id: 'marketing', name: 'Marketing' },
  { id: 'operations', name: 'Operations' },
  { id: 'hr', name: 'HR & People' },
  { id: 'finance', name: 'Finance' },
];

export const columns: Column[] = [
  {
    id: 'backlog',
    title: 'Backlog Tasks',
    count: 4,
    tasks: [
      {
        id: '1',
        title: 'Design onboarding flow',
        dueDate: '13 Nov, 2025',
        priority: 'medium',
        assignees: ['avatar1', 'avatar2'],
        attachments: 3,
        comments: 2,
      },
      {
        id: '2',
        title: 'Write product launch announcement',
        priority: 'low',
        assignees: ['avatar1', 'avatar2'],
        attachments: 0,
        comments: 1,
      },
    ],
  },
  {
    id: 'todo',
    title: 'To Do Tasks',
    count: 4,
    tasks: [
      {
        id: '3',
        title: 'Draft Q3 roadmap documents',
        dueDate: '15 Nov, 2025',
        priority: 'low',
        assignees: ['avatar1', 'avatar2', 'avatar3'],
        attachments: 5,
        comments: 7,
      },
      {
        id: '4',
        title: 'Add dark mode toggle',
        dueDate: '16 Nov, 2025',
        priority: 'medium',
        assignees: ['avatar1'],
        attachments: 0,
        comments: 4,
      },
      {
        id: '5',
        title: 'Review security compliance checklist',
        dueDate: '23 Nov, 2025',
        priority: 'high',
        assignees: ['avatar1', 'avatar2', 'avatar3', 'avatar4'],
        attachments: 0,
        comments: 13,
      },
      {
        id: '6',
        title: 'Test signup from validation',
        dueDate: '24 Nov, 2025',
        priority: 'low',
        assignees: [],
        attachments: 0,
        comments: 0,
      },
    ],
  },
  {
    id: 'progress',
    title: 'In Progress',
    count: 2,
    tasks: [
      {
        id: '7',
        title: 'Improve search functionality',
        dueDate: '17 Nov, 2025',
        priority: 'high',
        assignees: ['avatar1', 'avatar2'],
        attachments: 0,
        comments: 6,
      },
      {
        id: '8',
        title: 'Refactor authentication logic',
        dueDate: '18 Nov, 2025',
        priority: 'low',
        assignees: ['avatar1'],
        attachments: 0,
        comments: 3,
      },
      {
        id: '9',
        title: 'Review customer support tickets and identify recurring issues',
        dueDate: '22 Nov, 2025',
        priority: 'low',
        assignees: ['avatar1', 'avatar2'],
        attachments: 0,
        comments: 6,
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    count: 4,
    tasks: [
      {
        id: '10',
        title: 'Test notification system',
        dueDate: '09 Nov, 2025',
        priority: 'done',
        assignees: ['avatar1', 'avatar2'],
        attachments: 1,
        comments: 2,
      },
      {
        id: '11',
        title: 'Create detailed wireframes for the new onboarding flow',
        dueDate: '07 Nov, 2025',
        priority: 'done',
        assignees: ['avatar1', 'avatar2', 'avatar3'],
        attachments: 0,
        comments: 4,
      },
      {
        id: '12',
        title: 'Write technical documentation for the authentication module',
        dueDate: '05 Nov, 2025',
        priority: 'done',
        assignees: ['avatar1', 'avatar2'],
        attachments: 0,
        comments: 0,
      },
    ],
  },
];

export const teamMembers = [
  { id: '1', name: 'Nancy Martino', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'Bob Wilson', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: '5', name: 'Alice Brown', avatar: 'https://i.pravatar.cc/150?img=5' },
];
