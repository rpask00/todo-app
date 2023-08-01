import {TestBed} from '@angular/core/testing';
import {Task, TaskStatus} from "../../store/todo.state";
import {switchMap, take} from "rxjs";
import {Store, StoreModule} from "@ngrx/store";
import {todoReducer} from "../../store/todo.reducer";
import {Actions, EffectsModule, ofType} from "@ngrx/effects";
import {TodoEffects} from "../../store/todo.effects";
import {ToastrModule} from "ngx-toastr";
import {addTask, modifyTaskSuccess, removeTask, removeTaskSuccess} from "../../store/todo.actions";
import {TasksListService} from "./tasks-list.service";
import {selectTaskById} from "../../store/todo.selectors";
import {AppState} from "../../../app.module";

describe('TasksListService', () => {
  let service: TasksListService;
  let actions$: Actions;
  let store: Store<AppState>;

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
        TasksListService,
      ]
    });
    actions$ = TestBed.inject(Actions);
    service = TestBed.inject(TasksListService);
    store = TestBed.inject(Store);

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

  it('should remove Task', (done) => {
    store.dispatch(addTask({task: newTask}));

    setTimeout(() => store.dispatch(removeTask({id: taskID})), 1000)

    actions$.pipe(
      ofType(removeTaskSuccess), take(1),
      switchMap(() => store.select(selectTaskById(taskID))),
    ).subscribe((task) => {
      expect(task).toBeFalsy();
      done();
    });
  })


  it('should change Task status', (done) => {
    store.dispatch(addTask({task: newTask}));

    setTimeout(() => {
      service.changeTaskStatus(newTask);
    }, 1000)

    actions$.pipe(
      ofType(modifyTaskSuccess), take(1),
      switchMap(() => store.select(selectTaskById(taskID))),
    ).subscribe((task) => {
      expect(task?.status).not.toEqual(newTask.status);
      done();
    });
  })

});



