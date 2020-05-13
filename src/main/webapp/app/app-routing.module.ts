import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute } from './layouts/error/error.route';
// import { SidebarAndContentComponent } from 'app/layouts/sidebar-and-content/sidebar-and-content.component';

const LAYOUT_ROUTES = [...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/backoffice/articles', // routes definidas em backoffice/backoffice.module.ts
        pathMatch: 'full'
      },
      // {
      //   path: '',
      //   children: [
      //     {
      //       path: '',
      //       component: SidebarAndContentComponent,
      //       children: [
      //         {
      //           path: '',
      //           redirectTo: '/search',
      //           pathMatch: 'full'
      //         },
      //         {
      //           path: 'search',
      //           loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
      //         },
      //         {
      //           path: 'about',
      //           loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      //         },
      //         {
      //           path: 'updates',
      //           loadChildren: () => import('./icam-updates/icam-updates.module').then(m => m.IcamUpdatesModule)
      //         },
      //         {
      //           path: 'articles',
      //           loadChildren: () => import('./layouts/top-search/top-search.module').then(m => m.TopSearchModule)
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   path: 'legacy',
      //   children: [
      //     {
      //       path: 'admin',
      //       data: {
      //         authorities: [Authority.ADMIN]
      //       },
      //       canActivate: [UserRouteAccessService],
      //       loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule)
      //     },
      //     {
      //       path: 'account',
      //       loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
      //     }
      //   ]
      // },
      ...LAYOUT_ROUTES
    ])
  ],
  exports: [RouterModule]
})
export class IcamBackOfficeAppRoutingModule {}
