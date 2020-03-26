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
import { IContentSource } from 'app/shared/model/ICAMApi/content-source.model';
import { ContentSourceService } from 'app/entities/ICAMApi/content-source/content-source.service';

@Component({
  selector: 'jhi-article-update',
  templateUrl: './article-update.component.html'
})
export class ArticleUpdateComponent implements OnInit {
  isSaving = false;
  contentsources: IContentSource[] = [];
  sourceDateDp: any;
  pubmedDateDp: any;
  officialPubDateDp: any;

  editForm = this.fb.group({
    id: [],
    sourceID: [null, [Validators.required]],
    sourceDate: [null, [Validators.required]],
    sourceTitle: [],
    sourceAbstract: [],
    pubmedDate: [],
    officialPubDate: [],
    doi: [],
    journal: [],
    citation: [],
    keywords: [],
    reviewState: [null, [Validators.required]],
    cntsource: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected articleService: ArticleService,
    protected contentSourceService: ContentSourceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ article }) => {
      this.updateForm(article);

      this.contentSourceService.query().subscribe((res: HttpResponse<IContentSource[]>) => (this.contentsources = res.body || []));
    });
  }

  updateForm(article: IArticle): void {
    this.editForm.patchValue({
      id: article.id,
      sourceID: article.sourceID,
      sourceDate: article.sourceDate,
      sourceTitle: article.sourceTitle,
      sourceAbstract: article.sourceAbstract,
      pubmedDate: article.pubmedDate,
      officialPubDate: article.officialPubDate,
      doi: article.doi,
      journal: article.journal,
      citation: article.citation,
      keywords: article.keywords,
      reviewState: article.reviewState,
      cntsource: article.cntsource
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
      sourceID: this.editForm.get(['sourceID'])!.value,
      sourceDate: this.editForm.get(['sourceDate'])!.value,
      sourceTitle: this.editForm.get(['sourceTitle'])!.value,
      sourceAbstract: this.editForm.get(['sourceAbstract'])!.value,
      pubmedDate: this.editForm.get(['pubmedDate'])!.value,
      officialPubDate: this.editForm.get(['officialPubDate'])!.value,
      doi: this.editForm.get(['doi'])!.value,
      journal: this.editForm.get(['journal'])!.value,
      citation: this.editForm.get(['citation'])!.value,
      keywords: this.editForm.get(['keywords'])!.value,
      reviewState: this.editForm.get(['reviewState'])!.value,
      cntsource: this.editForm.get(['cntsource'])!.value
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

  trackById(index: number, item: IContentSource): any {
    return item.id;
  }
}
