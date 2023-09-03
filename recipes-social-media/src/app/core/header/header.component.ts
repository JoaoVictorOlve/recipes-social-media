import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private accountService:AccountService, private authService:AuthService,
              private cookieService: CookieService){}

  ngOnInit(){
    console.log(this.isLoggedIn())
  }


  logout():void{
    this.cookieService.deleteAll('../');
    localStorage.removeItem("userData");
    this.authService.logout();
    location.reload();
  }

  isLoggedIn() {
    return this.authService.isAuthenticated;
  }

}
