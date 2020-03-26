import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IcamBackOfficeTestModule } from '../../../../test.module';
import { PublicationSourceDetailComponent } from 'app/entities/ICAMApi/publication-source/publication-source-detail.component';
import { PublicationSource } from 'app/shared/model/ICAMApi/publication-source.model';

describe('Component Tests', () => {
  describe('PublicationSource Management Detail Component', () => {
    let comp: PublicationSourceDetailComponent;
    let fixture: ComponentFixture<PublicationSourceDetailComponent>;
    const route = ({ data: of({ publicationSource: new PublicationSource(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcamBackOfficeTestModule],
        declarations: [PublicationSourceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PublicationSourceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PublicationSourceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load publicationSource on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.publicationSource).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
