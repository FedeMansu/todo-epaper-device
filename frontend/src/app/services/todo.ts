import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../dtos/todo.dto';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);
  private apiUrl = '/api';

  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl.concat('/todos'));
  }

  public createTodo(todo: Partial<Todo>): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl.concat('/todos'), todo);
  }
}
