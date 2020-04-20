import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef} from "@angular/material";
import { MAT_DIALOG_DATA} from "@angular/material/dialog";
import { TodoService } from '../service/todo.service';


@Component({
  selector: 'app-todo-group-dialog',
  templateUrl: './todo-group-dialog.component.html',
  styleUrls: ['./todo-group-dialog.component.scss']
})
export class TodoGroupDialogComponent implements OnInit {

  showDeleteConfirmMsg:boolean = false;
  deleteThisList:boolean = false;
  constructor(private dialogRef: MatDialogRef<TodoGroupDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private todoService:TodoService) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close(this.deleteThisList);
  }

  deleteConfirmed() {
    this.showDeleteConfirmMsg = true;

   //this.todoService.deleteList(this.data.id); 
  }
  deleteCancelled(){
    this.showDeleteConfirmMsg = false;
  }
  delete() { 
    this.deleteThisList = true;
    this.close();
  }
}
