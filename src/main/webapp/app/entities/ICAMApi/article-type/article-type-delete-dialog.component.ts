import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IArticleType } from 'app/shared/model/ICAMApi/article-type.model';
import { ArticleTypeService } from './article-type.service';

@Component({
  templateUrl: './article-type-delete-dialog.component.html'
})
export class ArticleTypeDeleteDialogComponent {
  articleType?: IArticleType;

  constructor(
    protected articleTypeService: ArticleTypeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.articleTypeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('articleTypeListModification');
      this.activeModal.close();
    });
  }
}
