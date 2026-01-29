import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo, todoResponse } from '../dtos/todo.dto';
import { environment } from '../../environments/env';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);

  public getTodos(): Observable<todoResponse> {
    return this.http.get<todoResponse>(environment.apiUrl.concat('/todos'));
  }

  public createTodo(todo: Partial<Todo>): Observable<Todo> {
    return this.http.post<Todo>(environment.apiUrl.concat('/todos'), todo);
  }

  public updateTodo(todo: Partial<Todo>): Observable<Todo> {
    return this.http.put<Todo>(`${environment.apiUrl}/todos/${todo.id}`, todo);
  }

  public toggleTodo(todo: Partial<Todo>): Observable<Todo> {
    return this.http.patch<Todo>(`${environment.apiUrl}/todos/${todo.id}/toggle`, {});
  }

  public deleteTodo(todo: Partial<Todo>): Observable<Todo> {
    return this.http.delete<Todo>(`${environment.apiUrl}/todos/${todo.id}`);
  }
}
