import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoatService {

  constructor(private httpClient: HttpClient) {
  }

  public calculate(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/goat').pipe(map(data => data));
  }

}
