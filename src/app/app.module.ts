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
import { TodoGroupDialogComponent } from './todo-group/todo-group-dialog/todo-group-dialog.component';
import { TodoService } from './todo-group/service/todo.service';


@NgModule({
  declarations: [
    AppComponent,
    TodoGroupComponent,
    DialogComponent,
    TodoGroupDialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule
  
  ],
  providers: [TodoService],
  entryComponents:[DialogComponent, TodoGroupDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
