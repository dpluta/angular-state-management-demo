import { createSelector } from "@ngrx/store";
import { State } from "../reducers";

export const bookstoreSelector = (state: State) => state.bookstore;

export const booksSelector = createSelector(
    bookstoreSelector,
    (bookstore) => {
        return bookstore.books;
    }
);