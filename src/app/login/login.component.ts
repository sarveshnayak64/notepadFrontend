import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import axios from 'axios'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private router: Router ) {}

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  ngOnInit(){
    if(this.cookieService.check('token')){
      this.router.navigateByUrl('/notes')

    }
  }

  async loginUser() {
    try{
      const result = await axios.post(environment.apiUrl+'login', {
        "email": this.loginForm.value.email,
        "password": this.loginForm.value.password
      })
      const token = result.data.data.token
      this.cookieService.set('token',token);
      console.log(result.data.data.token)
      alert(result.data.message)
      this.router.navigate(['/notes']);
    } catch(err:any){
      console.log(err)
      alert(err.response.data.message)
    }
  }

} 
