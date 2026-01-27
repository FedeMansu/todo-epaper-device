import { Component, Input, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogContainer } from "@angular/material/dialog";
import { Todo } from '../../../dtos/todo.dto';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-form-component',
  imports: [MatDialogContainer,CommonModule,

    ReactiveFormsModule],
  templateUrl: './todo-form-component.html',
  styleUrl: './todo-form-component.scss',
})
export class TodoFormComponent {
  @Input() todo: Todo | null = null;

  todoForm: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<TodoFormComponent>) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: [''],
      completed: [false]
    });
  }

  onSubmit() {
    if (this.todoForm.valid) {
      const formValue = this.todoForm.value;
      const todo: Partial<Todo> = {
        title: formValue.title,
        description: formValue.description || null,
        priority: formValue.priority || undefined,
        completed: formValue.completed ? 1 : 0
      };
    this.dialogRef.close(todo);
    }
  }

  loadTodo(todo: Todo) {
    this.isEditMode = true;
    this.todoForm.patchValue({
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      completed: todo.completed === 1
    });
  }

  public onClose(): void {  
    this.dialogRef.close();
  }
}
