import {State} from '../index';
import {createSelector} from '@ngrx/store';
import * as users from '../reducers/users.reducer';

const selectUser = (state: State) => state.user;

export const selectUsersList = createSelector(
  selectUser,
  (state: users.State) => state.users
);

export const selectUserById = createSelector(
  selectUser,
  (state: users.State, userId: number) => state.users.find(u => u.id === userId)
);

export const selectLoading = createSelector(
  selectUser,
  (state: users.State) => state.loading
);

export const selectLastUserId = createSelector(
  selectUser,
  (state: users.State) => Math.max(...state.ids)
);
