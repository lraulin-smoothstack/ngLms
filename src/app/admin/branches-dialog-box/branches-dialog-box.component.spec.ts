import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchesDialogBoxComponent } from './branches-dialog-box.component';

describe('BranchesDialogBoxComponent', () => {
  let component: BranchesDialogBoxComponent;
  let fixture: ComponentFixture<BranchesDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchesDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchesDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
