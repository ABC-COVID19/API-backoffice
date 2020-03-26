import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPublicationSource } from 'app/shared/model/ICAMApi/publication-source.model';

@Component({
  selector: 'jhi-publication-source-detail',
  templateUrl: './publication-source-detail.component.html'
})
export class PublicationSourceDetailComponent implements OnInit {
  publicationSource: IPublicationSource | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ publicationSource }) => (this.publicationSource = publicationSource));
  }

  previousState(): void {
    window.history.back();
  }
}
