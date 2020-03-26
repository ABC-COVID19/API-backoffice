import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IcamBackOfficeTestModule } from '../../../../test.module';
import { ContentSourceComponent } from 'app/entities/ICAMApi/content-source/content-source.component';
import { ContentSourceService } from 'app/entities/ICAMApi/content-source/content-source.service';
import { ContentSource } from 'app/shared/model/ICAMApi/content-source.model';

describe('Component Tests', () => {
  describe('ContentSource Management Component', () => {
    let comp: ContentSourceComponent;
    let fixture: ComponentFixture<ContentSourceComponent>;
    let service: ContentSourceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcamBackOfficeTestModule],
        declarations: [ContentSourceComponent]
      })
        .overrideTemplate(ContentSourceComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContentSourceComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContentSourceService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ContentSource(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.contentSources && comp.contentSources[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
