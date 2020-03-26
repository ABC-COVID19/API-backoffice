import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IRevision, Revision } from 'app/shared/model/ICAMApi/revision.model';
import { RevisionService } from './revision.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IArticleType } from 'app/shared/model/ICAMApi/article-type.model';
import { ArticleTypeService } from 'app/entities/ICAMApi/article-type/article-type.service';
import { ICategoryTree } from 'app/shared/model/ICAMApi/category-tree.model';
import { CategoryTreeService } from 'app/entities/ICAMApi/category-tree/category-tree.service';
import { IArticle } from 'app/shared/model/ICAMApi/article.model';
import { ArticleService } from 'app/entities/ICAMApi/article/article.service';

type SelectableEntity = IArticleType | ICategoryTree | IArticle;

@Component({
  selector: 'jhi-revision-update',
  templateUrl: './revision-update.component.html'
})
export class RevisionUpdateComponent implements OnInit {
  isSaving = false;
  articletypes: IArticleType[] = [];
  categorytrees: ICategoryTree[] = [];
  articles: IArticle[] = [];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    summary: [null, [Validators.required]],
    reviewer: [null, [Validators.required]],
    active: [null, [Validators.required]],
    keywords: [],
    reviewState: [null, [Validators.required]],
    returnNotes: [],
    reviewedByPeer: [null, [Validators.required]],
    communityVotes: [],
    atype: [],
    ctree: [],
    article: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected revisionService: RevisionService,
    protected articleTypeService: ArticleTypeService,
    protected categoryTreeService: CategoryTreeService,
    protected articleService: ArticleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ revision }) => {
      this.updateForm(revision);

      this.articleTypeService.query().subscribe((res: HttpResponse<IArticleType[]>) => (this.articletypes = res.body || []));

      this.categoryTreeService.query().subscribe((res: HttpResponse<ICategoryTree[]>) => (this.categorytrees = res.body || []));

      this.articleService.query().subscribe((res: HttpResponse<IArticle[]>) => (this.articles = res.body || []));
    });
  }

  updateForm(revision: IRevision): void {
    this.editForm.patchValue({
      id: revision.id,
      title: revision.title,
      summary: revision.summary,
      reviewer: revision.reviewer,
      active: revision.active,
      keywords: revision.keywords,
      reviewState: revision.reviewState,
      returnNotes: revision.returnNotes,
      reviewedByPeer: revision.reviewedByPeer,
      communityVotes: revision.communityVotes,
      atype: revision.atype,
      ctree: revision.ctree,
      article: revision.article
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
    const revision = this.createFromForm();
    if (revision.id !== undefined) {
      this.subscribeToSaveResponse(this.revisionService.update(revision));
    } else {
      this.subscribeToSaveResponse(this.revisionService.create(revision));
    }
  }

  private createFromForm(): IRevision {
    return {
      ...new Revision(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      summary: this.editForm.get(['summary'])!.value,
      reviewer: this.editForm.get(['reviewer'])!.value,
      active: this.editForm.get(['active'])!.value,
      keywords: this.editForm.get(['keywords'])!.value,
      reviewState: this.editForm.get(['reviewState'])!.value,
      returnNotes: this.editForm.get(['returnNotes'])!.value,
      reviewedByPeer: this.editForm.get(['reviewedByPeer'])!.value,
      communityVotes: this.editForm.get(['communityVotes'])!.value,
      atype: this.editForm.get(['atype'])!.value,
      ctree: this.editForm.get(['ctree'])!.value,
      article: this.editForm.get(['article'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRevision>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
