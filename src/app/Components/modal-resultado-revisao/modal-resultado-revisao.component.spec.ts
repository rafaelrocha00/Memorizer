import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResultadoRevisaoComponent } from './modal-resultado-revisao.component';

describe('ModalResultadoRevisaoComponent', () => {
  let component: ModalResultadoRevisaoComponent;
  let fixture: ComponentFixture<ModalResultadoRevisaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalResultadoRevisaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalResultadoRevisaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
