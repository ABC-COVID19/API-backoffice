import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContentSource } from 'app/shared/model/ICAMApi/content-source.model';

@Component({
  selector: 'jhi-content-source-detail',
  templateUrl: './content-source-detail.component.html'
})
export class ContentSourceDetailComponent implements OnInit {
  contentSource: IContentSource | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contentSource }) => (this.contentSource = contentSource));
  }

  previousState(): void {
    window.history.back();
  }
}
