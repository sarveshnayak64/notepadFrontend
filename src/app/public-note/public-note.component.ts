import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-public-note',
  templateUrl: './public-note.component.html',
  styleUrls: ['./public-note.component.scss']
})
export class PublicNoteComponent {

  constructor(
    private route: ActivatedRoute,
  ){}

  id: string = this.route.snapshot.params['id']
  subject:string =  'sjhgdhs'
  body:string = 'jdksjk'
  createdAt:string = ''
  note: Object = {}

  ngOnInit(){
    console.log()
    axios.get(environment.apiUrl+'note/'+this.id).then(data => {
      this.subject = data.data.data.subject
      this.createdAt = formatDate(data.data.data.createdAt,'dd MMM, yyyy','en-IN')
      this.body = data.data.data.body
    console.log(data)
    }).catch(err=> console.log(err))
  }
}
