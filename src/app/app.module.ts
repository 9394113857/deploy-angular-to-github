import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// service imports
import { FlaskService } from './flask.service';
import { DjangoService } from './django.service';
import { JavaService } from './java.service';
import { NodejsService } from './nodejs.service';
import { FlaskComponent } from './flask/flask.component';
import { DjangoComponent } from './django/django.component';
import { JavaComponent } from './java/java.component';
import { NodejsComponent } from './nodejs/nodejs.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

// NgModule is a decorator:

@NgModule({
  declarations: [
    AppComponent,
    FlaskComponent,
    DjangoComponent,
    JavaComponent,
    NodejsComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FlaskService, DjangoService, JavaService, NodejsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
