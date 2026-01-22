import { Component, signal } from '@angular/core';
import { TodoService } from '../../services/todo';
import { Todo } from '../../dtos/todo.dto';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  todos = signal<Todo[]>([]);
  loading = signal(false);

  constructor(private readonly service: TodoService) {}


  public ngOnInit(): void { 
    this._getData();}

  private _getData(): void {
  this.loading.set(true);
    
    this.service.getTodos().subscribe({
      next: (data) => {
        this.todos.set(data);
        console.log('Dati ricevuti:', data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Errore:', err);
        this.loading.set(false);
      }
    });
  }

  createTodo(): void {
    const newTodo: Todo = { id: 1 ,title: 'Nuovo', completed: false };
    
    this.service.createTodo(newTodo).subscribe({
      next: (todo: Todo) => {
        this.todos.update(current => [...current, todo]);
      }
    });
  }


}
