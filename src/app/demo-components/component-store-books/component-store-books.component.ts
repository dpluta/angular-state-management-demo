import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ComponentStoreBooksService } from './component-store-books.service';

@Component({
  selector: 'app-component-store-books',
  templateUrl: './component-store-books.component.html',
  providers: [ComponentStoreBooksService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentStoreBooksComponent implements OnInit {
  // Use books$ selector, async pipe would subscribe for that data
  public books$: Observable<string[]> = this.booksStore.books$;

  /* #region form */
  booksForm = this.formBuilder.group({
    title: ''
  });
  /* #endregion */

  constructor(
    // Inject booksStore to have access to selectors, updaters and effects
    private readonly booksStore: ComponentStoreBooksService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // Lazily initialize books array by calling an effect that fetches data from external service
    this.booksStore.initializeBooks();
  }

  public addBook(): void {
    // Use component store to add a book to books array
    this.booksStore.addBook(this.getBookTitle());
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


