import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICategoryTree, CategoryTree } from 'app/shared/model/ICAMApi/category-tree.model';
import { CategoryTreeService } from './category-tree.service';

@Component({
  selector: 'jhi-category-tree-update',
  templateUrl: './category-tree-update.component.html'
})
export class CategoryTreeUpdateComponent implements OnInit {
  isSaving = false;
  categorytrees: ICategoryTree[] = [];

  editForm = this.fb.group({
    id: [],
    itemName: [null, [Validators.required]],
    active: [],
    parent: []
  });

  constructor(protected categoryTreeService: CategoryTreeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ categoryTree }) => {
      this.updateForm(categoryTree);

      this.categoryTreeService.query().subscribe((res: HttpResponse<ICategoryTree[]>) => (this.categorytrees = res.body || []));
    });
  }

  updateForm(categoryTree: ICategoryTree): void {
    this.editForm.patchValue({
      id: categoryTree.id,
      itemName: categoryTree.itemName,
      active: categoryTree.active,
      parent: categoryTree.parent
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const categoryTree = this.createFromForm();
    if (categoryTree.id !== undefined) {
      this.subscribeToSaveResponse(this.categoryTreeService.update(categoryTree));
    } else {
      this.subscribeToSaveResponse(this.categoryTreeService.create(categoryTree));
    }
  }

  private createFromForm(): ICategoryTree {
    return {
      ...new CategoryTree(),
      id: this.editForm.get(['id'])!.value,
      itemName: this.editForm.get(['itemName'])!.value,
      active: this.editForm.get(['active'])!.value,
      parent: this.editForm.get(['parent'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategoryTree>>): void {
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
}
