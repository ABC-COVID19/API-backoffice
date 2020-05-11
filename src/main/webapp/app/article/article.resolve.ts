import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap, catchError } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { IFlatRevision, RevisionService } from 'app/entities/ICAMApi/revision/revision.service';
import { IRevision } from 'app/shared/model/ICAMApi/revision.model';

@Injectable({ providedIn: 'root' })
export class ArticleResolve implements Resolve<IFlatRevision> {
  constructor(private service: RevisionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFlatRevision> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((article: HttpResponse<IRevision>) => {
          if (article.body) {
            return of(RevisionService.convertToFlatRevision(article.body));
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        }),
        catchError(() => {
          this.router.navigate(['/']);
          return EMPTY;
        })
      );
    } else {
      this.router.navigate(['404']);
      return EMPTY;
    }
  }
}
