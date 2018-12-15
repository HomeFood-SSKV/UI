import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { ADDRESS_URL_CONSTANT } from '../model/constant-config';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }
  search() {
    return this.http.get(ADDRESS_URL_CONSTANT['GET']);
}
}
