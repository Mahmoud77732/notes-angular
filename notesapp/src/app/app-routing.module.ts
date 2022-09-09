import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"", redirectTo:"signin", pathMatch:"full"},
  {path:"signin", component: SignInComponent},
  {path:"signup", component: SignUpComponent},
  {path:"profile", canActivate: [AuthGuard], component: ProfileComponent},
  {path:"**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
