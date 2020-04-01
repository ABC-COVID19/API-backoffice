import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISourceRepo } from 'app/shared/model/ICAMApi/source-repo.model';
import { SourceRepoService } from './source-repo.service';

@Component({
  templateUrl: './source-repo-delete-dialog.component.html'
})
export class SourceRepoDeleteDialogComponent {
  sourceRepo?: ISourceRepo;

  constructor(
    protected sourceRepoService: SourceRepoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sourceRepoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('sourceRepoListModification');
      this.activeModal.close();
    });
  }
}
