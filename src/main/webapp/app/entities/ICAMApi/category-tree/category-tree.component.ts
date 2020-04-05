import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICategoryTree } from 'app/shared/model/ICAMApi/category-tree.model';
import { CategoryTreeService } from './category-tree.service';
import { CategoryTreeDeleteDialogComponent } from './category-tree-delete-dialog.component';

@Component({
  selector: 'jhi-category-tree',
  templateUrl: './category-tree.component.html'
})
export class CategoryTreeComponent implements OnInit, OnDestroy {
  categoryTrees?: ICategoryTree[];
  eventSubscriber?: Subscription;

  constructor(
    protected categoryTreeService: CategoryTreeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.categoryTreeService.query().subscribe((res: HttpResponse<ICategoryTree[]>) => (this.categoryTrees = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCategoryTrees();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICategoryTree): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCategoryTrees(): void {
    this.eventSubscriber = this.eventManager.subscribe('categoryTreeListModification', () => this.loadAll());
  }

  delete(categoryTree: ICategoryTree): void {
    const modalRef = this.modalService.open(CategoryTreeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.categoryTree = categoryTree;
  }
}
