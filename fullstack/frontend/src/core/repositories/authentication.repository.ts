import { Enviroment } from "./../system/enviroments";
import { AccessTokenModel } from "./../models/access-token.model";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { UserLoginModel } from "../models/user-login.model";
import { UserRegisterModel } from "../models/user-register.model";

@Injectable()
export class AuthenticationRepository {
  readonly baseUrl = new Enviroment().baseUrl;
  readonly authUrl = `${this.baseUrl}auth/token`;
  readonly clientId = "testClientId";
  readonly clientSecret = "testClientSecret";
  basicHeader = btoa(`${this.clientId}:${this.clientSecret}`);

  constructor(public httpClient: HttpClient) {}

  login(login: UserLoginModel): Observable<AccessTokenModel> {
    const body = `grant_type=password&username=${login.username}&password=${
      login.password
    }`;

    return this.httpClient.post<AccessTokenModel>(
      this.authUrl,
      body,
      this.getOptionsForNewToken()
    );
  }

  renewAccessToken(refreshToken: string): Observable<AccessTokenModel> {
    const body = `grant_type=refresh_token&refresh_token=${refreshToken}`;

    return this.httpClient.post<AccessTokenModel>(
      this.authUrl,
      body,
      this.getOptionsForNewToken()
    );
  }

  register(model: UserRegisterModel): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}auth/register`, model);
  }

  private getOptionsForNewToken() {
    const headers = new HttpHeaders()
      .set("Authorization", `Basic ${this.basicHeader}`)
      .set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    return {
      headers: headers
    };
  }
}
