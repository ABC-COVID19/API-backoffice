import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISourceRepo, SourceRepo } from 'app/shared/model/ICAMApi/source-repo.model';
import { SourceRepoService } from './source-repo.service';
import { SourceRepoComponent } from './source-repo.component';
import { SourceRepoDetailComponent } from './source-repo-detail.component';
import { SourceRepoUpdateComponent } from './source-repo-update.component';

@Injectable({ providedIn: 'root' })
export class SourceRepoResolve implements Resolve<ISourceRepo> {
  constructor(private service: SourceRepoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISourceRepo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((sourceRepo: HttpResponse<SourceRepo>) => {
          if (sourceRepo.body) {
            return of(sourceRepo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SourceRepo());
  }
}

export const sourceRepoRoute: Routes = [
  {
    path: '',
    component: SourceRepoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'SourceRepos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SourceRepoDetailComponent,
    resolve: {
      sourceRepo: SourceRepoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'SourceRepos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SourceRepoUpdateComponent,
    resolve: {
      sourceRepo: SourceRepoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'SourceRepos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SourceRepoUpdateComponent,
    resolve: {
      sourceRepo: SourceRepoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'SourceRepos'
    },
    canActivate: [UserRouteAccessService]
  }
];
