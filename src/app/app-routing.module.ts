import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PublicComponent } from './components/public/public.component';
import { ProtectedComponent } from './components/protected/protected.component';

const routes: Routes = [
  { path: 'public', component: PublicComponent },
  { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/public', pathMatch: 'full' },
  { path: '**', redirectTo: '/public' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
