import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpUrlEncodingCodec} from '@angular/common/http';
import {Credential} from './credential';
import {interval, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  private refreshToken = 'sJgkjO/ZRpt9BXxzF4jvAQCFE60lhj2uFgd+VjeNICVpaerwGgdIJpnKeiDZLqs1+pTdJ+cXaeAG95D+SH8js3R1UN3Gfi27yX97a/f22RWWk5UWXAPbIIj6il7qA67fBpFcFhFYfizBWiv4NOMNI5eoaYkfVrolp2xFe7ehmHIAp5GO3XBjzB5yQ5peWYqr5uWUvglB/eUo6ixXw3wviShKemOdOPC9Q1Hx+1uNzPdetzvz4Ff3Qeijn/ZOxKVyzRnjZmmMS2rnugn6n/WnbDqvXySNhM92VJdqkDVdm/2med2TnJZRzP6bjzdf7vCQKS8kuVV0YFXuloDa47+XDoTxZNQMh7Hck3yD2gYp9Z7GJKfnKqsrzDgKAbQaelhmamJtI67pA99bEuDoYh3rWZInV2FTe1iIsvJJHCm15gAqmVWbn1liywQWpfA100MQuG4LYrgoVi/JHHvlsjo6xxYyrJ/owcaC6na8UQq9IOzuHcTwUujLr90ZfAKeMGvgu/WYwoZZprWYZntWY5b7Qh+lgVOtKZDuMoAcxecBkfx56zCzcWU92VAdmsYU9/x8VnYfbNg9yOMk0SdObUO88t0owHAzcC0TPHqBhFaUhZVn2fz5QGf0efZzV+quAZc0Fom0L34HHjcYlDU95X0Qr85FGZiHF9kjF7qQxaEG20UYyPPguqswh1dTKiyNrLKD/3WBSb3XHkZB2LjAYj9BUgCPVmarVBOiYKGVjJ6jT3eRWJES9Vlb+N3UHeaWDRQgRi0ENImRJQysxGZynngMopxjOHDcrCV564H+RaokfjDbB95onRT5GdTZ2EAyHSV89OvzlycCZ0OIPmd5G9As+M3NL2hIzegmU5ODnYDcD7kjCVKG9vxlVbZ+Tx0l7W59YkWMhN4Flk0=212FD3x19z9sWBHDJACbC00B75E';

  private credentials = new Map();
  private refreshRate = 29 * 60 * 1000;
  private nodePort = 3000;
  private nodeURI = 'http://localhost';
  private nodeURL = this.nodeURI + ':' + this.nodePort + '/api/credentials';
  private credentialList: string[] = ['access_token', 'clientId', 'refresh_token'];
  private counter = interval(this.refreshRate);
  constructor(private httpClient: HttpClient) {
    this.preloadCredentials();
    this.counter.subscribe((secs) => {
      console.log('secs:' + secs + ' refreshing token');
      this.refreshAccessToken();
    });
  }

  preloadCredentials(): void {
    for (let item of this.credentialList) {
      this.getCredential(item);
    }
  }

  saveCredential(name: string, value: string): void {
    const credential = new Credential(name, value, Date.now());
    this.httpClient.post<{message: string, credential: Credential}>
      (this.nodeURL, credential)
      .subscribe((response) => {
        // console.log('saved:' + response.credential);
        this.credentials.set(response.credential.name, response.credential.value );
      });
  }

  // get credential from database
  getCredential(name: string): string {
    let token: string = this.credentials.get(name);
    if (name === 'access_token' && !token) {
      this.refreshAccessToken();
      token = this.credentials.get(name);
    } else if (!token) {
      this.loadCredential(name);
      token = this.credentials.get(name);
    }
    return token;
  }

  // get credential from TDA
  refreshAccessToken(): void {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'grant_type=refresh_token&client_id=HWHY9NAVFDGIGYQGGUUCULMNFPXXIVHP&refresh_token='
      + encodeURIComponent(this.refreshToken);
    this.httpClient.post<string>('https://api.tdameritrade.com/v1/oauth2/token', body,
      {headers,
        responseType: 'json'})
      .subscribe(response => {
          // console.log('success:' + response);
          // @ts-ignore
          const value = response.access_token;
          this.saveCredential('access_token', value);
          this.credentials.set('access_token', value);
        },
        response => console.log(response));
  }


  loadCredential(name: string): void {
    this.httpClient.get<{message: string, credential: Credential}> (this.nodeURL + '/' + name)
      .subscribe((res) => {
         this.credentials.set(name, res.credential.value);
      });
  }
}
