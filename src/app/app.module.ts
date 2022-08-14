import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MainPageComponent } from './Pages/main-page/main-page.component';
import { ModalCreateCardComponent } from './Pages/create-card-page/modal-create-card.component';
import { CardFormComponent } from './Components/card-form/card-form.component';
import { ReviseDeckPageComponent } from './Pages/revise-deck-page/revise-deck-page.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { DeckComponent } from './Components/deck/deck.component';
import { BotaoAdicionarDeckComponent } from './Components/botao-adicionar-deck/botao-adicionar-deck.component';
import { ManageDeckPageComponent } from './Pages/manage-deck-page/manage-deck-page.component';
import { HttpClientModule } from '@angular/common/http';
import { CircleComponent } from './Components/circle/circle.component';
import { SwitchComponent } from './Components/switch/switch.component';
import { WritingPageComponent } from './Pages/writing-page/writing-page.component';
import { MarkdownInputComponent } from './Components/markdown-input/markdown-input.component';
import { BInputComponent } from './Components/b-input/b-input.component';
import { KanjiPageComponent } from './Pages/kanji-page/kanji-page.component';
import { BreakpointComponentComponent } from './Components/breakpoint-component/breakpoint-component.component';
import { ModalComponent } from './Components/modal/modal.component';
import { ModalAdicionarDeckComponent } from './Pages/modal-adicionar-deck/modal-adicionar-deck.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { CreateAccountPageComponent } from './Pages/create-account-page/create-account-page.component';
import { ModalResultadoRevisaoComponent } from './Components/modal-resultado-revisao/modal-resultado-revisao.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { DayChartComponent } from './day-chart/day-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ModalCreateCardComponent,
    CardFormComponent,
    ReviseDeckPageComponent,
    HeaderComponent,
    FooterComponent,
    DeckComponent,
    BotaoAdicionarDeckComponent,
    ManageDeckPageComponent,
    CircleComponent,
    SwitchComponent,
    WritingPageComponent,
    MarkdownInputComponent,
    BInputComponent,
    KanjiPageComponent,
    BreakpointComponentComponent,
    ModalComponent,
    ModalAdicionarDeckComponent,
    LoginPageComponent,
    CreateAccountPageComponent,
    ModalResultadoRevisaoComponent,
    LineChartComponent,
    DayChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
