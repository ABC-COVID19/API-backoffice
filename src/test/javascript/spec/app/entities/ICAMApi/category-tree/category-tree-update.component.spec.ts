import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { IcamBackOfficeTestModule } from '../../../../test.module';
import { CategoryTreeUpdateComponent } from 'app/entities/ICAMApi/category-tree/category-tree-update.component';
import { CategoryTreeService } from 'app/entities/ICAMApi/category-tree/category-tree.service';
import { CategoryTree } from 'app/shared/model/ICAMApi/category-tree.model';

describe('Component Tests', () => {
  describe('CategoryTree Management Update Component', () => {
    let comp: CategoryTreeUpdateComponent;
    let fixture: ComponentFixture<CategoryTreeUpdateComponent>;
    let service: CategoryTreeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcamBackOfficeTestModule],
        declarations: [CategoryTreeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CategoryTreeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CategoryTreeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CategoryTreeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CategoryTree(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new CategoryTree();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
