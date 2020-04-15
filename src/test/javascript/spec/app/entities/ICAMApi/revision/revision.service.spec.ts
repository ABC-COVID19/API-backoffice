import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { RevisionService } from 'app/entities/ICAMApi/revision/revision.service';
import { IRevision, Revision } from 'app/shared/model/ICAMApi/revision.model';
import { ReviewState } from 'app/shared/model/enumerations/review-state.model';

describe('Service Tests', () => {
  describe('Revision Service', () => {
    let injector: TestBed;
    let service: RevisionService;
    let httpMock: HttpTestingController;
    let elemDefault: IRevision;
    let expectedResult: IRevision | IRevision[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(RevisionService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Revision(
        0,
        'AAAAAAA',
        'AAAAAAA',
        false,
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        ReviewState.Hold
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            reviewDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Revision', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            reviewDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            reviewDate: currentDate
          },
          returnedFromService
        );

        service.create(new Revision()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Revision', () => {
        const returnedFromService = Object.assign(
          {
            title: 'BBBBBB',
            summary: 'BBBBBB',
            isPeerReviewed: true,
            country: 'BBBBBB',
            keywords: 'BBBBBB',
            reviewDate: currentDate.format(DATE_FORMAT),
            reviewNotes: 'BBBBBB',
            author: 'BBBBBB',
            reviewer: 'BBBBBB',
            reviewState: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            reviewDate: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Revision', () => {
        const returnedFromService = Object.assign(
          {
            title: 'BBBBBB',
            summary: 'BBBBBB',
            isPeerReviewed: true,
            country: 'BBBBBB',
            keywords: 'BBBBBB',
            reviewDate: currentDate.format(DATE_FORMAT),
            reviewNotes: 'BBBBBB',
            author: 'BBBBBB',
            reviewer: 'BBBBBB',
            reviewState: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            reviewDate: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Revision', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
