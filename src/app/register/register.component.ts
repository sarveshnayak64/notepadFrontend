import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import axios from 'axios'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private router: Router ) {}

  ngOnInit(){
    if(this.cookieService.check('token')){
      this.router.navigateByUrl('/notes')

    }
  }

  async registerUser() {
    try{
      const result = await axios.post(environment.apiUrl+'register', {
        "userName": this.registerForm.value.userName,
        "email": this.registerForm.value.email,
        "password": this.registerForm.value.password
      })
      if(result.status == 200){
        alert(result.data.message)
      }

    }catch(err:any){
      console.log(err)
      alert(err.response.data.message)
    }
  }

}
