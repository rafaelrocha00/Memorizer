import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCardPageComponent } from '../create-card-page/create-card-page.component';
import { MainPageComponent } from '../main-page/main-page.component';
import { ManageDeckPageComponent } from '../manage-deck-page/manage-deck-page.component';
import { ReviseDeckPageComponent } from '../revise-deck-page/revise-deck-page.component';


const routes: Routes = [
{
  path: '',
  component: MainPageComponent
},
{
  path: 'manageDeck',
  component: ManageDeckPageComponent
},
{
  path: 'reviseDeck',
  component: ReviseDeckPageComponent
},
{
  path: 'createNewCard',
  component: CreateCardPageComponent
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