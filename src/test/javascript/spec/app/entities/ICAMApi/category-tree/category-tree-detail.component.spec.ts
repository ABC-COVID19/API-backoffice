import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IcamBackOfficeTestModule } from '../../../../test.module';
import { CategoryTreeDetailComponent } from 'app/entities/ICAMApi/category-tree/category-tree-detail.component';
import { CategoryTree } from 'app/shared/model/ICAMApi/category-tree.model';

describe('Component Tests', () => {
  describe('CategoryTree Management Detail Component', () => {
    let comp: CategoryTreeDetailComponent;
    let fixture: ComponentFixture<CategoryTreeDetailComponent>;
    const route = ({ data: of({ categoryTree: new CategoryTree(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcamBackOfficeTestModule],
        declarations: [CategoryTreeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CategoryTreeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CategoryTreeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load categoryTree on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.categoryTree).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
