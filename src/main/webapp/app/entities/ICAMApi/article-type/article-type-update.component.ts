import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IArticleType, ArticleType } from 'app/shared/model/ICAMApi/article-type.model';
import { ArticleTypeService } from './article-type.service';

@Component({
  selector: 'jhi-article-type-update',
  templateUrl: './article-type-update.component.html'
})
export class ArticleTypeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    active: []
  });

  constructor(protected articleTypeService: ArticleTypeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ articleType }) => {
      this.updateForm(articleType);
    });
  }

  updateForm(articleType: IArticleType): void {
    this.editForm.patchValue({
      id: articleType.id,
      name: articleType.name,
      active: articleType.active
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const articleType = this.createFromForm();
    if (articleType.id !== undefined) {
      this.subscribeToSaveResponse(this.articleTypeService.update(articleType));
    } else {
      this.subscribeToSaveResponse(this.articleTypeService.create(articleType));
    }
  }

  private createFromForm(): IArticleType {
    return {
      ...new ArticleType(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      active: this.editForm.get(['active'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IArticleType>>): void {
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
}
