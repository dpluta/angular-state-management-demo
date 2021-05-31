import { createReducer, on } from '@ngrx/store';
import * as fromBooks from 'src/app/store/actions/books.actions';

export const bookstoreFeatureKey = 'bookstore';

export interface State {
  books: string[]
}

export const initialState: State = {
  books: []
};

export const reducer = createReducer(
  initialState,
  on(fromBooks.bookAdded, (state, action) => {
    return {
      books: [...state.books, action.title]
    }
  }),
  on(fromBooks.initializationSucceeded, (_, action) => {
    return {
      books: action.books
    }
  })
);

