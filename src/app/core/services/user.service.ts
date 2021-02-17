import { Injectable } from '@angular/core';
import {UserApi} from '../api/user.api';
import {IUser} from '../../common/interfaces/user.interface';
import {Observable} from 'rxjs';
import {IUserFormData} from '../../common/interfaces/user-form-data.interface';
import {Store} from '@ngrx/store';
import {selectLastUserId} from '../../store/selectors/users.selectors';

@Injectable()
export class UserService {

  private lastUserId: number;

  constructor(
    private userApi: UserApi,
    private store: Store
  ) {
    this.store.select(selectLastUserId)
      .subscribe((id) => this.lastUserId = id);
  }


  getAll(): Observable<IUser[]> {
    return this.userApi.getAll();
  }

  createUser(user: IUser): Observable<IUser> {
    const newUser = Object.assign({}, user, {
      id: ++this.lastUserId
    });

    return this.userApi.create(newUser);
  }

  updateUser(user: IUser): Observable<IUser> {
    const userFormData: IUserFormData = {
      id: user.id,
      name: user.firstName + ' ' + user.lastName,
      createdDate: user.createdDate,
      dateOfBirth: user.dateOfBirth,
      email: user.email
    };

    return this.userApi.update(userFormData);
  }

  deleteUser(id: number): Observable<number> {
    return this.userApi.delete(id);
  }
}
