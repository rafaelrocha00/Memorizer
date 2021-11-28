import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoAdicionarDeckComponent } from './botao-adicionar-deck.component';

describe('BotaoAdicionarDeckComponent', () => {
  let component: BotaoAdicionarDeckComponent;
  let fixture: ComponentFixture<BotaoAdicionarDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotaoAdicionarDeckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotaoAdicionarDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
