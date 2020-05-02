import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IArticle } from 'app/shared/model/ICAMApi/article.model';
import { SourceRepoService } from '../source-repo/source-repo.service';

type EntityResponseType = HttpResponse<IArticle>;
type EntityArrayResponseType = HttpResponse<IArticle[]>;

@Injectable({ providedIn: 'root' })
export class ArticleService {
  public resourceUrl = SERVER_API_URL + 'services/icamapi/api/articles';

  constructor(protected http: HttpClient, protected repoService: SourceRepoService) {}

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
      .get<EntityResponseType>(`${this.resourceUrl}?revisionId.specified=false`)
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  addArticleToSpecialSourceRepo(article: IArticle): Observable<EntityResponseType> {
    return this.repoService
      .query({
        'itemName.equals': 'special'
      })
      .pipe(
        concatMap(r => {
          const repos = r.body;

          if (repos?.length) {
            return of(repos[0].id);
          }

          return this.repoService
            .create({
              active: true,
              itemName: 'special'
            })
            .pipe(map(newRepo => newRepo.body?.id));
        }),
        concatMap(id => this.create({ ...article, srepo: { id } }))
      );
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
