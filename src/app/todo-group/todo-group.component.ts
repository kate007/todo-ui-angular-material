import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { TodoService } from './service/todo.service';
import { TodoGroupDialogComponent } from './todo-group-dialog/todo-group-dialog.component';


@Component({
  selector: 'app-todo-group',
  templateUrl: './todo-group.component.html',
  styleUrls: ['./todo-group.component.scss'],
})
export class TodoGroupComponent {
  connectedTo = [];
  todoGroup = [];
  blankTodo =  { id: -1, item:  'blank'};
  singleContainerWidth: number = 300;
  groupContainerWidth = 0;
 
  constructor(public dialog: MatDialog, private todoService: TodoService ) { 
  
    this.todoService.initTodolist();
    this.updateTodoGroupList();
  }
  
  
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {   
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);      
    } else {
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    }   
  }

  dropGroup(event: CdkDragDrop<string[]>)
  {
      moveItemInArray( this.todoGroup, event.previousIndex, event.currentIndex);
  }

  openDialog(item:any, groupId:number)
  {
     const dialogConfig = new MatDialogConfig();
     dialogConfig.width = '50%';
     dialogConfig.autoFocus = true;
     dialogConfig.data = { todo: item};   
   
     let dialogRef =  this.dialog.open( DialogComponent, dialogConfig )
     dialogRef.afterClosed().subscribe(  
       data => this.updateTodoItem(groupId,data)        
    );
  }

  updateTodoItem(groupId:number, item:any)
  {
     this.todoService.updateTodoItem(groupId, item);
     this.updateTodoGroupList();
  }
  addTodoItem(groupId:number, event: any)
  {
    
     let newItemElement  = (document.getElementById('newItem-' + groupId) as HTMLInputElement);  
     this.todoService.addTodoItem(groupId, newItemElement.value);
     this.updateTodoGroupList();
     newItemElement.value = '';
  }

  deleteItem(groupId:number, todoItemId:number)
  {
    this.todoService.deleteTodoItem(groupId, todoItemId);
    this.updateTodoGroupList();
  }

  addList()
  {   
    let newListItemElement  = (document.getElementById('newListItem') as HTMLInputElement); 
    this.todoService.addList(newListItemElement.value);
    newListItemElement.value = '';
    this.updateTodoGroupList();
    
  }


  
  deleteListGroup(groupId:number)
  {
  
      this.todoService.deleteListGroup(groupId);
      this.updateTodoGroupList(); 
    
  }


  updateListGroups(deleteThisGroup:boolean, groupId:number)
  {
      if(deleteThisGroup)
      {
        this.deleteListGroup(groupId);
      }
  }
openGroupDialog(groupId:number)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.autoFocus = true;

    let groupIdIndex = this.todoGroup.findIndex( x => x.id == groupId);

    dialogConfig.data =  this.todoGroup[groupIdIndex];

    let dialogRef = this.dialog.open( TodoGroupDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => this.updateListGroups(data, groupId)
    );

  } 

   updateTodoGroupList()
   {
    this.todoGroup = this.todoService.getAllTodos();
    this.connectedTo = this.todoService.getConnectedTo();


    let vw = this.getVW();
    let addedCardsWidth = ( this.singleContainerWidth + 40 ) * (this.todoService.getGroupCount() + 1 );     
    this.groupContainerWidth =   vw > addedCardsWidth ? vw : addedCardsWidth;
   }

   getVW()
   {
     return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
   }


}
