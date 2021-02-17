import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../../common/interfaces/user.interface';
import {IUserFormData} from '../../common/interfaces/user-form-data.interface';
import {map} from 'rxjs/operators';

@Injectable()
export class UserApi {
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`users`);
  }

  create(user: IUser): Observable<IUser> {
    const userFormData: IUserFormData = {
      id: user.id,
      name: user.firstName + ' ' + user.lastName,
      dateOfBirth: user.dateOfBirth,
      email: user.email
    };
    return this.http.post<IUser>(`users/${userFormData.id}`, userFormData)
      .pipe(
        map(data => user)
      );
  }

  update(user: IUserFormData): Observable<IUser> {
    return this.http.put<IUser>(`users/${user.id}`, user);
  }

  delete(userId: number): Observable<number> {
    return this.http.delete<number>(`users/${userId}`);
  }

}
