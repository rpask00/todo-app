import {TestBed} from '@angular/core/testing';
import {TaskFormService} from "./task-form.service";
import {Task, TaskStatus} from "../../store/todo.state";
import {firstValueFrom} from "rxjs";
import {StoreModule} from "@ngrx/store";
import {todoReducer} from "../../store/todo.reducer";
import {Actions, EffectsModule} from "@ngrx/effects";
import {TodoEffects} from "../../store/todo.effects";
import {ToastrModule} from "ngx-toastr";

// describe('TaskFormService', () => {
//   let service: TaskFormService;
//   let storeMock: jasmine.SpyObj<Store<GlobalState>>;
//
//   beforeEach(() => {
//     storeMock = jasmine.createSpyObj('Store', ['select', 'dispatch']);
//     TestBed.configureTestingModule({
//       providers: [{provide: Store, useValue: storeMock}],
//     });
//     service = TestBed.inject(TaskFormService);
//   });
// });


describe('TaskFormService', () => {
  let service: TaskFormService;
  let actions$: Actions;
  // let storeMock: jasmine.SpyObj<Store<GlobalState>>;

  beforeEach(() => {
    // storeMock = jasmine.createSpyObj('Store', ['select', 'dispatch']);

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          root: todoReducer
        }),
        EffectsModule.forRoot([TodoEffects]),
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
        }),
      ],
      providers: [
        TaskFormService,
        // {provide: Store, useValue: storeMock}
      ]
    });
    actions$ = TestBed.inject(Actions);
    service = TestBed.inject(TaskFormService);
  });

  it('should be created', () => {
    // expect(storeMock).toBeTruthy();
  });

  it('should add Task', (done) => {
    const taskID = Math.floor(Math.random() * 1000);
    const newTask: Task = {
      id: taskID,
      title: 'test',
      description: 'test',
      status: TaskStatus.ACTIVE,
      createdAt: new Date(),
      dueDate: new Date('2022-08-08'),
    };
    service.addNewTask(newTask);

    setTimeout(async () => {
      const task = await firstValueFrom(service.getTaskById$(taskID));
        expect(task).toEqual(newTask);
      done();
    }, 2000)
  });
  //
  //
  // it('should modify Task', async () => {
  //   const newTask: Task = {
  //     id: Math.floor(Math.random() * 1000),
  //     title: 'test',
  //     description: 'test',
  //     status: TaskStatus.ACTIVE,
  //     createdAt: new Date(),
  //     dueDate: new Date('2022-08-08'),
  //   };
  //   service.addNewTask(newTask);
  //   const task = await firstValueFrom(service.getTaskById(1));
  //   // expect(task).toEqual(newTask);
  //
  //   newTask.title = 'test2';
  //   newTask.description = 'test2';
  //   service.modifyTask(newTask);
  //   const task2 = await firstValueFrom(service.getTaskById(1));
  //   // expect(task2).toEqual(newTask);
  // });


});
