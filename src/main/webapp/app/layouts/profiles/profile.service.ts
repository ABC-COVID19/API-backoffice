import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { ProfileInfo, InfoResponse } from './profile-info.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private infoUrl = SERVER_API_URL + 'management/info';
  private profileInfo$!: Observable<ProfileInfo>;

  constructor(private http: HttpClient) {}

  getProfileInfo(): Observable<ProfileInfo> {
    if (this.profileInfo$) {
      return this.profileInfo$;
    }

    this.profileInfo$ = this.http.get<InfoResponse>(this.infoUrl).pipe(
      map((response: InfoResponse) => {
        const profileInfo: ProfileInfo = {
          activeProfiles: response.activeProfiles,
          inProduction: response.activeProfiles && response.activeProfiles.includes('prod'),
          swaggerEnabled: response.activeProfiles && response.activeProfiles.includes('swagger')
        };
        return profileInfo;
      }),
      shareReplay()
    );
    return this.profileInfo$;
  }
}
