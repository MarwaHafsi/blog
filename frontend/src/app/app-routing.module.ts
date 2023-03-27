import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthorComponent } from './author/author.component';
import { CreatearticleComponent } from './createarticle/createarticle.component';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  //idha mat7ot chayy redirect to home
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home', component:HomeComponent},
  //path ll get by id article idha ken n'affichi article bdétail mte3ou
  {path:'/article/:id',component:DetailComponent},
  //path lcréation mte3 article jdid 3an tri9 author
  {path:'/create',component: CreatearticleComponent},
  {path:'about',component:AboutComponent},
  {path:'privacy',component:PrivacyComponent},
  //lien yhezni ll account mte3 l'author
  {path:'author/:id', component:AuthorComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  //idha t7ot lien 8alet yhez ll not found
  {path:'**',component:NotfoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
