import { createSelector } from "@ngrx/store";
import { State } from "../reducers";

export const filesPermissionsSelector = (state: State) => state.files;

export const permissionsSelector = createSelector(
    filesPermissionsSelector, (feature) => feature.permissions
)

export const permissionsFetchedSelector = createSelector(
    filesPermissionsSelector, (feature) => feature.permissionsFetched
)
