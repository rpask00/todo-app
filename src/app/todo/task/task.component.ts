import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from 'src/app/store/app.state';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task?: Task;
  @Output() changeTaskStatus = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<Task>();
  @Output() editTask = new EventEmitter<Task>();
}
