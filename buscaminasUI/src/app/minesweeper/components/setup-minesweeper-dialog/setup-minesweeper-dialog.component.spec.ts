import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupMinesweeperDialogComponent } from './setup-minesweeper-dialog.component';

describe('SetupMinesweeperDialogComponent', () => {
  let component: SetupMinesweeperDialogComponent;
  let fixture: ComponentFixture<SetupMinesweeperDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupMinesweeperDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupMinesweeperDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
