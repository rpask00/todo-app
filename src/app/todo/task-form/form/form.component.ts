import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Task, TaskStatus} from "../../../store/app.state";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {
  @Input() task?: Task | null;
  @Output() onsubmit = new EventEmitter<Task>();

  constructor(
    private _fb: FormBuilder,
  ) {
  }

  readonly form: FormGroup = this._fb.group({
    title: ['', Validators.required],
    description: [''],
    dueDate: [''],
  });

  ngOnInit(): void {
    if (this.task) {
      this.form.patchValue(this.task);
    }
  }

  submit() {
    if (this.task) {
      this.onsubmit.emit({
          ...this.form.value,
          id: this.task.id,
        }
      );
    } else {
      this.onsubmit.emit({
          ...this.form.value,
          id: this.randomId(),
          createdAt: new Date(),
          status: TaskStatus.ACTIVE
        }
      );
    }

  }

  randomId() {
    return Math.floor(Math.random() * 10000000);
  }
}
