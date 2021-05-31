import { createAction, props } from '@ngrx/store';

export const bookAdded =
  createAction('[Store Books Component] Book_Added',
    props<{ title: string }>());
export const initialize =
  createAction('[Store Books Component] Initialize');
export const initializationSucceeded =
  createAction('[Store Books Component] Initialization_Succeeded', props<{ books: string[] }>());
export const initializationFailed =
  createAction('[Store Books Component] Initialization_Failed');