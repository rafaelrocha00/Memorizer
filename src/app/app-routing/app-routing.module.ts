import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCardPageComponent } from '../Pages/create-card-page/create-card-page.component';
import { MainPageComponent } from '../Pages/main-page/main-page.component';
import { ManageDeckPageComponent } from '../Pages/manage-deck-page/manage-deck-page.component';
import { ReviseDeckPageComponent } from '../Pages/revise-deck-page/revise-deck-page.component';
import { WritingPageComponent } from '../Pages/writing-page/writing-page.component';
import { KanjiPageComponent } from '../Pages/kanji-page/kanji-page.component';

const routes: Routes = [
{
  path: '',
  component: MainPageComponent
},
{
  path: 'manageDeck/:id',
  component: ManageDeckPageComponent
},
{
  path: 'reviseDeck',
  component: ReviseDeckPageComponent
},
{
  path: 'createNewCard',
  component: CreateCardPageComponent
},
{
  path: 'Writing',
  component: WritingPageComponent
},
{
  path: 'kanji/:id',
  component: KanjiPageComponent
}
];

@NgModule({
imports: [
RouterModule.forRoot(routes)
],
exports: [
RouterModule
],
declarations: []
})
export class AppRoutingModule { }