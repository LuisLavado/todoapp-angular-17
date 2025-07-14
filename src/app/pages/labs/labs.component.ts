import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  title = 'Laboratorio Angular 17';
  framework = 'Angular';
  version = 17;
  img = 'https://angular.io/assets/images/logos/angular/angular.svg';
  disabled = true;
  tasks = [
    { id: 1, title: 'Tarea 1', completed: false },
    { id: 2, title: 'Tarea 2', completed: true },
    { id: 3, title: 'Tarea 3', completed: false }
  ];
  tasksSimples = [
    'Tarea 1',
    'Tarea 2',
    'Tarea 3',
  ];
  nameSignal = signal('Luis');
  person = signal({
    name: 'Luis',
    age: 20,
    avatar: 'https://w3schools.com/howto/img_avatar.png'
  });

  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50, {
    nonNullable: true,
  });
  nameCtrl = new FormControl('Luis', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3)
    ]
  });

  constructor() {
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log("value", value)
    });
  }

  clickHandler() {
    alert("Realiza una accion");
  }

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.framework = newValue;
  }

  changeHandlerSignal(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    console.log(newValue);
    this.nameSignal.set(newValue);
  }

  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    console.log(newValue);
    this.person.update(prevState => {
      return {
        ...prevState,
        name: newValue
      }
    });
  }

  changeAge(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        age: parseInt(newValue, 10)
      }
    });
  }

  changeName(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        name: newValue
      }
    });
  }
}
