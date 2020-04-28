import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsDialogBoxComponent } from './authors-dialog-box.component';

describe('AuthorsDialogBoxComponent', () => {
  let component: AuthorsDialogBoxComponent;
  let fixture: ComponentFixture<AuthorsDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorsDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
