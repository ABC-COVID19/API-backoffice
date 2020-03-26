import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { IcamBackOfficeTestModule } from '../../../../test.module';
import { PublicationSourceUpdateComponent } from 'app/entities/ICAMApi/publication-source/publication-source-update.component';
import { PublicationSourceService } from 'app/entities/ICAMApi/publication-source/publication-source.service';
import { PublicationSource } from 'app/shared/model/ICAMApi/publication-source.model';

describe('Component Tests', () => {
  describe('PublicationSource Management Update Component', () => {
    let comp: PublicationSourceUpdateComponent;
    let fixture: ComponentFixture<PublicationSourceUpdateComponent>;
    let service: PublicationSourceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcamBackOfficeTestModule],
        declarations: [PublicationSourceUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PublicationSourceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PublicationSourceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PublicationSourceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PublicationSource(123);
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
        const entity = new PublicationSource();
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
