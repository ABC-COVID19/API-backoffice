import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'article-type',
        loadChildren: () => import('./ICAMApi/article-type/article-type.module').then(m => m.IcamApiArticleTypeModule)
      },
      {
        path: 'category-tree',
        loadChildren: () => import('./ICAMApi/category-tree/category-tree.module').then(m => m.IcamApiCategoryTreeModule)
      },
      {
        path: 'source-repo',
        loadChildren: () => import('./ICAMApi/source-repo/source-repo.module').then(m => m.IcamApiSourceRepoModule)
      },
      {
        path: 'revision',
        loadChildren: () => import('./ICAMApi/revision/revision.module').then(m => m.IcamApiRevisionModule)
      },
      {
        path: 'article',
        loadChildren: () => import('./ICAMApi/article/article.module').then(m => m.IcamApiArticleModule)
      },
      {
        path: 'newsletter',
        loadChildren: () => import('./ICAMApi/newsletter/newsletter.module').then(m => m.IcamApiNewsletterModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class IcamBackOfficeEntityModule {}
