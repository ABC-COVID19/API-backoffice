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
import { IPublicationSource } from 'app/shared/model/ICAMApi/publication-source.model';
import { PublicationSourceService } from 'app/entities/ICAMApi/publication-source/publication-source.service';

@Component({
  selector: 'jhi-article-update',
  templateUrl: './article-update.component.html'
})
export class ArticleUpdateComponent implements OnInit {
  isSaving = false;
  publicationsources: IPublicationSource[] = [];
  sourceDateDp: any;
  importDateDp: any;

  editForm = this.fb.group({
    id: [],
    fetchedFrom: [],
    sourceID: [],
    sourceDate: [],
    sourceTitle: [],
    sourceAbstract: [],
    importDate: [],
    outboundLink: [],
    keywords: [],
    reviewState: [],
    pubName: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected articleService: ArticleService,
    protected publicationSourceService: PublicationSourceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ article }) => {
      this.updateForm(article);

      this.publicationSourceService
        .query()
        .subscribe((res: HttpResponse<IPublicationSource[]>) => (this.publicationsources = res.body || []));
    });
  }

  updateForm(article: IArticle): void {
    this.editForm.patchValue({
      id: article.id,
      fetchedFrom: article.fetchedFrom,
      sourceID: article.sourceID,
      sourceDate: article.sourceDate,
      sourceTitle: article.sourceTitle,
      sourceAbstract: article.sourceAbstract,
      importDate: article.importDate,
      outboundLink: article.outboundLink,
      keywords: article.keywords,
      reviewState: article.reviewState,
      pubName: article.pubName
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
      fetchedFrom: this.editForm.get(['fetchedFrom'])!.value,
      sourceID: this.editForm.get(['sourceID'])!.value,
      sourceDate: this.editForm.get(['sourceDate'])!.value,
      sourceTitle: this.editForm.get(['sourceTitle'])!.value,
      sourceAbstract: this.editForm.get(['sourceAbstract'])!.value,
      importDate: this.editForm.get(['importDate'])!.value,
      outboundLink: this.editForm.get(['outboundLink'])!.value,
      keywords: this.editForm.get(['keywords'])!.value,
      reviewState: this.editForm.get(['reviewState'])!.value,
      pubName: this.editForm.get(['pubName'])!.value
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

  trackById(index: number, item: IPublicationSource): any {
    return item.id;
  }
}
