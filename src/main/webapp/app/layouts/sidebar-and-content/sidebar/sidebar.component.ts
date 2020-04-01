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
      icon: 'fa-search'
    },
    {
      txt: 'Artigos',
      icon: 'fa-file-medical'
    },
    {
      txt: 'Sobre o ICAM',
      icon: 'fa-info'
    },
    {
      txt: 'Receber Atualizações',
      icon: 'fa-envelope'
    },
    {
      txt: 'Contatos',
      icon: 'fa-phone'
    }
  ];
  constructor() {}
}
