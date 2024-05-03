import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CardDetailsComponent } from './home/card-details/card-details.component';
import { CardsComponent } from './home/cards/cards.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/category', pathMatch: 'full'
  },
  {
    path: 'category', component: HomeComponent
    , children: [
      {
        path: ':subCategory', component: CardsComponent
      },
      {
        path: ':subCategory/:id', component: CardDetailsComponent
      }
    ]
  },
  {
    path: '**', component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
