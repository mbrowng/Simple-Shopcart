import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountsService {

  constructor(private httpClient: HttpClient) { }

  getDiscounts():Observable<any> {
      return this.httpClient.get('http://localhost:8080/api/discounts');
  }
}
