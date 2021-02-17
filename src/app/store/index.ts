import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import { storageSync } from 'ngrx-store-capacitor';
import * as users from './reducers/users.reducer';

export interface State {
  user: users.State;
}

export const reducers: ActionReducerMap<State> = {
  user: users.reducer
};

export const storageSyncReducer = storageSync({
  keys: ['user'],
  hydratedStateKey: 'hydrated',
  onSyncError,
});

export function storageMetaReducer(reducer: ActionReducer<any>): ActionReducer<any, any> {
  return storageSyncReducer(reducer);
}

export const metaReducers: MetaReducer<any, any>[] = [storageMetaReducer];

export function onSyncError(err) {
  console.log(err);
}

