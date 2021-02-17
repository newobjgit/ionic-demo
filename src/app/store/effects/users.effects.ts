import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserService} from '../../core/services/user.service';
import {Injectable} from '@angular/core';
import {
  UserActionTypes,
  usersLoadedError,
  usersLoadedSuccess,
  userDeletedSuccess,
  userDeletedError, userAddedSuccess, userAddedError, userUpdatedError, userUpdatedSuccess
} from '../actions/users.actions';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {log} from 'util';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  loadUsers$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserActionTypes.LoadUsers),
      mergeMap(() => this.userService.getAll()
        .pipe(
          map((users) => (usersLoadedSuccess({users}))),
          catchError(() => of(usersLoadedError()))
        )
      )
    )
  );

  addUser$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserActionTypes.AddUserRequest),
      mergeMap(({user}) => this.userService.createUser(user)
        .pipe(
          map((data) => userAddedSuccess({user: data})),
          catchError(() => of(userAddedError()))
        )
      )
    ));

  updateUser$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserActionTypes.UpdateUserRequest),
      mergeMap(({user}) => this.userService.updateUser(user)
        .pipe(
          map(() => userUpdatedSuccess({user})),
          catchError(() => of(userUpdatedError()))
        )
      )
    )
  );

  deleteCar$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserActionTypes.DeleteUserRequest),
      mergeMap(({id}) => this.userService.deleteUser(id)
        .pipe(
          map(() => userDeletedSuccess({id})),
          catchError(() => of(userDeletedError()))
        )
      )
    ));
}
