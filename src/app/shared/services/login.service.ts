import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {AuthenticationDto} from "../models/authentication-dto";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.baseUrl.concat('/auth');

  constructor(private httpClient: HttpClient) {
  }

  public postLogin(authenticationDto: AuthenticationDto) {

    const httpHeadersConfiguration = {
      headers: new HttpHeaders({
        'Authorization': 'Basic '.concat(btoa(authenticationDto.username+':'+authenticationDto.password)),
      })
    }

    return this.httpClient.post(this.baseUrl.concat('/authenticate'), {}, httpHeadersConfiguration);
  }

}
