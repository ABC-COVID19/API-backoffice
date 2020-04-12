import { Component, OnInit } from '@angular/core';
import { CategoryTreeService } from '../entities/ICAMApi/category-tree/category-tree.service';
import { ICategoryTree } from '../shared/model/ICAMApi/category-tree.model';

@Component({
  selector: 'search',
  templateUrl: 'search.component.html',
  styleUrls: ['./search.scss']
})
export class SearchComponent implements OnInit {
  categories: ICategoryTree[] = [];
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

  constructor(private categoryService: CategoryTreeService) {}

  ngOnInit(): void {
    this.categoryService.getMainCategories().subscribe(cats => {
      this.categories = cats;
    });
  }
}
