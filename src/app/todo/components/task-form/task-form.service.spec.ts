import {TestBed} from '@angular/core/testing';
import {TaskFormService} from "./task-form.service";
import {Task, TaskStatus} from "../../store/todo.state";
import {switchMap, take} from "rxjs";
import {StoreModule} from "@ngrx/store";
import {todoReducer} from "../../store/todo.reducer";
import {Actions, EffectsModule, ofType} from "@ngrx/effects";
import {TodoEffects} from "../../store/todo.effects";
import {ToastrModule} from "ngx-toastr";
import {addTaskSuccess, modifyTaskSuccess} from "../../store/todo.actions";

describe('TaskFormService', () => {
  let service: TaskFormService;
  let actions$: Actions;

  let taskID: number;
  let newTask: Task;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({todo: todoReducer}),
        EffectsModule.forRoot([TodoEffects]),
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
        }),
      ],
      providers: [
        TaskFormService,
      ]
    });
    actions$ = TestBed.inject(Actions);
    service = TestBed.inject(TaskFormService);

    taskID = Math.floor(Math.random() * 1000);
    newTask = {
      id: taskID,
      title: 'test',
      description: 'test',
      status: TaskStatus.ACTIVE,
      createdAt: new Date(),
      dueDate: new Date('2022-08-08'),
    };

  });

  it('should be created', () => expect(service).toBeTruthy());

  it('should add Task', (done) => {
    actions$.pipe(
      ofType(addTaskSuccess), take(1),
      switchMap(() => service.getTaskById$(taskID)),
    ).subscribe((task) => {
      expect(task).toEqual({...newTask});
      done();
    });


    service.addNewTask(newTask);
  });


  it('should modify Task', (done) => {
    service.addNewTask(newTask);

    const modifiedTask = {
      ...newTask,
      title: 'test2',
    }
    setTimeout(() => {
      service.modifyTask({
        ...modifiedTask,
        id: taskID,
      });
    }, 1000)

    actions$.pipe(
      ofType(modifyTaskSuccess), take(1),
      switchMap(() => service.getTaskById$(taskID)),
    ).subscribe((task) => {
      expect(task).toEqual({...modifiedTask});
      done();
    });
  })
});
