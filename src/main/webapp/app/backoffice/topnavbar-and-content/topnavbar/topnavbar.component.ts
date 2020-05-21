import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'app/core/login/login.service';
import { TopNavBarService } from './topnavbar.component.service';
@Component({
  selector: 'topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.scss']
})
export class TopNavbarComponent implements OnInit {
  revisionsNumber = 0;
  articlesNumber = 0;
  // Intervalo de tempo em milisegundos que atualiza os contadores de revisionsNumber e articlesNumber
  tempoInterval = 60000;

  constructor(private loginService: LoginService, private router: Router, private topNavBarService: TopNavBarService) {}

  ngOnInit(): void {
    this.revisionsCount();
    this.articlesCount();
  }

  logout(): void {
    this.loginService.logout();
    // TODO not the best approach. Remove when the front-office is ready;
    window.location.reload();
  }

  revisionsCount(): void {
    this.revisionsNumber = 0;
    setTimeout(() => {
      this.serverRevisionsCount();
    }, 0);
    setInterval(() => {
      this.serverRevisionsCount();
    }, this.tempoInterval);
  }

  articlesCount(): void {
    this.articlesNumber = 0;
    setTimeout(() => {
      this.serverArticlesCount();
    }, 0);
    setInterval(() => {
      this.serverArticlesCount();
    }, this.tempoInterval);
  }

  private serverRevisionsCount(): void {
    this.topNavBarService.revisionsCount().subscribe((retorno: any) => (this.revisionsNumber = retorno));
  }

  private serverArticlesCount(): void {
    this.topNavBarService.articlesCount().subscribe((retorno: any) => (this.articlesNumber = retorno));
  }
}
