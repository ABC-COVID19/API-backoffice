import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPublicationSource } from 'app/shared/model/ICAMApi/publication-source.model';
import { PublicationSourceService } from './publication-source.service';

@Component({
  templateUrl: './publication-source-delete-dialog.component.html'
})
export class PublicationSourceDeleteDialogComponent {
  publicationSource?: IPublicationSource;

  constructor(
    protected publicationSourceService: PublicationSourceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.publicationSourceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('publicationSourceListModification');
      this.activeModal.close();
    });
  }
}
