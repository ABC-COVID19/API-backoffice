import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRevision } from 'app/shared/model/ICAMApi/revision.model';
import { flatCategoryTree } from 'app/shared/util/category-util';
import { map, catchError } from 'rxjs/operators';
import { ICategoryTree } from 'app/shared/model/ICAMApi/category-tree.model';

export interface IFlatRevision extends IRevision {
  categories: ICategoryTree[];
  date: string;
  author: string;
  keywordArr: string[];
}

const SUMMARY_TRUNC_LENGTH = 200;

type EntityResponseType = HttpResponse<IRevision>;
type EntityArrayResponseType = HttpResponse<IRevision[]>;

@Injectable({ providedIn: 'root' })
export class RevisionService {
  //public resourceUrl = SERVER_API_URL + 'services/icamapi/api/revisions';
  public resourceUrl = 'https://api.dev.icam.org.pt/services/icamapi/api/revisions';

  constructor(protected http: HttpClient) {}

  static convertToFlatRevision(revision: IRevision, truncateSummary = false): IFlatRevision {
    const ctreeArr: ICategoryTree[] = [];
    let summary: string = revision.summary || '';
    let keywordArr: string[] = [];

    if (revision.ctrees) {
      for (let j = 0; j < revision.ctrees?.length; j++) {
        const ctrees = revision.ctrees[j];
        if (ctrees !== undefined) {
          flatCategoryTree(ctrees, ctreeArr);
        }
      }
    }

    if (revision.keywords && typeof revision.keywords === 'string') {
      keywordArr = revision.keywords.split(';').map(k => k.trim());
    }

    summary = summary.replace(/(?:\r\n|\r|\n|↵)/g, '<br><br>');

    return {
      ...revision,
      summary: truncateSummary ? `${summary.substr(0, SUMMARY_TRUNC_LENGTH)}...` : summary,
      categories: ctreeArr,
      author: revision.article?.articleCitation || '',
      date: revision.article?.articleDate || '',
      keywordArr
    };
  }

  getArticleRevision(articleId: string): Observable<EntityResponseType> {
    return this.http
      .get<EntityResponseType>(`${this.resourceUrl}?id.equals=${articleId}`)
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

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

  getByCategoryID(id: number, truncateSummary = false): Observable<IFlatRevision[]> {
    return this.query({
      'active.equals': true,
      'ctreeId.in': id
    }).pipe(
      map(resp => {
        const body = resp.body || [];
        const returnArr: IFlatRevision[] = [];

        for (let i = 0; i < body.length; i++) {
          const revision = body[i];
          returnArr.push(RevisionService.convertToFlatRevision(revision, truncateSummary));
        }
        return returnArr;
      }),
      catchError(() => [])
    );
  }
}
