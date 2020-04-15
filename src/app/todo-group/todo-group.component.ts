import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';


@Component({
  selector: 'app-todo-group',
  templateUrl: './todo-group.component.html',
  styleUrls: ['./todo-group.component.scss'],
})
export class TodoGroupComponent {
  connectedTo = [];
  todoGroup = [];
  blankTodo =  { id: -1, item:  'blank'};
  addToGroupId: number = 0; //used to track which group triggerd add button
  addItemIndex: number = 24; //gives unique id to items added
  addGroupIndex: number = 5; //gives unique id to group item added
  editListNameId: number = 0; //used to track the list name being updated

  constructor(public dialog: MatDialog) { 
  
    this.todoGroup = [
      {
        id: 1,
        classId: 'grp1', 
        name: 'School',
        todos:[
          { id: 1, item:  'Do math assignment'},
          { id: 2, item:  'Pass English Paper'},
          { id: 3, item:  'Research social studies homework'},
          { id: 4, item:  'Do group project'},
          { id: 5, item:  'Research english paper'},
        ]
      },
      {
        id: 2,
        classId: 'grp2', 
        name: 'Chores',
        todos:[
          { id: 6, item:  'Wash Dishes'},
          { id: 7, item:  'Do Laundry'},
          { id: 8, item:  'Walk the dog'},
          { id: 9, item:  'Cook Lunch'},
          { id: 10, item: 'Pay bill'},
        ]
      },
      {
        id: 3,
        classId: 'grp3', 
        name: 'Work',
        todos:[
          { id: 11, item:  'Finish project 1'},
          { id: 12, item:  'Read paper 1'},
          { id: 13, item:  'Confirm appointment'},
          { id: 14, item:  'Check email'},
          { id: 15, item:  'Go to meeting'},
          { id: 16, item:  'Milk cows'},
          { id: 17, item:  'Get eggs'},
          { id: 18, item:  'Feed horses'},
          { id: 19, item:  'Buy feeds'},
          { id: 20, item:  'Feed llamas'},
          { id: 21, item:  'Feed llamas'},
          { id: 22, item:  'Feed llamas'},

        ]
      },  
      {
        id: 4,
        classId: 'grp4', 
        name: 'Farm',
        todos:[       
        
          { id: 23, item:  'Feed llamas'},
        ]
      }
   
    ]
  
    for (let todo of this.todoGroup) {
      this.connectedTo.push(todo.classId);
    };
  
  }
  
  
  drop(event: CdkDragDrop<string[]>) {

    console.log(event);
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

  openDialog(item:any)
  {
     const dialogConfig = new MatDialogConfig();
     dialogConfig.width = '50%';
     dialogConfig.autoFocus = true;
     dialogConfig.data = { todo: item};
     console.log('open dialog' + item);
   
     let dialogRef =  this.dialog.open( DialogComponent, dialogConfig )
     dialogRef.afterClosed().subscribe(  
       data => console.log("Dialog output:", data)        
    );//#todo: update view of list with changed data 
  }

  addTodoItem(groupId:number, event: any)
  {
    
     let newItemElement  = (document.getElementById('newItem-' + groupId) as HTMLInputElement); 
     this.addToGroupId = groupId;
     let group = this.todoGroup.find( x => x.id == groupId);
     group.todos.push( { id: this.addItemIndex++ , item: newItemElement.value});
     newItemElement.value = '';
  }

  deleteItem(groupId:number, todoItemId:number)
  {
    let group = this.todoGroup.find( x => x.id == groupId);  
    let todoItemIndex = group.todos.findIndex( x => x.id == todoItemId );    

    if (todoItemIndex !== -1) {
      group.todos.splice(todoItemIndex, 1);
    }
  }

  addList()
  {   
    let newListItemElement  = (document.getElementById('newListItem') as HTMLInputElement); 
    this.todoGroup.push(
      {
        id: this.addGroupIndex++,
        classId: 'grp' + this.addGroupIndex, 
        name: newListItemElement.value,
        todos:[    
        ]
      }
   
    );
    newListItemElement.value = '';
  }

  editListName(id:number)
  {
    this.editListNameId = id;
  }

  updateListName(groupId:number)
  {
   

  
    
  }
  editListSettings(id:number)
  {

  }

  saveListName(groupId:number)
  {
    let group = this.todoGroup.find( x => x.id == groupId);  
    let newListName  = (document.getElementById('listName-' + groupId) as HTMLInputElement);      
    group.name = newListName.value;
    this.editListNameId = 0;

  }
}
