import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ArticleService } from 'app/entities/ICAMApi/article/article.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'app/shared/decorators/auto-unsubscribe';

const styles = require('!!style-loader!css-loader!sass-loader!../../content/scss/global-variables.scss');

enum REQ_STATUS {
  NONE,
  SUBMITTING,
  ERROR
}
@Component({
  selector: 'add-edit-article',
  templateUrl: 'add-edit-article.component.html',
  styleUrls: ['./add-edit-article.scss']
})
@AutoUnsubscribe()
export class AddEditArticleComponent {
  styles = styles;
  REQ_STATUS = REQ_STATUS;
  reqStatus: REQ_STATUS = REQ_STATUS.NONE;
  addArticle$: Subscription = new Subscription();
  form: FormGroup = new FormGroup({
    articleLink: new FormControl('', [Validators.required]),
    articleDate: new FormControl('', [Validators.required]),
    repoKeywords: new FormControl('', [Validators.required]),
    articleJournal: new FormControl('', [Validators.required]),
    articleCitation: new FormControl('', [Validators.required]),
    articleTitle: new FormControl('', [Validators.required]),
    articleAbstract: new FormControl('', [Validators.required])
  });

  constructor(private articleService: ArticleService, private router: Router) {}

  get controls(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  cancel(): void {
    this.router.navigate(['/backoffice']);
  }

  save(): void {
    if (this.form.valid) {
      this.addArticle$.unsubscribe();
      const now = moment.utc();
      const {
        articleLink,
        articleDate,
        repoKeywords,
        articleJournal,
        articleCitation,
        articleTitle,
        articleAbstract
      } = this.form.getRawValue();

      this.reqStatus = REQ_STATUS.SUBMITTING;
      this.addArticle$ = this.articleService
        .addArticleToSpecialSourceRepo({
          articleLink,
          articleDate,
          repoKeywords,
          articleJournal,
          articleCitation,
          articleTitle,
          articleAbstract,
          repoDate: now,
          fetchDate: now
        })
        .subscribe(
          () => {
            this.reqStatus = REQ_STATUS.NONE;
            this.router.navigate(['/backoffice']);
          },
          () => {
            this.reqStatus = REQ_STATUS.ERROR;
          }
        );
    }
  }
}
