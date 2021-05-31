import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor() { }

  public fetchBooks(): Observable<string[]> {
    return of(['Harry Potter', 'Ogniem i mieczem'])
      .pipe(delay(200));
  }
}
