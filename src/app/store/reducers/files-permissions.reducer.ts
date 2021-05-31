import { createReducer, on } from "@ngrx/store";
import { FilePermissions } from "src/app/models/file-permissions";
import * as fromPermissions from 'src/app/store/actions/files-permissions.actions';

export const filesFeatureKey = 'files';

export interface State {
    // For bigger collections use object with keys {[fileId: number]: string[]} to store values, for O(1) search speed
    permissions: FilePermissions[]
    permissionsFetched: boolean;
    isError: boolean;
}

const initialState: State = {
    permissions: [],
    permissionsFetched: false,
    isError: false
};

export const reducer = createReducer(
    initialState,
    on(fromPermissions.initializeFilesPermissions, () => {
        return initialState;
    }),
    on(fromPermissions.filesPermissionsFetchedSuccessfully, (state, payload) => {
        return {
            ...state,
            permissions: payload.filesPermissions,
            permissionsFetched: true
        }
    }),
    on(fromPermissions.filesPermissionsFetchFailed, (state) => {
        return {
            ...state,
            permissions: [...initialState.permissions],
            permissionsFetched: true,
            isError: true
        };
    })
);
