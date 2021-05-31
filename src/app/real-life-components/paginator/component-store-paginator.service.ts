import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { filter, map, pairwise, tap, withLatestFrom } from 'rxjs/operators';

export interface PaginatorState {
  pageIndex: number;
  pageSize: number;
  length: number;
  pageSizeOptions: ReadonlySet<number>;
}

@Injectable()
export class PaginatorStore extends ComponentStore<PaginatorState> {
  constructor() {
    // set defaults
    super({
      pageIndex: 0,
      pageSize: 50,
      length: 0,
      pageSizeOptions: new Set<number>([50]),
    });
  }
  // *********** Updaters *********** //

  readonly setPageIndex = this.updater((state, value: string | number) => ({
    ...state,
    pageIndex: Number(value) || 0,
  }));

  readonly setPageSize = this.updater((state, value: string | number) => ({
    ...state,
    pageSize: Number(value) || 0,
  }));

  readonly setLength = this.updater((state, value: string | number) => ({
    ...state,
    length: Number(value) || 0,
  }));

  readonly setPageSizeOptions = this.updater(
    (state, value: readonly number[]) => {
      // Making sure that the pageSize is included and sorted
      const pageSizeOptions = new Set<number>(
        [...value, state.pageSize].sort((a, b) => a - b)
      );
      return { ...state, pageSizeOptions };
    }
  );

  readonly changePageSize = this.updater((state, newPageSize: number) => {
    const startIndex = state.pageIndex * state.pageSize;
    return {
      ...state,
      pageSize: newPageSize,
      pageIndex: Math.floor(startIndex / newPageSize),
    };
  });

  // *********** Selectors *********** //

  readonly hasPreviousPage$ = this.select(
    ({ pageIndex, pageSize }) => pageIndex >= 1 && pageSize != 0
  );

  readonly numberOfPages$ = this.select(({ pageSize, length }) => {
    if (!pageSize) return 0;
    return Math.ceil(length / pageSize);
  });

  readonly hasNextPage$ = this.select(
    this.state$,
    this.numberOfPages$,
    ({ pageIndex, pageSize }, numberOfPages) => {
      const maxPageIndex = numberOfPages - 1;
      return pageIndex < maxPageIndex && pageSize != 0;
    }
  );

  readonly rangeLabel$ = this.select(({ pageIndex, pageSize, length }) => {
    if (length === 0 || pageSize === 0) return `0 of ${length}`;

    length = Math.max(length, 0);
    const startIndex = pageIndex * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;

    return `${startIndex + 1} – ${endIndex} of ${length}`;
  });

  // ViewModel of Paginator component
  readonly vm$ = this.select(
    this.state$,
    this.hasPreviousPage$,
    this.hasNextPage$,
    this.rangeLabel$,
    (state, hasPreviousPage, hasNextPage, rangeLabel) => ({
      pageSize: state.pageSize,
      pageSizeOptions: Array.from(state.pageSizeOptions),
      pageIndex: state.pageIndex,
      hasPreviousPage,
      hasNextPage,
      rangeLabel,
    })
  );

  private readonly pageIndexChanges$ = this.state$.pipe(
    // map instead of select, so that non-distinct value could go through
    map((state) => state.pageIndex),
    pairwise()
  );

  readonly page$: Observable<PageEvent> = this.select(
    this.pageIndexChanges$,
    this.select((state) => [state.pageSize, state.length]),
    ([previousPageIndex, pageIndex], [pageSize, length]) => ({
      pageIndex,
      previousPageIndex,
      pageSize,
      length,
    }),
    { debounce: true }
  );

  readonly nextPage = this.effect((trigger$) => {
    return trigger$.pipe(
      withLatestFrom(this.hasNextPage$),
      filter(([, hasNextPage]) => hasNextPage),
      tap(() => {
        this.setPageIndex(this.get().pageIndex + 1);
      })
    );
  });

  readonly firstPage = this.effect((trigger$) => {
    return trigger$.pipe(
      withLatestFrom(this.hasPreviousPage$),
      filter(([, hasPreviousPage]) => hasPreviousPage),
      tap(() => {
        this.setPageIndex(0);
      })
    );
  });

  readonly previousPage = this.effect((trigger$) => {
    return trigger$.pipe(
      withLatestFrom(this.hasPreviousPage$),
      filter(([, hasPreviousPage]) => hasPreviousPage),
      tap(() => {
        this.setPageIndex(this.get().pageIndex - 1);
      })
    );
  });

  readonly lastPage = this.effect((trigger$) => {
    return trigger$.pipe(
      withLatestFrom(this.hasNextPage$, this.numberOfPages$),
      filter(([, hasNextPage]) => hasNextPage),
      tap(([, , numberOfPages]) => {
        this.setPageIndex(numberOfPages - 1);
      })
    );
  });
}

export interface PageEvent
  extends Pick<PaginatorState, 'pageIndex' | 'pageSize' | 'length'> {
  previousPageIndex?: number;
}

/*
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://github.com/ngrx/platform
*/