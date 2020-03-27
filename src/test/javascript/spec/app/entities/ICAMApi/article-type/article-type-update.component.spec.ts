import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { IcamBackOfficeTestModule } from '../../../../test.module';
import { ArticleTypeUpdateComponent } from 'app/entities/ICAMApi/article-type/article-type-update.component';
import { ArticleTypeService } from 'app/entities/ICAMApi/article-type/article-type.service';
import { ArticleType } from 'app/shared/model/ICAMApi/article-type.model';

describe('Component Tests', () => {
  describe('ArticleType Management Update Component', () => {
    let comp: ArticleTypeUpdateComponent;
    let fixture: ComponentFixture<ArticleTypeUpdateComponent>;
    let service: ArticleTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcamBackOfficeTestModule],
        declarations: [ArticleTypeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ArticleTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ArticleTypeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ArticleTypeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ArticleType(123);
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
        const entity = new ArticleType();
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
