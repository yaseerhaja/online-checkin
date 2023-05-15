import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckinDetailComponent } from './pages/checkin-detail/checkin-detail.component';
import { CheckinComponent } from './pages/checkin/checkin.component';
import { NoPageFoundComponent } from './pages/no-page-found/no-page-found.component';

const routes: Routes = [
  {
    path: 'checkin',
    component: CheckinComponent,
  },
  {
    path: 'checkin-details',
    component: CheckinDetailComponent,
  },
  { path: '', redirectTo: '/checkin', pathMatch: 'full' },
  { path: '**', component: NoPageFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
