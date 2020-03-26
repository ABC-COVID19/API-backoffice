import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { NewsletterService } from 'app/entities/ICAMApi/newsletter/newsletter.service';
import { INewsletter, Newsletter } from 'app/shared/model/ICAMApi/newsletter.model';

describe('Service Tests', () => {
  describe('Newsletter Service', () => {
    let injector: TestBed;
    let service: NewsletterService;
    let httpMock: HttpTestingController;
    let elemDefault: INewsletter;
    let expectedResult: INewsletter | INewsletter[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(NewsletterService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Newsletter(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate, false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            registrationDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Newsletter', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            registrationDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            registrationDate: currentDate
          },
          returnedFromService
        );

        service.create(new Newsletter()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Newsletter', () => {
        const returnedFromService = Object.assign(
          {
            firstName: 'BBBBBB',
            lastName: 'BBBBBB',
            email: 'BBBBBB',
            registrationDate: currentDate.format(DATE_FORMAT),
            rgpdAuth: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            registrationDate: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Newsletter', () => {
        const returnedFromService = Object.assign(
          {
            firstName: 'BBBBBB',
            lastName: 'BBBBBB',
            email: 'BBBBBB',
            registrationDate: currentDate.format(DATE_FORMAT),
            rgpdAuth: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            registrationDate: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Newsletter', () => {
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
