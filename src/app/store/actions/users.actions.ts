import {createAction, props} from '@ngrx/store';
import {IUser} from '../../common/interfaces/user.interface';

export enum UserActionTypes {
  AddUserRequest = '[Create/Edit User] Add User Request',
  UserAddedSuccess = '[Create/Edit User] User Added Success',
  UserAddedError = '[Create/Edit User] User Added Error',

  UpdateUserRequest = '[Create/Edit User] Update User Request',
  UserUpdatedSuccess = '[Create/Edit User] User Updated Success',
  UserUpdatedError = '[Create/Edit User] User Updated Error',

  LoadUsers = '[User list] Load Users',
  UsersLoadedSuccess = '[User list] UsersLoadedSuccess',
  UsersLoadedError  = '[User list] UsersLoadedError',

  DeleteUserRequest = '[User list] Delete User Request',
  UserDeletedSuccess = '[Users list] User Deleted Success',
  UserDeletedError = '[Users list] User Deleted Error'
}

export const addUserRequest = createAction(
  UserActionTypes.AddUserRequest,
  props<{user: IUser}>()
);

export const userAddedSuccess = createAction(
  UserActionTypes.UserAddedSuccess,
  props<{user: IUser}>()
);

export const userAddedError = createAction(UserActionTypes.UserAddedError);

export const updateUserRequest = createAction(
  UserActionTypes.UpdateUserRequest,
  props<{user: IUser}>()
);

export const userUpdatedSuccess = createAction(
  UserActionTypes.UserUpdatedSuccess,
  props<{user: IUser}>()
);

export const userUpdatedError = createAction(UserActionTypes.UserUpdatedError);

export const loadUsers = createAction(UserActionTypes.LoadUsers);

export const usersLoadedSuccess = createAction(
  UserActionTypes.UsersLoadedSuccess,
  props<{users: IUser[]}>()
);

export const usersLoadedError = createAction(UserActionTypes.UsersLoadedError);


export const deleteUserRequest = createAction(
  UserActionTypes.DeleteUserRequest,
  props<{id: number}>()
);

export const userDeletedSuccess = createAction(
  UserActionTypes.UserDeletedSuccess,
  props<{id: number}>()
);

export const userDeletedError = createAction(UserActionTypes.UserDeletedError);
