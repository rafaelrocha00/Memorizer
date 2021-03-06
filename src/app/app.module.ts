import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CreateCardPageComponent } from './create-card-page/create-card-page.component';
import { CardFormComponent } from './card-form/card-form.component';
import { ReviseDeckPageComponent } from './revise-deck-page/revise-deck-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DeckComponent } from './deck/deck.component';
import { BotaoAdicionarDeckComponent } from './botao-adicionar-deck/botao-adicionar-deck.component';
import { ManageDeckPageComponent } from './manage-deck-page/manage-deck-page.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CreateCardPageComponent,
    CardFormComponent,
    ReviseDeckPageComponent,
    HeaderComponent,
    FooterComponent,
    DeckComponent,
    BotaoAdicionarDeckComponent,
    ManageDeckPageComponent
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
