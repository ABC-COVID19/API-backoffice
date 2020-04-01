import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IcamBackOfficeTestModule } from '../../../../test.module';
import { SourceRepoDetailComponent } from 'app/entities/ICAMApi/source-repo/source-repo-detail.component';
import { SourceRepo } from 'app/shared/model/ICAMApi/source-repo.model';

describe('Component Tests', () => {
  describe('SourceRepo Management Detail Component', () => {
    let comp: SourceRepoDetailComponent;
    let fixture: ComponentFixture<SourceRepoDetailComponent>;
    const route = ({ data: of({ sourceRepo: new SourceRepo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcamBackOfficeTestModule],
        declarations: [SourceRepoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SourceRepoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SourceRepoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load sourceRepo on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sourceRepo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
