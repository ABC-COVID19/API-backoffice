import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { IcamBackOfficeTestModule } from '../../../../test.module';
import { ContentSourceUpdateComponent } from 'app/entities/ICAMApi/content-source/content-source-update.component';
import { ContentSourceService } from 'app/entities/ICAMApi/content-source/content-source.service';
import { ContentSource } from 'app/shared/model/ICAMApi/content-source.model';

describe('Component Tests', () => {
  describe('ContentSource Management Update Component', () => {
    let comp: ContentSourceUpdateComponent;
    let fixture: ComponentFixture<ContentSourceUpdateComponent>;
    let service: ContentSourceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcamBackOfficeTestModule],
        declarations: [ContentSourceUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ContentSourceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContentSourceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContentSourceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ContentSource(123);
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
        const entity = new ContentSource();
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
