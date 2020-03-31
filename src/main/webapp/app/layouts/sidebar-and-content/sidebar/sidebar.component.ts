import { Component } from '@angular/core';
import { faSearch, faFileMedical, faInfo, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.scss']
})
export class SidebarComponent {
  links = [
    {
      txt: 'Pesquisa',
      icon: faSearch
    },
    {
      txt: 'Artigos',
      icon: faFileMedical
    },
    {
      txt: 'Sobre o ICAM',
      icon: faInfo
    },
    {
      txt: 'Receber Atualizações',
      icon: faEnvelope
    },
    {
      txt: 'Contatos',
      icon: faPhone
    }
  ];
  constructor() {}
}
