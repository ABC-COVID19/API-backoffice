import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute } from './layouts/error/error.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { Authority } from 'app/shared/constants/authority.constants';

import { SidebarAndContentComponent } from 'app/layouts/sidebar-and-content/sidebar-and-content.component';
import { TopNavbarAndContentComponent } from 'app/layouts/topnavbar-and-content/topnavbar-and-content.component';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

const LAYOUT_ROUTES = [...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          children: [
            {
              path: '',
              component: SidebarAndContentComponent,
              children: [
                {
                  path: '',
                  redirectTo: '/search',
                  pathMatch: 'full'
                },
                {
                  path: 'search',
                  loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
                },
                {
                  path: 'about',
                  loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
                },
                {
                  path: 'updates',
                  loadChildren: () => import('./icam-updates/icam-updates.module').then(m => m.IcamUpdatesModule)
                },
                {
                  path: 'articles',
                  loadChildren: () => import('./layouts/top-search/top-search.module').then(m => m.TopSearchModule)
                }
              ]
            }
          ]
        },
        {
          path: 'backoffice',
          component: TopNavbarAndContentComponent,
          children: [
            {
              path: 'articleList',
              loadChildren: () => import('app/articleList/articleList.module').then(m => m.ArticleListModule)
            },
            {
              path: 'reviewArticle',
              loadChildren: () => import('app/reviewArticle/reviewArticle.module').then(m => m.ReviewArticleModule)
            }
          ]
        },
        {
          path: 'legacy',
          children: [
            {
              path: 'admin',
              data: {
                authorities: [Authority.ADMIN]
              },
              canActivate: [UserRouteAccessService],
              loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule)
            },
            {
              path: 'account',
              loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
            }
          ]
        },
        ...LAYOUT_ROUTES
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    )
  ],
  exports: [RouterModule]
})
export class IcamBackOfficeAppRoutingModule {}
