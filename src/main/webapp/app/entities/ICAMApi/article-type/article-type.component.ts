import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IArticleType } from 'app/shared/model/ICAMApi/article-type.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ArticleTypeService } from './article-type.service';
import { ArticleTypeDeleteDialogComponent } from './article-type-delete-dialog.component';

@Component({
  selector: 'jhi-article-type',
  templateUrl: './article-type.component.html'
})
export class ArticleTypeComponent implements OnInit, OnDestroy {
  articleTypes: IArticleType[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected articleTypeService: ArticleTypeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.articleTypes = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.articleTypeService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IArticleType[]>) => this.paginateArticleTypes(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.articleTypes = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
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
    this.eventSubscriber = this.eventManager.subscribe('articleTypeListModification', () => this.reset());
  }

  delete(articleType: IArticleType): void {
    const modalRef = this.modalService.open(ArticleTypeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.articleType = articleType;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateArticleTypes(data: IArticleType[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.articleTypes.push(data[i]);
      }
    }
  }
}
