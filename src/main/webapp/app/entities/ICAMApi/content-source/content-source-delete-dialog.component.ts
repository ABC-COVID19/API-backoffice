import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContentSource } from 'app/shared/model/ICAMApi/content-source.model';
import { ContentSourceService } from './content-source.service';

@Component({
  templateUrl: './content-source-delete-dialog.component.html'
})
export class ContentSourceDeleteDialogComponent {
  contentSource?: IContentSource;

  constructor(
    protected contentSourceService: ContentSourceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.contentSourceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('contentSourceListModification');
      this.activeModal.close();
    });
  }
}
