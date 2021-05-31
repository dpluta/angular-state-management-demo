import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { FilesPermissionsService } from 'src/app/services/permissions.service';
import * as fromPermissions from 'src/app/store/actions/files-permissions.actions';

@Injectable()
export class FilesPermissionsEffects {
    public fetchFilesPermissionsForCurrentlyLoggedInUser$: Observable<any> = createEffect(
        () => this.actions$.pipe(
            ofType(fromPermissions.initializeFilesPermissions),
            switchMap(() => this.filesPermissionsService.getFilesPermissions()
                .pipe(
                    map((filesPermissions) => fromPermissions.filesPermissionsFetchedSuccessfully({
                        filesPermissions: filesPermissions
                    })),
                    catchError(() => of(fromPermissions.filesPermissionsFetchFailed()))
                ))
        )
    );

    constructor(
        private actions$: Actions,
        private filesPermissionsService: FilesPermissionsService
    ) {
    }

}
