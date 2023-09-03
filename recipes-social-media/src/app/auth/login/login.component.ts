import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userForm = new FormGroup ({
    email: new FormControl(""),
    password: new FormControl(""),
  });

  constructor(private http:HttpClient,
    private formBuilder: FormBuilder,
    private router:Router,
    private accountService: AccountService,
    private authService: AuthService,
    private cookieService: CookieService){
}

ngOnInit():void{

}

submit():void{

  let user = this.userForm.getRawValue();
  if( user.email == "" || user.password == ""){
    Swal.fire("Error", "Favor preencher todos os campos!", "error")
  }
  else{

  this.accountService.loginUser({
    email: user.email || "",
    password: user.password || ""
  }).subscribe(
    (res)=> {
      this.authService.login();
      this.cookieService.set("token", res.token)
      localStorage.setItem('userData', JSON.stringify(res.user));
      Swal.fire("Login efetuado com sucesso!")
      this.router.navigate(['/'])
    }, (err)=>{
    Swal.fire("Erro", err.error.error, "error")
  })
  }
}
}
