import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IArticleType } from 'app/shared/model/ICAMApi/article-type.model';
import { ArticleTypeService } from './article-type.service';
import { ArticleTypeDeleteDialogComponent } from './article-type-delete-dialog.component';

@Component({
  selector: 'jhi-article-type',
  templateUrl: './article-type.component.html'
})
export class ArticleTypeComponent implements OnInit, OnDestroy {
  articleTypes?: IArticleType[];
  eventSubscriber?: Subscription;

  constructor(
    protected articleTypeService: ArticleTypeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.articleTypeService.query().subscribe((res: HttpResponse<IArticleType[]>) => (this.articleTypes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInArticleTypes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IArticleType): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInArticleTypes(): void {
    this.eventSubscriber = this.eventManager.subscribe('articleTypeListModification', () => this.loadAll());
  }

  delete(articleType: IArticleType): void {
    const modalRef = this.modalService.open(ArticleTypeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.articleType = articleType;
  }
}
