import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { BooksService } from 'src/app/services/books.service';
import { BooksState } from './books-state';

@Injectable()
export class ComponentStoreBooksService extends ComponentStore<BooksState> {
  // selectors
  public readonly books$: Observable<string[]> = this.select(state => state.books);

  // Http service for fetching books, 2s delay
  constructor(private booksService: BooksService) {
    super({ books: [] });
  } // Defaults initialization through the constructor

  // effects
  public readonly initializeBooks = this.effect((books$) => {
    return books$.pipe(
      switchMap(() => this.booksService.fetchBooks().pipe(
        tap((books) => this.setBooks(books)),
        catchError(() => EMPTY),
      ))
    )
  });

  // updaters
  public readonly addBook = this.updater((state, book: string) => ({
    // Changes to state automatically triggers updates
    books: [...state.books, book],
  }));

  public setBooks(books: string[]): void {
    this.setState(() => ({ // Set state to desired values
      books: books
    }));
  }
}
