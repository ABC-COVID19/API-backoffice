import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISourceRepo } from 'app/shared/model/ICAMApi/source-repo.model';

@Component({
  selector: 'jhi-source-repo-detail',
  templateUrl: './source-repo-detail.component.html'
})
export class SourceRepoDetailComponent implements OnInit {
  sourceRepo: ISourceRepo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sourceRepo }) => (this.sourceRepo = sourceRepo));
  }

  previousState(): void {
    window.history.back();
  }
}
