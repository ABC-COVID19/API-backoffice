import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopNavbarAndContentComponent } from './topnavbar-and-content/topnavbar-and-content.component';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Authority } from 'app/shared/constants/authority.constants';
import { TopNavbarAndContentModule } from './topnavbar-and-content/topnavbar-and-content.module';

@NgModule({
  imports: [
    TopNavbarAndContentModule,
    RouterModule.forChild([
      {
        path: 'backoffice',
        component: TopNavbarAndContentComponent,
        canActivate: [UserRouteAccessService],
        data: {
          authorities: [Authority.USER]
        },
        children: [
          {
            path: '',
            redirectTo: '/backoffice/articles',
            pathMatch: 'full'
          },
          {
            path: 'articles',
            loadChildren: () => import('app/backoffice/article/article.module').then(m => m.ArticleModule)
          }
        ]
      }
    ])
  ]
})
export class BackofficeModule {}
