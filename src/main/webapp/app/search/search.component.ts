import { Component } from '@angular/core';

@Component({
  selector: 'search',
  templateUrl: 'search.component.html',
  styleUrls: ['./search.scss']
})
export class SearchComponent {
  categories = ['Covid', 'Etiologia-Virus SARS-CoV-2', 'Fatores de risco', 'Tratamento', 'Fisiopatologia', 'Prognóstico', 'Diagnóstico'];
  lastRevisedCards = [
    {
      title: `Progressão Rápida para Síndrome do Desconforto Respiratório Agudo:
      Revisão da Compreensão Atual da Crítica Doença por infecção COVID-19.`,
      summary: `Rapid Progression to Acute Respiratory Distress Syndrome:
      Review of Current Understanding of Critical Illness from COVID-19 Infection.`,
      date: new Date(2020, 6, 24),
      author: 'Goh KJ, et al. Ann Acad Med Singapore, 2020',
      category: 'Fatores de risco'
    },
    {
      title: `Progressão Rápida para Síndrome do Desconforto Respiratório Agudo:
      Revisão da Compreensão Atual da Crítica Doença por infecção COVID-19.`,
      summary: `Rapid Progression to Acute Respiratory Distress Syndrome:
      Review of Current Understanding of Critical Illness from COVID-19 Infection.`,
      date: new Date(2020, 6, 24),
      author: 'Goh KJ, et al. Ann Acad Med Singapore, 2020',
      category: 'Fatores de risco'
    },
    {
      title: `Progressão Rápida para Síndrome do Desconforto Respiratório Agudo:
      Revisão da Compreensão Atual da Crítica Doença por infecção COVID-19.`,
      summary: `Rapid Progression to Acute Respiratory Distress Syndrome:
      Review of Current Understanding of Critical Illness from COVID-19 Infection.`,
      date: new Date(2020, 6, 24),
      author: 'Goh KJ, et al. Ann Acad Med Singapore, 2020',
      category: 'Fatores de risco'
    }
  ];
  constructor() {}
}
