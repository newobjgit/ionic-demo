import {Action, createReducer, on} from '@ngrx/store';
import * as userActions from '../actions/users.actions';
import {IUser} from '../../common/interfaces/user.interface';

export interface State {
  users: IUser[];
  loading: boolean;
  ids: number[];
}

export const initialState: State = {
  users: [],
  loading: false,
  ids: []
};

const userReducer = createReducer(
  initialState,
  on(userActions.addUserRequest, (state) => ({
    ...state,
    loading: true
  })),
  on(userActions.userAddedSuccess, (state, {user}) => {
    return {
      ...state,
      loading: false,
      users: [...state.users, user],
      ids: [...state.ids, user.id]
    };
  }),
  on(userActions.userAddedError, state => ({
    ...state,
    loading: false
  })),

  on(userActions.updateUserRequest, (state) => ({
    ...state,
    loading: true
  })),
  on(userActions.userUpdatedSuccess, (state, {user}) => {
    const users = [...state.users];
    const userIndex = users.findIndex(x => x.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = user;
    }
    return {
      ...state,
      loading: false,
      users
    };
  }),
  on(userActions.userUpdatedError, state => ({
    ...state,
    loading: false
  })),

  on(userActions.loadUsers, (state) => ({
    ...state,
    loading: true
  })),
  on(userActions.usersLoadedSuccess, (state, {users}) => ({
    ...state,
    loading: false,
    users,
    ids: users.map((x) => x.id)
  })),
  on(userActions.usersLoadedError, state => ({
    ...state,
    loading: false
  })),

  on(userActions.deleteUserRequest, (state, {id}) => ({
    ...state,
    loading: true
  })),
  on(userActions.userDeletedSuccess, (state, {id}) => {
      const users = [...state.users];
      const userIndex = users.findIndex(x => x.id === id);
      if (userIndex !== -1) {
        users.splice(userIndex, 1);
      }
      return {
        ...state,
        loading: false,
        users,
        ids: state.ids.filter((x) => x !== id)
      };
    }
  ),
  on(userActions.userDeletedError, state => ({
    ...state,
    loading: false}))
);

export function reducer(state: State | undefined, action: Action){
  return userReducer(state, action);
}
