import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICategoryTree } from 'app/shared/model/ICAMApi/category-tree.model';

@Component({
  selector: 'jhi-category-tree-detail',
  templateUrl: './category-tree-detail.component.html'
})
export class CategoryTreeDetailComponent implements OnInit {
  categoryTree: ICategoryTree | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ categoryTree }) => (this.categoryTree = categoryTree));
  }

  previousState(): void {
    window.history.back();
  }
}
