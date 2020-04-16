import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoGroupDialogComponent } from './todo-group-dialog.component';

describe('TodoGroupDialogComponent', () => {
  let component: TodoGroupDialogComponent;
  let fixture: ComponentFixture<TodoGroupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoGroupDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
