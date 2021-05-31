import { Injectable } from '@angular/core';

@Injectable()
export class NoSubjectBooksService {
  books: string[] = [];

  addBook(book: string) {
    this.books.push(book);
  }

  getBooks() {
    return this.books;
  }

  deleteBook(title: string) {
    this.books = this.books.filter(m => m !== title);
  }

  clearBooks() {
    this.books = [];
  }
}
