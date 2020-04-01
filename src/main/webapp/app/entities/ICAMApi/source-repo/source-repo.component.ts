import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISourceRepo } from 'app/shared/model/ICAMApi/source-repo.model';
import { SourceRepoService } from './source-repo.service';
import { SourceRepoDeleteDialogComponent } from './source-repo-delete-dialog.component';

@Component({
  selector: 'jhi-source-repo',
  templateUrl: './source-repo.component.html'
})
export class SourceRepoComponent implements OnInit, OnDestroy {
  sourceRepos?: ISourceRepo[];
  eventSubscriber?: Subscription;

  constructor(protected sourceRepoService: SourceRepoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.sourceRepoService.query().subscribe((res: HttpResponse<ISourceRepo[]>) => (this.sourceRepos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSourceRepos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISourceRepo): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSourceRepos(): void {
    this.eventSubscriber = this.eventManager.subscribe('sourceRepoListModification', () => this.loadAll());
  }

  delete(sourceRepo: ISourceRepo): void {
    const modalRef = this.modalService.open(SourceRepoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.sourceRepo = sourceRepo;
  }
}
