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
          { id: 10, item: 'Pay bills', completed: false},
        ]
      },
      {
        id: 3,
        classId: 'grp3', 
        name: 'Work',
        todos:[
          { id: 11, item:  'Finish project', completed: false},
          { id: 12, item:  'Check work logs', completed: false},
          { id: 13, item:  'Confirm appointment', completed: false},
          { id: 14, item:  'Check email', completed: false},
          { id: 15, item:  'Go to meeting', completed: false},
        
        ]
      },  
      {
        id: 4,
        classId: 'grp4', 
        name: 'Farm',
        todos:[       
          { id: 16, item:  'Milk cows', completed: false},
          { id: 17, item:  'Get eggs', completed: false},
          { id: 18, item:  'Feed horses', completed: false},
          { id: 19, item:  'Buy feeds', completed: false},
          { id: 20, item:  'Feed llamas', completed: false},
          { id: 21, item:  'Feed chickens', completed: false},
          { id: 22, item:  'Clean shed', completed: false},
          { id: 23, item:  'Buy grains', completed: true},
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
     group.todos.push( { id: this.addItemIndex++ , item: description, completed: false});

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

      let newGroup = this.todoGroup[ this.todoGroup.length-1];     
      this.connectedTo.push(newGroup.classId);
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

  deleteListGroup(groupId:number)
  {
    //delete from todoGroup and from connected
    let groupIdIndex  = this.todoGroup.findIndex( x => x.id == groupId);  
    let group = this.todoGroup[ groupIdIndex ];
    let connectedIndex = this.connectedTo.findIndex( x => x == group.classId )
    this.todoGroup.splice(groupIdIndex, 1);
    this.connectedTo.splice(connectedIndex,1);        
  }

  updateTodoItem(groupId:number, item:any)
  {
    let groupIdIndex  = this.todoGroup.findIndex( x => x.id == groupId);     
    let group = this.todoGroup[ groupIdIndex ];
    let todoItemIndex = group.todos.findIndex( x => x.id == item.id );  
    group.todos[todoItemIndex] = item;
  }


  getGroupCount():number
  {
      return this.todoGroup.length;
  }
}
