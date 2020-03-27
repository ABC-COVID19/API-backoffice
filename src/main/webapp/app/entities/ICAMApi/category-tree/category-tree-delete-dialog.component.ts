import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICategoryTree } from 'app/shared/model/ICAMApi/category-tree.model';
import { CategoryTreeService } from './category-tree.service';

@Component({
  templateUrl: './category-tree-delete-dialog.component.html'
})
export class CategoryTreeDeleteDialogComponent {
  categoryTree?: ICategoryTree;

  constructor(
    protected categoryTreeService: CategoryTreeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.categoryTreeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('categoryTreeListModification');
      this.activeModal.close();
    });
  }
}
