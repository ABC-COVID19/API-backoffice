import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { INewsletter, Newsletter } from 'app/shared/model/ICAMApi/newsletter.model';
import { NewsletterService } from './newsletter.service';
import { ICategoryTree } from 'app/shared/model/ICAMApi/category-tree.model';
import { CategoryTreeService } from 'app/entities/ICAMApi/category-tree/category-tree.service';

@Component({
  selector: 'jhi-newsletter-update',
  templateUrl: './newsletter-update.component.html'
})
export class NewsletterUpdateComponent implements OnInit {
  isSaving = false;
  categorytrees: ICategoryTree[] = [];
  registrationDateDp: any;

  editForm = this.fb.group({
    id: [],
    name: [],
    email: [],
    registrationDate: [],
    rgpdAuth: [],
    categoryTrees: []
  });

  constructor(
    protected newsletterService: NewsletterService,
    protected categoryTreeService: CategoryTreeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ newsletter }) => {
      this.updateForm(newsletter);

      this.categoryTreeService.query().subscribe((res: HttpResponse<ICategoryTree[]>) => (this.categorytrees = res.body || []));
    });
  }

  updateForm(newsletter: INewsletter): void {
    this.editForm.patchValue({
      id: newsletter.id,
      name: newsletter.name,
      email: newsletter.email,
      registrationDate: newsletter.registrationDate,
      rgpdAuth: newsletter.rgpdAuth,
      categoryTrees: newsletter.categoryTrees
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const newsletter = this.createFromForm();
    if (newsletter.id !== undefined) {
      this.subscribeToSaveResponse(this.newsletterService.update(newsletter));
    } else {
      this.subscribeToSaveResponse(this.newsletterService.create(newsletter));
    }
  }

  private createFromForm(): INewsletter {
    return {
      ...new Newsletter(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      email: this.editForm.get(['email'])!.value,
      registrationDate: this.editForm.get(['registrationDate'])!.value,
      rgpdAuth: this.editForm.get(['rgpdAuth'])!.value,
      categoryTrees: this.editForm.get(['categoryTrees'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INewsletter>>): void {
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

  trackById(index: number, item: ICategoryTree): any {
    return item.id;
  }

  getSelected(selectedVals: ICategoryTree[], option: ICategoryTree): ICategoryTree {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
