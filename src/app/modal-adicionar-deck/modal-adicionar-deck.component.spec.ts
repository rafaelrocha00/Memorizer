import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdicionarDeckComponent } from './modal-adicionar-deck.component';

describe('ModalAdicionarDeckComponent', () => {
  let component: ModalAdicionarDeckComponent;
  let fixture: ComponentFixture<ModalAdicionarDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAdicionarDeckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAdicionarDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
