import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  userForm = new FormGroup ({
    name: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    confirmPassword: new FormControl("")
  });

  constructor(private http:HttpClient,
              private formBuilder: FormBuilder,
              private router:Router,
              private accountService: AccountService,
              private authService: AuthService){
  }

  ngOnInit():void{

  }

  validateEmail = (email:String | null)=>{
    let validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    if(email!.match(validRegex)){
      return true;
    } else {
      return false;
    }
  }

  validatePassword = (password: any) => {
    if (password.length < 8 || password.length > 20) {
      return false;
    }

    if (!/[a-z]/.test(password)) {
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      return false;
    }

    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
      return false;
    }

    return true;
  }

  submit():void{
    let user = this.userForm.getRawValue();
    if(user.name == "" || user.email == "" || user.password == "" || user.confirmPassword == ""){
      Swal.fire("Error", "Favor preencher todos os campos!", "error")
    }
    else if (this.validateEmail(user.email) == false){
      Swal.fire("Error", "Favor informar um e-mail válido!", "error")
    }
    else if (this.validatePassword(user.password) == false){
      Swal.fire("Error", "Informe uma senha forte (precisa ter entre 8 e 20 caracteres, pelos uma letra minúscula e uma letra maiúscula, um número e uma pontuação).", "error")
    }
    else if (user.password !== user.confirmPassword){
      Swal.fire("Error", "A senha deve coincidir com o campo de confirmação de senha!", "error")
    }
    else{

    this.accountService.createUser({
      name: user.name || "",
      email: user.email || "",
      password: user.password || ""
    }).subscribe(
      ()=> {
        this.authService.register();
        Swal.fire("Conta registrada com sucesso!")
        this.router.navigate(['/auth/login'])
      }, (err)=>{
      Swal.fire("Error", err.error.error, "error")
    })
    }
  }
}
