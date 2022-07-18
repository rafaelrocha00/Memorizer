import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateCardComponent } from './modal-create-card.component';

describe('CreateCardPageComponent', () => {
  let component: ModalCreateCardComponent;
  let fixture: ComponentFixture<ModalCreateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreateCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
