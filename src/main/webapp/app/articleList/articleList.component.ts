import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../entities/ICAMApi/article/article.service';

@Component({
  selector: 'articleList',
  templateUrl: 'articleList.component.html',
  styleUrls: ['./articleList.scss']
})
export class ArticleListComponent implements OnInit {
  article: any;
  isFetched = false;

  constructor(private articleService: ArticleService) {}

  getArtictlesToReview(): void {
    this.articleService.getArticlesToReview().subscribe(
      res => {
        console.log(res);
        this.article = res[0];
        this.isFetched = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.getArtictlesToReview();
  }
}
