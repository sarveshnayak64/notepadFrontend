import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms'
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios'
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent {

  id = ''
  subject = ''
  body = ''
  noteForm: FormGroup;

  constructor(
    private cookieService: CookieService,
    private _location: Location,
    private router: Router) {
    this.noteForm = new FormGroup({
      subject: new FormControl(''),
      body: new FormControl(''),
    });
  }
  ngOnInit() {
    this.id = history.state.note.id
    this.subject = history.state.note.subject
    this.body = history.state.note.body
    console.log(this.body)

    this.noteForm = new FormGroup({
      subject: new FormControl(this.subject),
      body: new FormControl(this.body),
    })
  }



  editNote() {
    let payload: any = {
      "body": this.noteForm.value.body,
      "subject": this.noteForm.value.subject
    }

    axios.put(environment.apiUrl+'note/' + this.id, payload, {
      headers: {
        "Authorization": "Bearer " + this.cookieService.get('token')
      }
    })
    .then(data =>
       alert(data.data.message)
       ).catch(err =>{
        if(err.response.status == 401){
          alert(err.response.data.err.message)
          this.logout()
        }
        console.log(err)
      })
    console.log(this.noteForm)
  }

  logout(){
    this.cookieService.delete('token')
    this.router.navigateByUrl('')
  }

  goBack() {
    this._location.back()
  }
}
