import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { SubjectBooksService } from './subject-books.service';

@Component({
  selector: 'app-subject-books',
  templateUrl: './subject-books.component.html',
  providers: [SubjectBooksService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectBooksComponent implements OnInit {
  // Use books$ readonly field, async pipe would subscribe for that data
  books$: Observable<string[]> = this.booksService.books$;

  /* #region form */
  booksForm = this.formBuilder.group({
    title: ''
  });
  /* #endregion */

  constructor(
    // Inject booksService to have access to methods and change state based on Subject 
    private booksService: SubjectBooksService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // Fetch books from external service, subscribe needed to actually get the data
    this.booksService.initializeBooks().subscribe();
  }

  public addBook() {
    // Use service to add a book to books array
    this.booksService.addBook(this.getBookTitle());
    this.resetBooksForm();
  }

  /* #region form related methods */
  private getBookTitle(): string {
    return this.booksForm.controls.title.value;
  }

  private resetBooksForm(): void {
    this.booksForm.reset();
  }
  /* #endregion */
}

