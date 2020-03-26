import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPublicationSource, PublicationSource } from 'app/shared/model/ICAMApi/publication-source.model';
import { PublicationSourceService } from './publication-source.service';
import { PublicationSourceComponent } from './publication-source.component';
import { PublicationSourceDetailComponent } from './publication-source-detail.component';
import { PublicationSourceUpdateComponent } from './publication-source-update.component';

@Injectable({ providedIn: 'root' })
export class PublicationSourceResolve implements Resolve<IPublicationSource> {
  constructor(private service: PublicationSourceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPublicationSource> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((publicationSource: HttpResponse<PublicationSource>) => {
          if (publicationSource.body) {
            return of(publicationSource.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PublicationSource());
  }
}

export const publicationSourceRoute: Routes = [
  {
    path: '',
    component: PublicationSourceComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PublicationSources'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PublicationSourceDetailComponent,
    resolve: {
      publicationSource: PublicationSourceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PublicationSources'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PublicationSourceUpdateComponent,
    resolve: {
      publicationSource: PublicationSourceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PublicationSources'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PublicationSourceUpdateComponent,
    resolve: {
      publicationSource: PublicationSourceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PublicationSources'
    },
    canActivate: [UserRouteAccessService]
  }
];
