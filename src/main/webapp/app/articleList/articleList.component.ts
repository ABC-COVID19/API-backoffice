import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../entities/ICAMApi/article/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'articleList',
  templateUrl: 'articleList.component.html',
  styleUrls: ['./articleList.scss']
})
export class ArticleListComponent implements OnInit {
  articles: any;
  isFetched = false;

  constructor(private articleService: ArticleService, private router: Router) {}

  getArtictlesToReview(): void {
    this.articleService.getArticlesToReview().subscribe(
      res => {
        this.articles = res;
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

  editArticle(id: number): void {
    if (id >= 0) {
      this.router.navigate(['/backoffice', 'edit-article', id]);
    }
  }

  /*  sortArrayDate(sorting : boolean) : void{
    //false - DESC 
    //true  - ASC

    if(this.isFetched && this.articles){
      this.articles.sort( (arctA : any, arctB : any) =>{
        if(sorting){
          return moment(arctA.articleDate) > moment(arctB.articleDate);
        }
        else{
          return moment(arctA) <= moment(arctB);
        }
      }).slice();
      
    }
  } */
}
