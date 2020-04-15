import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';

import { TodoGroupComponent } from './todo-group/todo-group.component';
import { DialogComponent } from './todo-group/dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";


@NgModule({
  declarations: [
    AppComponent,
    TodoGroupComponent,
    DialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule
  
  ],
  providers: [],
  entryComponents:[DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
