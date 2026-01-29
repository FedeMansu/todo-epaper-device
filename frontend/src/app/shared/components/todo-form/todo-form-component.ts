import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogContainer } from '@angular/material/dialog';
import { Todo } from '../../../dtos/todo.dto';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-form-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-form-component.html',
  styleUrl: './todo-form-component.scss',
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup;
  isEditMode: boolean = false;
  isUpdaeMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TodoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public todo: Todo | null
  ) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: [''],
      id: [0],
      completed: [false],
    });
  }

  ngOnInit() {
    if (this.todo) {
      this.isUpdaeMode = true;
      this.todoForm.patchValue({
        title: this.todo.title,
        description: this.todo.description,
        completed: this.todo.completed,
        id: this.todo.id,
        priority: this.todo.priority,
      });
    }
  }

  onSubmit() {
    if (this.todoForm.valid) {
      const formValue = this.todoForm.value;
      const todo: Partial<Todo> = {
        title: formValue.title,
        description: formValue.description || null,
        priority: formValue.priority || undefined,
        id: formValue.id,
        completed: formValue.completed ? 1 : 0,
      };
      const data = this.isUpdaeMode
        ? { operation: 'update', data: todo }
        : { operation: 'insert', data: todo };
      this.dialogRef.close(data);
    }
  }

  loadTodo(todo: Todo) {
    this.isEditMode = true;
    this.todoForm.patchValue({
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      completed: todo.completed === 1,
    });
  }

  public onClose(): void {
    this.dialogRef.close();
  }
}
