import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICategoryTree, CategoryTree } from 'app/shared/model/ICAMApi/category-tree.model';
import { CategoryTreeService } from './category-tree.service';
import { CategoryTreeComponent } from './category-tree.component';
import { CategoryTreeDetailComponent } from './category-tree-detail.component';
import { CategoryTreeUpdateComponent } from './category-tree-update.component';

@Injectable({ providedIn: 'root' })
export class CategoryTreeResolve implements Resolve<ICategoryTree> {
  constructor(private service: CategoryTreeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICategoryTree> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((categoryTree: HttpResponse<CategoryTree>) => {
          if (categoryTree.body) {
            return of(categoryTree.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CategoryTree());
  }
}

export const categoryTreeRoute: Routes = [
  {
    path: '',
    component: CategoryTreeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'CategoryTrees'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CategoryTreeDetailComponent,
    resolve: {
      categoryTree: CategoryTreeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'CategoryTrees'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CategoryTreeUpdateComponent,
    resolve: {
      categoryTree: CategoryTreeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'CategoryTrees'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CategoryTreeUpdateComponent,
    resolve: {
      categoryTree: CategoryTreeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'CategoryTrees'
    },
    canActivate: [UserRouteAccessService]
  }
];
