import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  connectedTo = [];
  todoGroup = [];

  addToGroupId: number = 0; //used to track which group triggerd add button
  addItemIndex: number = 24; //gives unique id to items added
  addGroupIndex: number = 5; //gives unique id to group item added
  editListNameId: number = 0; //used to track the list name being updated

  initTodolist() 
  {
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
          { id: 6, item:  'Wash Dishes' },
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

  getConnectedTo()
  {
    return this.connectedTo;
  }
  getAllTodos():any
  {
    return this.todoGroup;
  }

  addTodoItem(groupId:number, description:string)
  {
     let group = this.todoGroup.find( x => x.id == groupId);
     group.todos.push( { id: this.addItemIndex++ , item: description}); 
  }

  deleteTodoItem(groupId:number, todoItemId:number)
  {
    let group = this.todoGroup.find( x => x.id == groupId);  
    let todoItemIndex = group.todos.findIndex( x => x.id == todoItemId );    

    if (todoItemIndex !== -1) {
      group.todos.splice(todoItemIndex, 1);
    }
  }

  addList(listName:string)
  {
      this.todoGroup.push({
        id: this.addGroupIndex++,
        classId: 'grp' + this.addGroupIndex, 
        name: listName,
        todos:[    
        ]
      })
  }

  updateListName(groupId:number, updatedName:string)
  {
    let group = this.todoGroup.find( x => x.id == groupId);  
    group.name = updatedName;
  }

  getGroupId()
  {
    return this.addToGroupId;
  }

  getGroupList(groupId:number)
  {
    console.log('getGroupList: ' + groupId);
    let groupIdIndex = this.todoGroup.findIndex( x => x.id == groupId);  
    console.log('getGroupList: ' + groupIdIndex);
    return this.todoGroup[groupIdIndex]; 
  }

  deleteList(groupId:number)
  {
    let groupIdIndex  = this.todoGroup.findIndex( x => x.id == groupId);      
    this.todoGroup.splice(groupIdIndex, 1);
  }

  setTodoCompleted(groupId:number, todoItemId:number, completed:boolean)
  {
    let group = this.todoGroup.find( x => x.id == groupId);  
    let todoItemIndex = group.todos.findIndex( x => x.id == todoItemId );    

    if (todoItemIndex !== -1) {
      group.todos[todoItemIndex].completed = completed;
    } 
  }
}
