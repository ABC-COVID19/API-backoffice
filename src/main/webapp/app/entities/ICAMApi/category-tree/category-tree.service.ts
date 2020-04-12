import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICategoryTree } from 'app/shared/model/ICAMApi/category-tree.model';
import { map } from 'rxjs/operators';

type EntityResponseType = HttpResponse<ICategoryTree>;
type EntityArrayResponseType = HttpResponse<ICategoryTree[]>;

@Injectable({ providedIn: 'root' })
export class CategoryTreeService {
  public resourceUrl = SERVER_API_URL + 'services/icamapi/api/category-trees';

  constructor(protected http: HttpClient) {}

  create(categoryTree: ICategoryTree): Observable<EntityResponseType> {
    return this.http.post<ICategoryTree>(this.resourceUrl, categoryTree, { observe: 'response' });
  }

  update(categoryTree: ICategoryTree): Observable<EntityResponseType> {
    return this.http.put<ICategoryTree>(this.resourceUrl, categoryTree, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICategoryTree>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICategoryTree[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getMainCategories(): Observable<ICategoryTree[]> {
    return this.query().pipe(
      map(resp => {
        const body = resp.body || [];
        return body.filter(cat => cat.parent === null);
      })
    );
  }
}
