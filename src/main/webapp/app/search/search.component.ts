import { Component, OnInit } from '@angular/core';
import { CategoryTreeService } from '../entities/ICAMApi/category-tree/category-tree.service';
import { RevisionService } from '../entities/ICAMApi/revision/revision.service';
import { ICategoryTree } from '../shared/model/ICAMApi/category-tree.model';
// import { IRevision } from '../shared/model/ICAMApi/revision.model';

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
      categories: ['Fatores de risco', 'Fatores de risco', 'Fatores de risco']
    },
    {
      title: `Progressão Rápida para Síndrome do Desconforto Respiratório Agudo:
      Revisão da Compreensão Atual da Crítica Doença por infecção COVID-19.`,
      summary: `Rapid Progression to Acute Respiratory Distress Syndrome:
      Review of Current Understanding of Critical Illness from COVID-19 Infection.`,
      date: new Date(2020, 6, 24),
      author: 'Goh KJ, et al. Ann Acad Med Singapore, 2020',
      categories: ['Fatores de risco', 'Fatores de risco', 'Fatores de risco']
    },
    {
      title: `Progressão Rápida para Síndrome do Desconforto Respiratório Agudo:
      Revisão da Compreensão Atual da Crítica Doença por infecção COVID-19.`,
      summary: `Rapid Progression to Acute Respiratory Distress Syndrome:
      Review of Current Understanding of Critical Illness from COVID-19 Infection.`,
      date: new Date(2020, 6, 24),
      author: 'Goh KJ, et al. Ann Acad Med Singapore, 2020',
      categories: ['Fatores de risco', 'Fatores de risco', 'Fatores de risco']
    }
  ];

  constructor(private categoryService: CategoryTreeService, private revisionService: RevisionService) {}

  ngOnInit(): void {
    this.categoryService.getMainCategories().subscribe(cats => {
      const highlightID = CategoryTreeService.getHighlightCategoryID(cats);
      this.categories = cats;

      if (highlightID) {
        this.revisionService.getByCategoryID(highlightID).subscribe(revs => {
          // eslint-disable-next-line no-console
          console.log(revs);
        });
      }
    });
  }
}
