import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RevisionService } from 'app/entities/ICAMApi/revision/revision.service';
import { ReviewState } from 'app/shared/model/enumerations/review-state.model';
import { IRevision } from 'app/shared/model/ICAMApi/revision.model';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'revision-list',
  templateUrl: 'revision-list.component.html',
  styleUrls: ['../article/article-list/article-list.scss']
})
export class RevisionListComponent {
  revisions: Observable<IRevision[]> = EMPTY;

  constructor(private revisionService: RevisionService, private router: Router) {}

  loadData(states: ReviewState[]): void {
    const params = {
      'reviewState.in': states.join(',')
    };

    this.revisions = this.revisionService.query(params).pipe(map(r => r.body || []));
  }

  onEdit(revision: IRevision): void {
    alert('A EDITAR ' + revision.id);
  }
}
