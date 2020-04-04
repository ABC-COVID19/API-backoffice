import { Component } from '@angular/core';

@Component({
  selector: 'search',
  templateUrl: 'search.component.html',
  styleUrls: ['./search.scss']
})
export class SearchComponent {
  categories = ['Covid', 'Etiologia-Virus SARS-CoV-2', 'Fatores de risco', 'Tratamento', 'Fisiopatologia', 'Prognóstico', 'Diagnóstico'];
  constructor() {}
}
