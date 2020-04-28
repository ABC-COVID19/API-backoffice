import { Component, OnInit } from '@angular/core';
import { CategoryTreeService } from '../entities/ICAMApi/category-tree/category-tree.service';
import { RevisionService, IFlatRevision } from '../entities/ICAMApi/revision/revision.service';
import { ICategoryTree } from '../shared/model/ICAMApi/category-tree.model';
import { getHighlightCategoryID } from '../shared/util/category-util';
import { Router } from '@angular/router';
// import { IRevision } from '../shared/model/ICAMApi/revision.model';

@Component({
  selector: 'search',
  templateUrl: 'search.component.html',
  styleUrls: ['./search.scss']
})
export class SearchComponent implements OnInit {
  categories: ICategoryTree[] = [];
  lastRevisedCards: IFlatRevision[] = [];

  constructor(private categoryService: CategoryTreeService, private revisionService: RevisionService, private router: Router) {}

  ngOnInit(): void {
    this.categoryService.getMainCategories().subscribe(cats => {
      const highlightID = getHighlightCategoryID(cats);
      this.categories = cats;

      if (highlightID) {
        this.revisionService.getByCategoryID(highlightID, true).subscribe(revs => {
          this.lastRevisedCards = revs;
        });
      }
    });
  }

  goToCard(revision: IFlatRevision): void {
    this.router.navigate([`/articles/${revision.id}/view`]);
  }
}
