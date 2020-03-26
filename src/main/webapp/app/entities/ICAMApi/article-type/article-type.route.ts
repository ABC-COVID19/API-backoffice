import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IArticleType, ArticleType } from 'app/shared/model/ICAMApi/article-type.model';
import { ArticleTypeService } from './article-type.service';
import { ArticleTypeComponent } from './article-type.component';
import { ArticleTypeDetailComponent } from './article-type-detail.component';
import { ArticleTypeUpdateComponent } from './article-type-update.component';

@Injectable({ providedIn: 'root' })
export class ArticleTypeResolve implements Resolve<IArticleType> {
  constructor(private service: ArticleTypeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IArticleType> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((articleType: HttpResponse<ArticleType>) => {
          if (articleType.body) {
            return of(articleType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ArticleType());
  }
}

export const articleTypeRoute: Routes = [
  {
    path: '',
    component: ArticleTypeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ArticleTypes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ArticleTypeDetailComponent,
    resolve: {
      articleType: ArticleTypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ArticleTypes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ArticleTypeUpdateComponent,
    resolve: {
      articleType: ArticleTypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ArticleTypes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ArticleTypeUpdateComponent,
    resolve: {
      articleType: ArticleTypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ArticleTypes'
    },
    canActivate: [UserRouteAccessService]
  }
];
