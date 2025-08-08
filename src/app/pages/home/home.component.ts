
import { Component, computed, effect, inject, Injector, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([]);

  filter = signal<'all' | 'pending' | 'completed'>('all');
  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'pending') {
      return tasks.filter(task => !task.completed);
    }
    if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    }
    return tasks;
  });

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
    ]
  });

  injector = inject(Injector);

  constructor() {

  }

  ngOnInit() {
    const storage = localStorage.getItem('tasks');
    if (storage) {
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }
    this.trackTasks();
  }

  trackTasks() {
    effect(() => {
      const tasks = this.tasks();
      console.log(tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, { injector: this.injector });
  }

  changeHandler() {
    if (this.newTaskCtrl.valid && this.newTaskCtrl.value.trim() !== '') {
      const value = this.newTaskCtrl.value;
      this.addTask(value);
      this.newTaskCtrl.setValue('');
    }
  }

  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    }

    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));
  }

  updateTask(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, positon) => {
        if (positon === index) {
          return {
            ...task,
            completed: !task.completed
          }
        }

        return task;
      })
    });
  }

  updateTaskEditingMode(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, positon) => {
        if (positon === index) {
          return {
            ...task,
            editing: true
          }
        }

        return {
          ...task,
          editing: false
        };
      })
    });
  }

  updateTaskText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    console.log("input.value", input.value)
    this.tasks.update((tasks) => {
      return tasks.map((task, positon) => {
        if (positon === index) {
          return {
            ...task,
            title: input.value,
            editing: false,
          }
        }

        return task;
      })
    });
  }

  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter);
  }

  clearCompleted() {
    this.tasks.update((tasks) => {
      return tasks.filter(task => !task.completed)
    });
  }
}
