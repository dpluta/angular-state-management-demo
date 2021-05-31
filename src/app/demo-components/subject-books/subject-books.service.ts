import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BooksService } from 'src/app/services/books.service';

@Injectable()
export class SubjectBooksService {
  // Always hide internal subject calls so clients cannot modify it
  private booksSubject$ = new BehaviorSubject<string[]>([]);
  public readonly books$ = this.booksSubject$.asObservable();

  // Http service for fetching books, 2s delay
  constructor(private booksService: BooksService) { }

  public initializeBooks(): Observable<string[]> {
    return this.booksService.fetchBooks().pipe(
      tap((books) => this.setBooks(books)),
      catchError(() => EMPTY)
    )
  }

  public addBook(title: string): void {
    // Update books immutably
    const updatedBooks = [...this.booksSubject$.value, title];
    // Manually trigger data updates to all subscribers
    this.booksSubject$.next(updatedBooks);
  }

  public setBooks(books: string[]): void {
    // Manually trigger data updates to all subscribers
    this.booksSubject$.next(books);
  }
}
