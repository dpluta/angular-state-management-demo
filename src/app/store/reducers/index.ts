import {
  ActionReducerMap
} from '@ngrx/store';
import * as fromBooks from 'src/app/store/reducers/books.reducer';
import * as fromFilesPermissions from 'src/app/store/reducers/files-permissions.reducer';


export interface State {
  [fromBooks.bookstoreFeatureKey]: fromBooks.State;
  [fromFilesPermissions.filesFeatureKey]: fromFilesPermissions.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromBooks.bookstoreFeatureKey]: fromBooks.reducer,
  [fromFilesPermissions.filesFeatureKey]: fromFilesPermissions.reducer
};
