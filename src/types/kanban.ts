export type Priority = 'high' | 'medium' | 'low' | 'done';

export interface Task {
  id: string;
  title: string;
  dueDate?: string;
  priority: Priority;
  assignees: string[];
  attachments: number;
  comments: number;
}

export interface Column {
  id: string;
  title: string;
  count: number;
  tasks: Task[];
}

export interface Project {
  id: string;
  name: string;
  isActive?: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
}
