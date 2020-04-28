import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLibraryBranchComponent } from './update-library-branch.component';

describe('UpdateLibraryBranchComponent', () => {
  let component: UpdateLibraryBranchComponent;
  let fixture: ComponentFixture<UpdateLibraryBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateLibraryBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLibraryBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
