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
  addToGroupId: number = 0; //used to track which group triggerd add button
  addItemIndex: number = 24; //gives unique id to items added
  addGroupIndex: number = 5; //gives unique id to group item added
  editListNameId: number = 0; //used to track the list name being updated

  constructor(public dialog: MatDialog, private todoService: TodoService ) { 
  
    this.todoGroup = [
      {
        id: 1,
        classId: 'grp1', 
        name: 'School',
        todos:[
          { id: 1, item:  'Do math assignment', completed: false},
          { id: 2, item:  'Pass English Paper', completed: false},
          { id: 3, item:  'Research social studies homework', completed: false},
          { id: 4, item:  'Do group project', completed: false},
          { id: 5, item:  'Research english paper', completed: false},
        ]
      },
      {
        id: 2,
        classId: 'grp2', 
        name: 'Chores',
        todos:[
          { id: 6, item:  'Wash Dishes', completed: false},
          { id: 7, item:  'Do Laundry', completed: false},
          { id: 8, item:  'Walk the dog', completed: false},
          { id: 9, item:  'Cook Lunch', completed: false},
          { id: 10, item: 'Pay bill', completed: false},
        ]
      },
      {
        id: 3,
        classId: 'grp3', 
        name: 'Work',
        todos:[
          { id: 11, item:  'Finish project 1', completed: false},
          { id: 12, item:  'Read paper 1', completed: false},
          { id: 13, item:  'Confirm appointment', completed: false},
          { id: 14, item:  'Check email', completed: false},
          { id: 15, item:  'Go to meeting', completed: false},
          { id: 16, item:  'Milk cows', completed: false},
          { id: 17, item:  'Get eggs', completed: false},
          { id: 18, item:  'Feed horses', completed: false},
          { id: 19, item:  'Buy feeds', completed: false},
          { id: 20, item:  'Feed llamas', completed: false},
          { id: 21, item:  'Feed llamas', completed: false},
          { id: 22, item:  'Feed llamas', completed: false},

        ]
      },  
      {
        id: 4,
        classId: 'grp4', 
        name: 'Farm',
        todos:[       
        
          { id: 23, item:  'Feed llamas', completed: true},
        ]
      }
   
    ]
  
    for (let todo of this.todoGroup) {
      this.connectedTo.push(todo.classId);
    };
  
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
     group.todos.push( { id: this.addItemIndex++ , item: newItemElement.value, completed: false});
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
    let newGroup = this.todoGroup[ this.todoGroup.length-1];
    newListItemElement.value = '';
    this.connectedTo.push(newGroup.classId);
  }

  editListName(id:number)
  {
    this.editListNameId = id;
  }
  deleteListGroup(groupId:number)
  {
    //delete from todoGroup and from connected
    let groupIdIndex  = this.todoGroup.findIndex( x => x.id == groupId);  
    let group = this.todoGroup[ groupIdIndex ];
    let connectedIndex = this.connectedTo.findIndex( x => x == group.classId )
    this.todoGroup.splice(groupIdIndex, 1);
    this.connectedTo.splice(connectedIndex,1);    
    
  }
  saveListName(groupId:number)
  {
    let group = this.todoGroup.find( x => x.id == groupId);  
    let newListName  = (document.getElementById('listName-' + groupId) as HTMLInputElement);      
    group.name = newListName.value;
    this.editListNameId = 0;

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

}
