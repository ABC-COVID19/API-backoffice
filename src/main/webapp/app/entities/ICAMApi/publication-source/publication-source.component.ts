import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPublicationSource } from 'app/shared/model/ICAMApi/publication-source.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { PublicationSourceService } from './publication-source.service';
import { PublicationSourceDeleteDialogComponent } from './publication-source-delete-dialog.component';

@Component({
  selector: 'jhi-publication-source',
  templateUrl: './publication-source.component.html'
})
export class PublicationSourceComponent implements OnInit, OnDestroy {
  publicationSources: IPublicationSource[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected publicationSourceService: PublicationSourceService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.publicationSources = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.publicationSourceService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IPublicationSource[]>) => this.paginatePublicationSources(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.publicationSources = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPublicationSources();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPublicationSource): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPublicationSources(): void {
    this.eventSubscriber = this.eventManager.subscribe('publicationSourceListModification', () => this.reset());
  }

  delete(publicationSource: IPublicationSource): void {
    const modalRef = this.modalService.open(PublicationSourceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.publicationSource = publicationSource;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginatePublicationSources(data: IPublicationSource[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.publicationSources.push(data[i]);
      }
    }
  }
}
