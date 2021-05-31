import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentStore } from '@ngrx/component-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentStoreBooksComponent } from './demo-components/component-store-books/component-store-books.component';
import { NoSubjectBooksComponent } from './demo-components/no-subject-books/no-subject-books.component';
import { StoreBooksComponent } from './demo-components/store-books/store-books.component';
import { SubjectBooksComponent } from './demo-components/subject-books/subject-books.component';
import { PaginatorComponent } from './real-life-components/paginator/paginator.component';
import { StoreFilesPermissionsComponent } from './real-life-components/files-list/files-list.component';
import { BooksEffects } from './store/effects/books.effects';
import { FilesPermissionsEffects } from './store/effects/files-permissions.effects';
import { reducers } from './store/reducers/index';

@NgModule({
  declarations: [
    AppComponent,
    NoSubjectBooksComponent,
    SubjectBooksComponent,
    ComponentStoreBooksComponent,
    PaginatorComponent,
    StoreBooksComponent,
    StoreFilesPermissionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    EffectsModule.forRoot([BooksEffects, FilesPermissionsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [ComponentStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
