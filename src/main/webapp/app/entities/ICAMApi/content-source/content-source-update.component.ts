import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IContentSource, ContentSource } from 'app/shared/model/ICAMApi/content-source.model';
import { ContentSourceService } from './content-source.service';

@Component({
  selector: 'jhi-content-source-update',
  templateUrl: './content-source-update.component.html'
})
export class ContentSourceUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    itemName: [null, [Validators.required]],
    active: []
  });

  constructor(protected contentSourceService: ContentSourceService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contentSource }) => {
      this.updateForm(contentSource);
    });
  }

  updateForm(contentSource: IContentSource): void {
    this.editForm.patchValue({
      id: contentSource.id,
      itemName: contentSource.itemName,
      active: contentSource.active
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const contentSource = this.createFromForm();
    if (contentSource.id !== undefined) {
      this.subscribeToSaveResponse(this.contentSourceService.update(contentSource));
    } else {
      this.subscribeToSaveResponse(this.contentSourceService.create(contentSource));
    }
  }

  private createFromForm(): IContentSource {
    return {
      ...new ContentSource(),
      id: this.editForm.get(['id'])!.value,
      itemName: this.editForm.get(['itemName'])!.value,
      active: this.editForm.get(['active'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContentSource>>): void {
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
