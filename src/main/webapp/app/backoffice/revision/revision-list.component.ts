import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RevisionService } from 'app/entities/ICAMApi/revision/revision.service';
import { ReviewState } from 'app/shared/model/enumerations/review-state.model';
import { IRevision } from 'app/shared/model/ICAMApi/revision.model';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateStorageService } from 'app/core/auth/state-storage.service';
import { CategoryTreeService } from 'app/entities/ICAMApi/category-tree/category-tree.service';

@Component({
  selector: 'revision-list',
  templateUrl: 'revision-list.component.html',
  styleUrls: ['../article/article-list/article-list.scss']
})
export class RevisionListComponent implements OnInit {
  revisions: Observable<IRevision[]> = EMPTY;
  selectedStates: ReviewState[] = [];
  destaquesId = 0;
  destaquesOn = false;

  constructor(
    private revisionService: RevisionService,
    private categoryTreeService: CategoryTreeService,
    private router: Router,
    private stateStorageService: StateStorageService
  ) {}

  ngOnInit(): void {
    this.categoryTreeService.query({ 'itemName.equals': 'Destaques' }).subscribe(res => {
      if (!(res.body === null)) {
        this.destaquesId = res.body.length > 0 ? (res.body[0].id === undefined ? 0 : res.body[0].id) : 0;
      } else {
        throw new DOMException('Category "Destaques" not found.');
      }
    });
  }

  loadData(states: ReviewState[]): void {
    this.selectedStates = states;
    const params = {
      'reviewState.in': states.join(',')
    };

    this.revisions = this.revisionService.query(params).pipe(map(r => r.body || []));
  }

  loadDestaques(): void {
    if (this.destaquesOn) {
      this.loadData(this.selectedStates);
    } else {
      const params = {
        'ctreeId.equals': this.destaquesId
      };
      this.revisions = this.revisionService.query(params).pipe(map(r => r.body || []));
    }
    this.destaquesOn = !this.destaquesOn;
  }

  editRevision(id: number): void {
    if (id >= 0) {
      this.stateStorageService.storeUrl(this.router.routerState.snapshot.url);
      this.router.navigate(['/backoffice', 'articles', id, 'review']);
    }
  }

  deleteRevision(id: number): void {
    if (confirm(`Tem a certeza que quer apagar a revisão # ${id} ?`)) {
      this.revisionService.delete(id).subscribe(
        () => {
          //  Apagado com sucesso
          window.location.reload();
        },
        () => {
          //  error
        }
      );
    }
  }
}
