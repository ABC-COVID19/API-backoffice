import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IArticle, Article } from 'app/shared/model/ICAMApi/article.model';
import { ArticleService } from './article.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { ISourceRepo } from 'app/shared/model/ICAMApi/source-repo.model';
import { SourceRepoService } from 'app/entities/ICAMApi/source-repo/source-repo.service';

@Component({
  selector: 'jhi-article-update',
  templateUrl: './article-update.component.html'
})
export class ArticleUpdateComponent implements OnInit {
  isSaving = false;
  sourcerepos: ISourceRepo[] = [];
  repoDateDp: any;
  fetchDateDp: any;

  editForm = this.fb.group({
    id: [],
    repoArticleId: [],
    repoDate: [],
    repoKeywords: [],
    articleDate: [],
    articleTitle: [],
    articleAbstract: [],
    articleLink: [],
    articleJournal: [],
    articleCitation: [],
    fetchDate: [],
    srepo: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected articleService: ArticleService,
    protected sourceRepoService: SourceRepoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ article }) => {
      this.updateForm(article);

      this.sourceRepoService.query().subscribe((res: HttpResponse<ISourceRepo[]>) => (this.sourcerepos = res.body || []));
    });
  }

  updateForm(article: IArticle): void {
    this.editForm.patchValue({
      id: article.id,
      repoArticleId: article.repoArticleId,
      repoDate: article.repoDate,
      repoKeywords: article.repoKeywords,
      articleDate: article.articleDate,
      articleTitle: article.articleTitle,
      articleAbstract: article.articleAbstract,
      articleLink: article.articleLink,
      articleJournal: article.articleJournal,
      articleCitation: article.articleCitation,
      fetchDate: article.fetchDate,
      srepo: article.srepo
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('icamBackOfficeApp.error', { message: err.message })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const article = this.createFromForm();
    if (article.id !== undefined) {
      this.subscribeToSaveResponse(this.articleService.update(article));
    } else {
      this.subscribeToSaveResponse(this.articleService.create(article));
    }
  }

  private createFromForm(): IArticle {
    return {
      ...new Article(),
      id: this.editForm.get(['id'])!.value,
      repoArticleId: this.editForm.get(['repoArticleId'])!.value,
      repoDate: this.editForm.get(['repoDate'])!.value,
      repoKeywords: this.editForm.get(['repoKeywords'])!.value,
      articleDate: this.editForm.get(['articleDate'])!.value,
      articleTitle: this.editForm.get(['articleTitle'])!.value,
      articleAbstract: this.editForm.get(['articleAbstract'])!.value,
      articleLink: this.editForm.get(['articleLink'])!.value,
      articleJournal: this.editForm.get(['articleJournal'])!.value,
      articleCitation: this.editForm.get(['articleCitation'])!.value,
      fetchDate: this.editForm.get(['fetchDate'])!.value,
      srepo: this.editForm.get(['srepo'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IArticle>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ISourceRepo): any {
    return item.id;
  }
}
