import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { INewsletter, Newsletter } from 'app/shared/model/ICAMApi/newsletter.model';
import { NewsletterService } from './newsletter.service';
import { NewsletterComponent } from './newsletter.component';
import { NewsletterDetailComponent } from './newsletter-detail.component';
import { NewsletterUpdateComponent } from './newsletter-update.component';

@Injectable({ providedIn: 'root' })
export class NewsletterResolve implements Resolve<INewsletter> {
  constructor(private service: NewsletterService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INewsletter> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((newsletter: HttpResponse<Newsletter>) => {
          if (newsletter.body) {
            return of(newsletter.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Newsletter());
  }
}

export const newsletterRoute: Routes = [
  {
    path: '',
    component: NewsletterComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'Newsletters'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: NewsletterDetailComponent,
    resolve: {
      newsletter: NewsletterResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Newsletters'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: NewsletterUpdateComponent,
    resolve: {
      newsletter: NewsletterResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Newsletters'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: NewsletterUpdateComponent,
    resolve: {
      newsletter: NewsletterResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Newsletters'
    },
    canActivate: [UserRouteAccessService]
  }
];
