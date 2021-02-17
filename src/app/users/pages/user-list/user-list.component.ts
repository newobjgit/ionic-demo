import {AfterContentInit, Component, OnInit} from '@angular/core';
import { NavController } from '@ionic/angular';
import {UserService} from '../../../core/services/user.service';
import {Store} from '@ngrx/store';
import {IUser} from '../../../common/interfaces/user.interface';
import {Observable} from 'rxjs';
import {loadUsers} from '../../../store/actions/users.actions';
import {selectLoading, selectUsersList} from '../../../store/selectors/users.selectors';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  loading: boolean;
  users$: Observable<IUser[]>;

  constructor(
    private navCtrl: NavController,
    private store: Store
  ) {
    this.users$ = this.store.select(selectUsersList)
      .pipe(
        tap((users) => {
          if (!users.length) {
            this.store.dispatch(loadUsers());
          }
        })
      );
    this.store.select(selectLoading)
      .pipe(
        tap(loading => this.loading = loading)
      );
  }

  trackByFn(index, user: IUser) {
    return user.email;
  }

  navigateToCreateUser(): void {
    this.navCtrl.navigateForward(['create']);
  }

  navigateToEditUser(userId: number): void {
    this.navCtrl.navigateForward(['edit', userId]);
  }

  doRefresh(event) {
    this.store.dispatch(loadUsers());
    event.target.complete();
  }

}
