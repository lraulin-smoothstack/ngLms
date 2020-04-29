import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishersDialogBoxComponent } from './publishers-dialog-box.component';

describe('PublishersDialogBoxComponent', () => {
  let component: PublishersDialogBoxComponent;
  let fixture: ComponentFixture<PublishersDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishersDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishersDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
