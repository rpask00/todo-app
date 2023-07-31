import {Component, effect, EventEmitter, Input, OnInit, Output, signal} from '@angular/core';
import {Task} from 'src/app/todo/store/todo.state';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  protected readonly localStorage = localStorage;
  @Input() task?: Task;
  @Output() changeTaskStatus = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<Task>();
  @Output() editTask = new EventEmitter<Task>();
  constructor() {}

}
