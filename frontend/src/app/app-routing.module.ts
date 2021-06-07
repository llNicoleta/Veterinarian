import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateComponent} from './appointment/create/create.component';
import {HomePageComponent} from './home-page/home-page.component';
import {ViewComponent} from './appointment/view/view.component';
import { EditComponent } from './appointment/view/edit/edit.component';

const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'view', component: ViewComponent},
  {path: 'view/edit/:id', component: EditComponent},
  {path: 'create', component: CreateComponent},
  {path: "**", redirectTo: "/home", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
