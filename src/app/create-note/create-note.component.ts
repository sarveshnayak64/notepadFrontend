import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms'
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios'
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent {
  constructor(
    private cookieService: CookieService,
    private _location: Location,
    private router: Router){
  }
  noteForm = new FormGroup({
    subject: new FormControl(''),
    body: new FormControl(''),
  })

  createNote(){
    let payload: any = {
    "body": this.noteForm.value.body,
    "subject": this.noteForm.value.subject
  }

  axios.post(environment.apiUrl+'note/', payload, {
    headers: {
      "Authorization": "Bearer " + this.cookieService.get('token')
    }
  }).then(data => {
    alert(data.data.message)
    this._location.back()
  
  }).catch(err =>{
    if(err.response.status == 401){
      alert(err.response.data.err.message)
      this.logout()
    }
    console.log(err)
  })
  }

  logout(){
    this.cookieService.delete('token')
    this.router.navigateByUrl('')
  }
  goBack(){
    this._location.back()
  }
}
