import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INewsletter } from 'app/shared/model/ICAMApi/newsletter.model';

type EntityResponseType = HttpResponse<INewsletter>;
type EntityArrayResponseType = HttpResponse<INewsletter[]>;

@Injectable({ providedIn: 'root' })
export class NewsletterService {
  public resourceUrl = SERVER_API_URL + 'services/icamapi/api/newsletters';

  constructor(protected http: HttpClient) {}

  create(newsletter: INewsletter): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(newsletter);
    return this.http
      .post<INewsletter>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(newsletter: INewsletter): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(newsletter);
    return this.http
      .put<INewsletter>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<INewsletter>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<INewsletter[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(newsletter: INewsletter): INewsletter {
    const copy: INewsletter = Object.assign({}, newsletter, {
      registrationDate:
        newsletter.registrationDate && newsletter.registrationDate.isValid() ? newsletter.registrationDate.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.registrationDate = res.body.registrationDate ? moment(res.body.registrationDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((newsletter: INewsletter) => {
        newsletter.registrationDate = newsletter.registrationDate ? moment(newsletter.registrationDate) : undefined;
      });
    }
    return res;
  }
}
