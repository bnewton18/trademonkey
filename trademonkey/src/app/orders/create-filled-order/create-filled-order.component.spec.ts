import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFilledOrderComponent } from './create-filled-order.component';

describe('CreateFilledOrderComponent', () => {
  let component: CreateFilledOrderComponent;
  let fixture: ComponentFixture<CreateFilledOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFilledOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFilledOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
