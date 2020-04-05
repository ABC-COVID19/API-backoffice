import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IcamBackOfficeTestModule } from '../../../../test.module';
import { CategoryTreeComponent } from 'app/entities/ICAMApi/category-tree/category-tree.component';
import { CategoryTreeService } from 'app/entities/ICAMApi/category-tree/category-tree.service';
import { CategoryTree } from 'app/shared/model/ICAMApi/category-tree.model';

describe('Component Tests', () => {
  describe('CategoryTree Management Component', () => {
    let comp: CategoryTreeComponent;
    let fixture: ComponentFixture<CategoryTreeComponent>;
    let service: CategoryTreeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcamBackOfficeTestModule],
        declarations: [CategoryTreeComponent]
      })
        .overrideTemplate(CategoryTreeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CategoryTreeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CategoryTreeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CategoryTree(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.categoryTrees && comp.categoryTrees[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
