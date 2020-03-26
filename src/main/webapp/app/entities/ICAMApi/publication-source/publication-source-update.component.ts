import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPublicationSource, PublicationSource } from 'app/shared/model/ICAMApi/publication-source.model';
import { PublicationSourceService } from './publication-source.service';

@Component({
  selector: 'jhi-publication-source-update',
  templateUrl: './publication-source-update.component.html'
})
export class PublicationSourceUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    sourceName: [],
    active: []
  });

  constructor(
    protected publicationSourceService: PublicationSourceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ publicationSource }) => {
      this.updateForm(publicationSource);
    });
  }

  updateForm(publicationSource: IPublicationSource): void {
    this.editForm.patchValue({
      id: publicationSource.id,
      sourceName: publicationSource.sourceName,
      active: publicationSource.active
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const publicationSource = this.createFromForm();
    if (publicationSource.id !== undefined) {
      this.subscribeToSaveResponse(this.publicationSourceService.update(publicationSource));
    } else {
      this.subscribeToSaveResponse(this.publicationSourceService.create(publicationSource));
    }
  }

  private createFromForm(): IPublicationSource {
    return {
      ...new PublicationSource(),
      id: this.editForm.get(['id'])!.value,
      sourceName: this.editForm.get(['sourceName'])!.value,
      active: this.editForm.get(['active'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPublicationSource>>): void {
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
