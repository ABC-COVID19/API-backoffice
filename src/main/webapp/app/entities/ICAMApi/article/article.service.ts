import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IArticle } from 'app/shared/model/ICAMApi/article.model';

type EntityResponseType = HttpResponse<IArticle>;
type EntityArrayResponseType = HttpResponse<IArticle[]>;

@Injectable({ providedIn: 'root' })
export class ArticleService {
  //public resourceUrl = SERVER_API_URL + 'services/icamapi/api/articles';
  public resourceUrl = 'https://api.dev.icam.org.pt/services/icamapi/api/articles';

  constructor(protected http: HttpClient) {}

  create(article: IArticle): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(article);
    return this.http
      .post<IArticle>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(article: IArticle): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(article);
    return this.http
      .put<IArticle>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IArticle>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IArticle[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  /**
   * TODO : change to specified = false
   */

  getArticlesToReview(): Observable<EntityResponseType> {
    return this.http
      .get<EntityResponseType>(`${this.resourceUrl}?revisionId.specified=true`)
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  protected convertDateFromClient(article: IArticle): IArticle {
    const copy: IArticle = Object.assign({}, article, {
      repoDate: article.repoDate && article.repoDate.isValid() ? article.repoDate.format(DATE_FORMAT) : undefined,
      fetchDate: article.fetchDate && article.fetchDate.isValid() ? article.fetchDate.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.repoDate = res.body.repoDate ? moment(res.body.repoDate) : undefined;
      res.body.fetchDate = res.body.fetchDate ? moment(res.body.fetchDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((article: IArticle) => {
        article.repoDate = article.repoDate ? moment(article.repoDate) : undefined;
        article.fetchDate = article.fetchDate ? moment(article.fetchDate) : undefined;
      });
    }
    return res;
  }
}
