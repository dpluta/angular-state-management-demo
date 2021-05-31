import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FilePermissions } from 'src/app/models/file-permissions';
import * as fromPermissions from 'src/app/store/actions/files-permissions.actions';
import { State } from 'src/app/store/reducers';
import { permissionsFetchedSelector, permissionsSelector } from 'src/app/store/selectors/files-permissions.selectors';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreFilesPermissionsComponent implements OnInit {
  public filePermissions$: Observable<FilePermissions[]> = this.store.select(permissionsSelector);
  public permissionsFetched$: Observable<boolean> = this.store.select(permissionsFetchedSelector);

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.store.dispatch(fromPermissions.initializeFilesPermissions());
  }

}

