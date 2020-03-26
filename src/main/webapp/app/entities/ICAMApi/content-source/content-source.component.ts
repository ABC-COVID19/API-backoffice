import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IContentSource } from 'app/shared/model/ICAMApi/content-source.model';
import { ContentSourceService } from './content-source.service';
import { ContentSourceDeleteDialogComponent } from './content-source-delete-dialog.component';

@Component({
  selector: 'jhi-content-source',
  templateUrl: './content-source.component.html'
})
export class ContentSourceComponent implements OnInit, OnDestroy {
  contentSources?: IContentSource[];
  eventSubscriber?: Subscription;

  constructor(
    protected contentSourceService: ContentSourceService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.contentSourceService.query().subscribe((res: HttpResponse<IContentSource[]>) => (this.contentSources = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInContentSources();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IContentSource): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInContentSources(): void {
    this.eventSubscriber = this.eventManager.subscribe('contentSourceListModification', () => this.loadAll());
  }

  delete(contentSource: IContentSource): void {
    const modalRef = this.modalService.open(ContentSourceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.contentSource = contentSource;
  }
}
