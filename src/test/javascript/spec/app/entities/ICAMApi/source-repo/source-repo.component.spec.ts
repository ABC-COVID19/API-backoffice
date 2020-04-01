import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IcamBackOfficeTestModule } from '../../../../test.module';
import { SourceRepoComponent } from 'app/entities/ICAMApi/source-repo/source-repo.component';
import { SourceRepoService } from 'app/entities/ICAMApi/source-repo/source-repo.service';
import { SourceRepo } from 'app/shared/model/ICAMApi/source-repo.model';

describe('Component Tests', () => {
  describe('SourceRepo Management Component', () => {
    let comp: SourceRepoComponent;
    let fixture: ComponentFixture<SourceRepoComponent>;
    let service: SourceRepoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcamBackOfficeTestModule],
        declarations: [SourceRepoComponent]
      })
        .overrideTemplate(SourceRepoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SourceRepoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SourceRepoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SourceRepo(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.sourceRepos && comp.sourceRepos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
