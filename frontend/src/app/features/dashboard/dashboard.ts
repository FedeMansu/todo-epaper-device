import { Component, computed, signal } from '@angular/core';
import { TodoService } from '../../services/todo';
import { formatDate, isCompleted, Todo, TodosResponse } from '../../dtos/todo.dto';
import { FormsModule } from '@angular/forms';
import { Grid, GridRow, GridCell, GridCellWidget } from '@angular/aria/grid';

@Component({
  selector: 'app-dashboard',
  imports: [Grid, GridRow, GridCell, GridCellWidget, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  todos = signal<Todo[]>([]);
  loading = signal(false);

  sortAscending: boolean = true;
  tempInput: string = '';
  isLoading = signal<boolean>(false);
  error = signal<string>('');

  constructor(private readonly service: TodoService) {}

  public ngOnInit(): void {
    this.getData();
  }

  public getData(): void {
    this.loading.set(true);

    this.service.getTodos().subscribe({
      next: (data: TodosResponse) => {
        console.log('Dati ricevuti:', data);
        this.todos.set(data.data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Errore:', err);
        this.loading.set(false);
      },
    });
  }

  sortTaskById(): void {
    this.sortAscending = !this.sortAscending;
    if (this.sortAscending) {
      this.todos.update((tasks) => tasks.sort((a, b) => a.id - b.id));
    } else {
      this.todos.update((tasks) => tasks.sort((a, b) => b.id - a.id));
    }
  }

  createTodo(): void {
    const newTodo: Todo = { id: 1, title: 'Nuovo' };

    this.service.createTodo(newTodo).subscribe({
      next: (todo: Todo) => {
        this.todos.update((current) => [...current, todo]);
      },
    });
  }



 
  toggleComplete(todo: Todo) {
    const newCompleted = todo.completed === 1 ? 0 : 1;
    
    this.service.createTodo(todo).subscribe({
      next: (updatedTodo) => {
        this.todos.update(todos =>
          todos.map(t => t.id === todo.id ? updatedTodo : t)
        );
      },
      error: (err) => {
        this.error.set('Failed to update todo status.');
        console.error('Error:', err);
      }
    });
  }

  
  editTodo(todo: Todo) {
    // Implementa la logica di edit
    console.log('Edit todo:', todo);
    // Puoi aprire un modal o navigare a una pagina di edit
  }
  
  

  deleteTodo(todo: Todo) {
    if (confirm(`Are you sure you want to delete "${todo.title}"?`)) {
      this.service.deleteTodo(todo).subscribe({
        next: () => {
          this.todos.update(todos => todos.filter(t => t.id !== todo.id));
        },
        error: (err: any) => {
          this.error.set('Failed to delete todo.');
          console.error('Error:', err);
        }
      });
    }
  }

  isCompleted(todo: Todo): boolean {
    return isCompleted(todo);
  }

  formatDate(dateString: string): string {
    return formatDate(dateString);
  }
}
