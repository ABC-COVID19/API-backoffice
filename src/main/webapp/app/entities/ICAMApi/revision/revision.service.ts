import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRevision } from 'app/shared/model/ICAMApi/revision.model';

type EntityResponseType = HttpResponse<IRevision>;
type EntityArrayResponseType = HttpResponse<IRevision[]>;

@Injectable({ providedIn: 'root' })
export class RevisionService {
  public resourceUrl = SERVER_API_URL + 'services/icamapi/api/revisions';

  constructor(protected http: HttpClient) {}

  create(revision: IRevision): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(revision);
    return this.http
      .post<IRevision>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(revision: IRevision): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(revision);
    return this.http
      .put<IRevision>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRevision>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRevision[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(revision: IRevision): IRevision {
    const copy: IRevision = Object.assign({}, revision, {
      reviewDate: revision.reviewDate && revision.reviewDate.isValid() ? revision.reviewDate.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.reviewDate = res.body.reviewDate ? moment(res.body.reviewDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((revision: IRevision) => {
        revision.reviewDate = revision.reviewDate ? moment(revision.reviewDate) : undefined;
      });
    }
    return res;
  }
}
