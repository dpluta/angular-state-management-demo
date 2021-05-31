import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NoSubjectBooksService } from './no-subject-books.service';

@Component({
  selector: 'app-no-subject-books',
  templateUrl: './no-subject-books.component.html',
  providers: [NoSubjectBooksService]
})
export class NoSubjectBooksComponent implements OnInit {
  books: string[] = [];

  booksForm = this.formBuilder.group({
    title: ''
  });

  constructor(private formBuilder: FormBuilder, private booksService: NoSubjectBooksService) { }

  ngOnInit() {
    this.books = this.booksService.getBooks();
  }

  public addBook() {
    this.booksService.addBook(this.booksForm.controls.title.value);
    this.booksForm.reset();
  }
}
