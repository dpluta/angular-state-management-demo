import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as fromBooks from 'src/app/store/actions/books.actions';
import { BooksService } from '../../services/books.service';

@Injectable()
export class BooksEffects {
    fetchBooks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBooks.initialize),
            switchMap(() =>
                this.booksService.fetchBooks().pipe(
                    map(books => fromBooks.initializationSucceeded({ books })),
                    catchError(() => fromBooks.initializationFailed)
                )
            )
        )
    )

    constructor(
        private actions$: Actions,
        private booksService: BooksService
    ) { }
}