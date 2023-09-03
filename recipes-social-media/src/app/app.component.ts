import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'recipes-social-media';

  constructor(private authService: AuthService, private cookieService: CookieService) {
    const token = cookieService.get("token");
    if (token) {
      this.authService.login(); // Set authentication state
    } else {
      this.authService.logout();
      localStorage.removeItem("userData")
    }
  }
}
