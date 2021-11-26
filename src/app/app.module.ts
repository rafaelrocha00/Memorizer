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

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CreateCardPageComponent,
    CardFormComponent,
    ReviseDeckPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
