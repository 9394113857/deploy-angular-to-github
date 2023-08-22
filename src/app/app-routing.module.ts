import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// component imports
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FlaskComponent } from './flask/flask.component';
import { DjangoComponent } from './django/django.component';
import { JavaComponent } from './java/java.component';
import { NodejsComponent } from './nodejs/nodejs.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent
  },

  {
    path:'flask',component:FlaskComponent
  },
  {
    path:'django',component:DjangoComponent
  },
  {
    path:'java',component:JavaComponent
  },
  {
    path:'nodejs',component:NodejsComponent
  },


  {
    path:'**',component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
