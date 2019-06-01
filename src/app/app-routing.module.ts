import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent} from "./login/login.component";
import { PersonalProfileComponent} from "./personal-profile/personal-profile.component";
import { SearchProfileComponent} from "./search-profile/search-profile.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'personalProfile',
    component: PersonalProfileComponent
  },
  {
    path :'searchProfile',
    component : SearchProfileComponent
  },

  {
    path: 'home',
    component: HomeComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
