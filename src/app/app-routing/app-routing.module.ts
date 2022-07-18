import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from '../Pages/main-page/main-page.component';
import { ManageDeckPageComponent } from '../Pages/manage-deck-page/manage-deck-page.component';
import { ReviseDeckPageComponent } from '../Pages/revise-deck-page/revise-deck-page.component';
import { WritingPageComponent } from '../Pages/writing-page/writing-page.component';
import { KanjiPageComponent } from '../Pages/kanji-page/kanji-page.component';
import { LoginPageComponent } from '../Pages/login-page/login-page.component';
import { LoginRequiredGuard } from '../login-required.guard';

const routes: Routes = [
{
  path: '',
  component: MainPageComponent,
  canActivate: [LoginRequiredGuard]
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
  path: 'Writing',
  component: WritingPageComponent
},
{
  path: 'kanji/:id',
  component: KanjiPageComponent
},
{
  path: 'login',
  component: LoginPageComponent
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