import {Component, EventEmitter, Input} from '@angular/core';
import { Task } from 'src/app/store/app.state';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task?: Task;

  changeTaskStatus = new EventEmitter<number>();
}
