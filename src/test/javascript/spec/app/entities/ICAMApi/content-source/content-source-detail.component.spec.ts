import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IcamBackOfficeTestModule } from '../../../../test.module';
import { ContentSourceDetailComponent } from 'app/entities/ICAMApi/content-source/content-source-detail.component';
import { ContentSource } from 'app/shared/model/ICAMApi/content-source.model';

describe('Component Tests', () => {
  describe('ContentSource Management Detail Component', () => {
    let comp: ContentSourceDetailComponent;
    let fixture: ComponentFixture<ContentSourceDetailComponent>;
    const route = ({ data: of({ contentSource: new ContentSource(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcamBackOfficeTestModule],
        declarations: [ContentSourceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ContentSourceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ContentSourceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load contentSource on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.contentSource).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
