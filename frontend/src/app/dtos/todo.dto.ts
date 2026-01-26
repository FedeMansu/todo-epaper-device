// src/app/models/todo.model.ts

/**
 * Interfaccia per un singolo Todo
 */
export interface Todo {
  id: number;
  title: string;
  description?: string | null;
  completed?: number; // 0 = false, 1 = true
  priority?: 'low' | 'medium' | 'high';
  created_at?: string;
  updated_at?: string;
}

/**
 * Risposta API per la lista di todos
 */
export interface TodosResponse {
  success: boolean;
  data: Todo[];
}

/**
 * Risposta API per un singolo todo
 */
export interface TodoResponse {
  success: boolean;
  data: Todo;
}

/**
 * DTO per creare un nuovo todo
 */
export interface CreateTodoDto {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
}

/**
 * DTO per aggiornare un todo esistente
 */
export interface UpdateTodoDto {
  title?: string;
  description?: string;
  completed?: number;
  priority?: 'low' | 'medium' | 'high';
}

/**
 * Helper per convertire completed number a boolean
 */
export function isCompleted(todo: Todo): boolean {
  return todo.completed === 1;
}

/**
 * Helper per formattare la data
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}