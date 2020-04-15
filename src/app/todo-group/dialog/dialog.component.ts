import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef} from "@angular/material";
import {  MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    
  }

  close() {
    this.dialogRef.close(this.data);
  }

}
