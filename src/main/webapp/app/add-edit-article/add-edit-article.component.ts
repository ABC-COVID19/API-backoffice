import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ArticleService } from 'app/entities/ICAMApi/article/article.service';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AutoUnsubscribe } from 'app/shared/decorators/auto-unsubscribe';
import { IArticle } from 'app/shared/model/ICAMApi/article.model';

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
export class AddEditArticleComponent implements OnInit {
  styles = styles;
  REQ_STATUS = REQ_STATUS;
  reqStatus: REQ_STATUS = REQ_STATUS.NONE;
  addArticle$: Subscription = new Subscription();
  editMode = false;
  formChanged = false;
  originalFormValues: IArticle = {};
  articleID = 0;
  form: FormGroup = new FormGroup({
    articleLink: new FormControl('', [Validators.required]),
    articleDate: new FormControl('', [Validators.required]),
    repoKeywords: new FormControl('', [Validators.required]),
    articleJournal: new FormControl('', [Validators.required]),
    articleCitation: new FormControl('', [Validators.required]),
    articleTitle: new FormControl('', [Validators.required]),
    articleAbstract: new FormControl('', [Validators.required])
  });

  constructor(private articleService: ArticleService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ article }) => {
      if (article) {
        const { articleLink, articleDate, repoKeywords, articleJournal, articleCitation, articleTitle, articleAbstract } = article;
        this.originalFormValues = {
          articleLink,
          articleDate,
          repoKeywords,
          articleJournal,
          articleCitation,
          articleTitle,
          articleAbstract
        };
        this.form.patchValue(this.originalFormValues);
        this.editMode = true;
        this.formChanged = false;
        this.articleID = article.id;
      }
    });

    this.form.valueChanges.subscribe(() => {
      this.checkIfFormChanged();
    });
  }

  get controls(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  checkIfFormChanged(): void {
    const formValues = this.form.getRawValue();
    let someValueChanged = false;

    for (const [key, value] of Object.entries(formValues)) {
      if (value !== this.originalFormValues[key]) {
        someValueChanged = true;
      }
    }

    this.formChanged = someValueChanged;
  }

  cancel(): void {
    this.router.navigate(['/backoffice']);
  }

  save(): void {
    if (this.form.valid) {
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
      let call: Observable<any>;

      this.reqStatus = REQ_STATUS.SUBMITTING;

      this.addArticle$.unsubscribe();
      if (this.editMode) {
        call = this.articleService.update({
          articleLink,
          articleDate,
          repoKeywords,
          articleJournal,
          articleCitation,
          articleTitle,
          articleAbstract,
          id: this.articleID
        });
      } else {
        call = this.articleService.addArticleToSpecialSourceRepo({
          articleLink,
          articleDate,
          repoKeywords,
          articleJournal,
          articleCitation,
          articleTitle,
          articleAbstract,
          repoDate: now,
          fetchDate: now
        });
      }
      this.addArticle$ = call.subscribe(
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
