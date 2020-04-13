import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}

const SUMMARY_TRUNC_LENGTH = 200;

type EntityResponseType = HttpResponse<IRevision>;
type EntityArrayResponseType = HttpResponse<IRevision[]>;

@Injectable({ providedIn: 'root' })
export class RevisionService {
  public resourceUrl = SERVER_API_URL + 'services/icamapi/api/revisions';

  constructor(protected http: HttpClient) {}

  create(revision: IRevision): Observable<EntityResponseType> {
    return this.http.post<IRevision>(this.resourceUrl, revision, { observe: 'response' });
  }

  update(revision: IRevision): Observable<EntityResponseType> {
    return this.http.put<IRevision>(this.resourceUrl, revision, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRevision>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRevision[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getByCategoryID(id: number, truncateSummary = false): Observable<IFlatRevision[]> {
    return this.query({
      'active.equals': true,
      'ctreeId.in': id
    }).pipe(
      map(resp => {
        const body = resp.body || [];
        const returnArr: IFlatRevision[] = [];
        const ctreeArr: ICategoryTree[] = [];

        for (let i = 0; i < body.length; i++) {
          const revision = body[i];
          const summary: string = revision.summary || '';
          if (revision.ctrees) {
            for (let j = 0; j < revision.ctrees?.length; j++) {
              const ctrees = revision.ctrees[j];
              if (ctrees !== undefined) {
                flatCategoryTree(ctrees, ctreeArr);
              }
            }
            returnArr.push({
              ...revision,
              summary: truncateSummary ? `${summary.substr(0, SUMMARY_TRUNC_LENGTH)}...` : summary,
              categories: ctreeArr,
              author: revision.article?.citation || '',
              date: revision.article?.articleDate || ''
            });
            revision.ctrees = ctreeArr;
          }
        }
        return returnArr;
      }),
      catchError(() => [])
    );
  }
}
