import { Component, Inject} from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import axios from 'axios'
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    public dialog: MatDialog
    ){}

  notes:any = []
  isLoading:boolean = true
  showSearch:boolean = false
  searchText:string = ''

  ngOnInit() {
    this.fetchNotes()
  }

  toggleSearch(){
    if(this.searchText !== ''){
      this.searchText = ''
      this.fetchNotes()
    }
    this.showSearch = !this.showSearch
  }
  filterNotes(){
    this.fetchNotes(this.searchText)
  }

  fetchNotes(searchQuery = ''){
    this.isLoading = true
    axios.get(environment.apiUrl+'notes/'+searchQuery,{
      headers: {
        "Authorization": "Bearer "+this.cookieService.get('token')
      }
    }).then(data => {
      this.isLoading = false
      this.notes = data.data.data
      console.log(data)
    }).catch(err =>{
      if(err.response.status == 401){
        alert(err.response.data.err.message)
        this.logout()
      }
      console.log(err)
    })
  }

  logout() {
    this.cookieService.delete('token')
    this.router.navigateByUrl('')
  }

  createNote(){
    console.log('sssssss')
    this.router.navigate(['createNote'])
  }
  viewNote(note:any){
    console.log(note)
    this.router.navigateByUrl('viewNote',{ state: { note } })
  }
  editNote(note:any){
    console.log(note)
    console.log('sssssss')
    this.router.navigateByUrl('editNote',{ state: { note } })
  }
  openDeleteDialog(id:any){
    console.log(id)
    const dialogRef = this.dialog.open(DeleteDialog, {
      data: {id: id},
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchNotes()
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DeleteDialog {

  constructor(
    private cookieService: CookieService,
    public dialogRef: MatDialogRef<DeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {id: string},
  ) {}

  deleteNote() {
    console.log('deleted',this.data.id)
    axios.put(environment.apiUrl+'deleteNote/'+this.data.id,{},{
      headers: {
        "Authorization": "Bearer "+this.cookieService.get('token')
      }
    }).then(data => alert(data.data.message))
    this.dialogRef.close();
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
