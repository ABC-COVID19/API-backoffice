import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IContentSource, ContentSource } from 'app/shared/model/ICAMApi/content-source.model';
import { ContentSourceService } from './content-source.service';
import { ContentSourceComponent } from './content-source.component';
import { ContentSourceDetailComponent } from './content-source-detail.component';
import { ContentSourceUpdateComponent } from './content-source-update.component';

@Injectable({ providedIn: 'root' })
export class ContentSourceResolve implements Resolve<IContentSource> {
  constructor(private service: ContentSourceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IContentSource> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((contentSource: HttpResponse<ContentSource>) => {
          if (contentSource.body) {
            return of(contentSource.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ContentSource());
  }
}

export const contentSourceRoute: Routes = [
  {
    path: '',
    component: ContentSourceComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ContentSources'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ContentSourceDetailComponent,
    resolve: {
      contentSource: ContentSourceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ContentSources'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ContentSourceUpdateComponent,
    resolve: {
      contentSource: ContentSourceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ContentSources'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ContentSourceUpdateComponent,
    resolve: {
      contentSource: ContentSourceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ContentSources'
    },
    canActivate: [UserRouteAccessService]
  }
];
