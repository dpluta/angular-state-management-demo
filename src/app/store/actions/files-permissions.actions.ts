import { createAction, props } from '@ngrx/store';
import { FilePermissions } from 'src/app/models/file-permissions';

export const initializeFilesPermissions = createAction('[Store Files Permissions Component] Initialize_Files_Permissions');
export const filesPermissionsFetchedSuccessfully = createAction('[Files Permissions Effects] Files_Permissions_Fetched_Successfully',
    props<{ filesPermissions: FilePermissions[] }>());
export const filesPermissionsFetchFailed =
    createAction('[Files Permissions Effects] Files_Permissions_Fetch_Failed');

