import { Component } from '@angular/core';
import { ICategoryCheckbox } from './icam-updates-form/category-checkbox.model';

@Component({
  selector: 'icam-updates',
  templateUrl: 'icam-updates.component.html',
  styleUrls: ['./icam-updates.scss']
})
export class IcamUpdatesComponent {
  categories: ICategoryCheckbox[] = [
    {
      id: '1',
      name: 'Etiologia'
    },
    {
      id: '2',
      name: 'Fatores de risco'
    },
    {
      id: '3',
      name: 'Epidemiologia'
    },
    {
      id: '4',
      name: 'Apresentação clínica'
    },
    {
      id: '5',
      name: 'Fisiopatologia'
    },
    {
      id: '6',
      name: 'Diagnóstico'
    }
  ];
  constructor() {}
}
