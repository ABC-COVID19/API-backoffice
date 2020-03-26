import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INewsletter } from 'app/shared/model/ICAMApi/newsletter.model';
import { NewsletterService } from './newsletter.service';

@Component({
  templateUrl: './newsletter-delete-dialog.component.html'
})
export class NewsletterDeleteDialogComponent {
  newsletter?: INewsletter;

  constructor(
    protected newsletterService: NewsletterService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.newsletterService.delete(id).subscribe(() => {
      this.eventManager.broadcast('newsletterListModification');
      this.activeModal.close();
    });
  }
}
