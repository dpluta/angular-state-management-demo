import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromBooks from 'src/app/store/actions/books.actions';
import { State } from '../../store/reducers';
import { booksSelector } from '../../store/selectors/books.selectors';
import { bookAdded } from '../../store/actions/books.actions';

@Component({
  selector: 'app-store-books',
  templateUrl: './store-books.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreBooksComponent implements OnInit {
  public readonly books$: Observable<string[]> = this.store.select(booksSelector);

  /* #region form */
  booksForm = this.formBuilder.group({
    title: ''
  });
  /* #endregion */

  constructor(private store: Store<State>, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.store.dispatch(fromBooks.initialize());
  }

  public addBook(): void {
    this.store.dispatch(bookAdded({ title: this.getBookTitle() }));
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
