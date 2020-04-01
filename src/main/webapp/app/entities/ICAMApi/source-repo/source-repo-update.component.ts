import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISourceRepo, SourceRepo } from 'app/shared/model/ICAMApi/source-repo.model';
import { SourceRepoService } from './source-repo.service';

@Component({
  selector: 'jhi-source-repo-update',
  templateUrl: './source-repo-update.component.html'
})
export class SourceRepoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    itemName: [null, [Validators.required]],
    active: []
  });

  constructor(protected sourceRepoService: SourceRepoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sourceRepo }) => {
      this.updateForm(sourceRepo);
    });
  }

  updateForm(sourceRepo: ISourceRepo): void {
    this.editForm.patchValue({
      id: sourceRepo.id,
      itemName: sourceRepo.itemName,
      active: sourceRepo.active
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sourceRepo = this.createFromForm();
    if (sourceRepo.id !== undefined) {
      this.subscribeToSaveResponse(this.sourceRepoService.update(sourceRepo));
    } else {
      this.subscribeToSaveResponse(this.sourceRepoService.create(sourceRepo));
    }
  }

  private createFromForm(): ISourceRepo {
    return {
      ...new SourceRepo(),
      id: this.editForm.get(['id'])!.value,
      itemName: this.editForm.get(['itemName'])!.value,
      active: this.editForm.get(['active'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISourceRepo>>): void {
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
