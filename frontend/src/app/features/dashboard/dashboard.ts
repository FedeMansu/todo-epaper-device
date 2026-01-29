import { Component, computed, signal } from '@angular/core';
import { TodoService } from '../../services/todo';
import { formatDate, isCompleted, Todo, todoResponse } from '../../dtos/todo.dto';
import { FormsModule } from '@angular/forms';
import { TodoFormComponent } from '../../shared/components/todo-form/todo-form-component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  public todos = signal<todoResponse>({ success: false, data: [] });
  public loading = signal(false);

  public sortAscending: boolean = true;
  public error = signal<string>('');

  constructor(private readonly service: TodoService, private readonly dialog: MatDialog) {}

  public ngOnInit(): void {
    this._getData();
  }

  private _getData(): void {
    this.loading.set(true);

    this.service.getTodos().subscribe({
      next: (data: todoResponse) => {
        this.todos.set(data);
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
      this.todos.update((tasks) => ({ ...tasks, data: tasks.data.sort((a, b) => a.id - b.id) }));
    } else {
      this.todos.update((tasks) => ({ ...tasks, data: tasks.data.sort((a, b) => b.id - a.id) }));
    }
  }

  public createTodo(todo?: Todo): void {
    this.dialog
      .open(TodoFormComponent, { data: todo })
      .afterClosed()
      .subscribe((newTodo) => {
        if (newTodo?.operation === 'create') {
          this.service.createTodo(newTodo).subscribe({
            next: (todo: Todo) => {
              this.todos.update((current) => ({
                ...current,
                data: [...current.data, todo],
              }));
            },
          });
        } else if (newTodo?.operation === 'update') {
          this.service.updateTodo(newTodo.data).subscribe({
            next: (updatedTodo) => {
              this.todos.update((response) => ({
                ...response,
                data: response.data.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)),
              }));
            },
          });
        }
      });
  }

  public toggleComplete(todo: Todo) {
    this.service.toggleTodo(todo).subscribe({
      next: (response) => {
        //TODO: Verificare il tipo di response
      
        this.todos.update((currentState) => ({
          ...currentState,
          data: currentState.data.map((t) => 
            t.id === todo.id ? response.data : t
          ),
        }));
        console.log('Todo status updated successfully.' ,this.todos());
      },
      error: (err) => {
        this.error.set('Failed to update todo status.');
        console.error('Error:', err);
      },
    });
  }

  deleteTodo(todo: Todo) {
    if (confirm(`Are you sure you want to delete "${todo.title}"?`)) {
      this.service.deleteTodo(todo).subscribe({
        next: () => {
          this.todos.update((response) => ({
            ...response,
            data: response.data.filter((t) => t.id !== todo.id),
          }));
        },
        error: (err: any) => {
          this.error.set('Failed to delete todo.');
          console.error('Error:', err);
        },
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
