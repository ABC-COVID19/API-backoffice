import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IcamBackOfficeTestModule } from '../../../../test.module';
import { ArticleTypeComponent } from 'app/entities/ICAMApi/article-type/article-type.component';
import { ArticleTypeService } from 'app/entities/ICAMApi/article-type/article-type.service';
import { ArticleType } from 'app/shared/model/ICAMApi/article-type.model';

describe('Component Tests', () => {
  describe('ArticleType Management Component', () => {
    let comp: ArticleTypeComponent;
    let fixture: ComponentFixture<ArticleTypeComponent>;
    let service: ArticleTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcamBackOfficeTestModule],
        declarations: [ArticleTypeComponent]
      })
        .overrideTemplate(ArticleTypeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ArticleTypeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ArticleTypeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ArticleType(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.articleTypes && comp.articleTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
