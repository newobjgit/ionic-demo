import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IUser} from '../../../common/interfaces/user.interface';
import {UserService} from '../../../core/services/user.service';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {NavController} from '@ionic/angular';
import {selectLoading, selectUserById} from '../../../store/selectors/users.selectors';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  user$: Observable<IUser>;
  loading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private store: Store,
    private navCtrl: NavController,
  ) {
    const userId = + this.route.snapshot.params.id;
    this.user$ = this.store.select(selectUserById, userId);
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit(): void {
  }

  navigateToDeleteUser(userId: number): void {
    this.navCtrl.navigateForward(['delete', userId]);
  }

}
