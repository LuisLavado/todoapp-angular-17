import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Bienvenido a mi aplicación de tareas';
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
  name = 'Luis Lavado';
  age = 30;
  disabled = true;
  img = 'https://angular.io/assets/images/logos/angular/angular.svg';
  person = signal({
    name: 'Luis Lavado Llaro',
    age: 30,
    avatar: 'https://w3schools.com/howto/img_avatar.png'
  });

  clickHandler() {
    alert("Realiza una accion");
  }

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name = newValue;
  }

  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

 changeAge(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        age: parseInt(newValue)
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
