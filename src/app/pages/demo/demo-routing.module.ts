import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompOneComponent } from './comp-one/comp-one.component';

const routes: Routes = [
  { path: '', redirectTo: 'comp-1', pathMatch: 'full' },
  { path: 'comp-1', component: CompOneComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
