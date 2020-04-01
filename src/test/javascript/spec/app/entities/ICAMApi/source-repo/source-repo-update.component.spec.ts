import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { IcamBackOfficeTestModule } from '../../../../test.module';
import { SourceRepoUpdateComponent } from 'app/entities/ICAMApi/source-repo/source-repo-update.component';
import { SourceRepoService } from 'app/entities/ICAMApi/source-repo/source-repo.service';
import { SourceRepo } from 'app/shared/model/ICAMApi/source-repo.model';

describe('Component Tests', () => {
  describe('SourceRepo Management Update Component', () => {
    let comp: SourceRepoUpdateComponent;
    let fixture: ComponentFixture<SourceRepoUpdateComponent>;
    let service: SourceRepoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcamBackOfficeTestModule],
        declarations: [SourceRepoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SourceRepoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SourceRepoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SourceRepoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SourceRepo(123);
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
        const entity = new SourceRepo();
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
