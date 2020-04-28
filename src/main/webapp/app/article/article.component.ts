import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFlatRevision } from 'app/entities/ICAMApi/revision/revision.service';
import { IArticle } from 'app/shared/model/ICAMApi/article.model';

@Component({
  selector: 'article',
  templateUrl: 'article.component.html',
  styleUrls: ['./article.scss']
})
export class ArticleComponent implements OnInit {
  article: IArticle | undefined;
  revision: IFlatRevision | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ revision }) => {
      this.revision = revision;

      if (this.revision) {
        this.article = this.revision.article;
      }
      // eslint-disable-next-line no-console
      console.log(this.revision);
    });
  }
}
