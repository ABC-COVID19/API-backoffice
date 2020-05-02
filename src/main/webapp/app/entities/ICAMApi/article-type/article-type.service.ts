import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IArticleType } from 'app/shared/model/ICAMApi/article-type.model';

type EntityResponseType = HttpResponse<IArticleType>;
type EntityArrayResponseType = HttpResponse<IArticleType[]>;

@Injectable({ providedIn: 'root' })
export class ArticleTypeService {
  //public resourceUrl = SERVER_API_URL + 'services/icamapi/api/article-types';
  public resourceUrl = 'https://api.dev.icam.org.pt/services/icamapi/api/article-types';

  constructor(protected http: HttpClient) {}

  create(articleType: IArticleType): Observable<EntityResponseType> {
    return this.http.post<IArticleType>(this.resourceUrl, articleType, { observe: 'response' });
  }

  update(articleType: IArticleType): Observable<EntityResponseType> {
    return this.http.put<IArticleType>(this.resourceUrl, articleType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IArticleType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IArticleType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getArticleTypes(): Observable<IArticleType[]> {
    return this.http.get<IArticleType[]>(`${this.resourceUrl}`);
  }
}
