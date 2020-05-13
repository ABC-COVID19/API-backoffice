import { Component } from '@angular/core';
import { LoginService } from 'app/core/login/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.scss']
})
export class TopNavbarComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  logout(): void {
    this.loginService.logout();
    // TODO not the best approach. Remove when the front-office is ready;
    window.location.reload();
  }
}
