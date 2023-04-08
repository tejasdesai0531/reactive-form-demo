import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferListComponent } from './offer-list/offer-list.component';
import { AddOfferComponent } from './add-offer/add-offer.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: OfferListComponent },
  { path: 'add-offer', component: AddOfferComponent },
  { path: 'edit-offer/:id', component: AddOfferComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferRoutingModule { }
