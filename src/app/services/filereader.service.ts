import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


// not used - however if needed - can read from local file
@Injectable({
  providedIn: 'root'
})
export class FilereaderService {
  private _jsonURL = 'assets/SampleJson.json';

  constructor(private _httpClient: HttpClient) {
  }

  public getJSON(): Observable<any> {
    return this._httpClient.get(this._jsonURL);
  }





}

