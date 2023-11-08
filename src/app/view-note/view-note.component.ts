import { Location } from '@angular/common';
import { Component, Inject} from '@angular/core';
import { Router } from '@angular/router';
import { formatDate } from "@angular/common";
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

import {MatIconModule} from '@angular/material/icon';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.component.html',
  styleUrls: ['./view-note.component.scss']
})
export class ViewNoteComponent {
  id = ""
  subject = ""
  body = ""
  createdAt = ""
  constructor(
    private _location: Location,
    private router: Router,
    public dialog: MatDialog){
  }
  ngOnInit () {
    this.id = history.state.note.id
    this.subject = history.state.note.subject
    this.body = history.state.note.body
    this.createdAt = formatDate(history.state.note.createdAt,'dd MMM, yyyy','en-IN')
    console.log(history.state)
  }
  goBack(){
    this._location.back()
  }

  openShareDialog(){
    const dialogRef = this.dialog.open(DeleteDialog, {
      data: {id: this.id},
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}


@Component({
  selector: 'share-dialog',
  templateUrl: 'share-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, NgIf, MatButtonModule, MatIconModule],
})
export class DeleteDialog {
  
  constructor(
    private cookieService: CookieService,
    public dialogRef: MatDialogRef<DeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {id: string},
    ) {}

    isCopied:boolean = false
    url:string = location.origin.toString()+'/'+this.data.id

  shareNote() {
    console.log('shared',this.data.id)
    this.dialogRef.close();
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  copyToClipboard(){
    navigator.clipboard.writeText(this.url)
        .then(() => {
            this.isCopied = true
            setTimeout(() => {
                this.isCopied = false
            }, 4000)
            this.isCopied = true
        })
        .catch((error) => {
            console.error("Failed to copy text to clipboard:", error);
        });
};
}
