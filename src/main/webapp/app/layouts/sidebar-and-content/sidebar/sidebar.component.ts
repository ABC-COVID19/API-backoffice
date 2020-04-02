import { Component } from '@angular/core';
@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.scss']
})
export class SidebarComponent {
  links = [
    {
      txt: 'Pesquisa',
      icon: 'fa-search',
      path: '/search'
    },
    {
      txt: 'Artigos',
      icon: 'fa-file-medical',
      path: '/articles'
    },
    {
      txt: 'Sobre o ICAM',
      icon: 'fa-info',
      path: '/about'
    },
    {
      txt: 'Receber Atualizações',
      icon: 'fa-envelope',
      path: '/updates'
    },
    {
      txt: 'Contatos',
      icon: 'fa-phone',
      path: '/contacts'
    }
  ];
  constructor() {}
}
