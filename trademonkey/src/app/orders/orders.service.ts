import {HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpInterceptor} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Credential} from '../credentials/credential';
import {CredentialsService} from '../credentials/credentials.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private httpClient: HttpClient, private credentialsService: CredentialsService) {}

  getOrders(startDate: string, endDate: string): any {
    const params = new HttpParams()
      .set('maxResults', '200')
      .set('fromEnteredTime', startDate)
      .set('toEnteredTime', endDate)
      .set('status', status);

    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.credentialsService.getCredential('access_token'));

    // const clientId = this.credentialsService.getCredential('clientId');
    let result = {};
    const address = 'https://api.tdameritrade.com/v1/accounts/487399516/orders?';
    // const prms = 'maxResults=200&fromEnteredTime=' + startDate + '&toEnteredTime=' + endDate + '&status=' + status;
    // this.httpClient.get(address/* + prms*/, {
    this.httpClient.get(address, {
      headers,
      params,
      responseType: 'json'
    }).subscribe(res => {
      console.log(res);
      result = res;
      },
      res => console.log(res));

    return result;
  }

}
