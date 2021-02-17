import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IUser} from '../../../common/interfaces/user.interface';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../core/services/user.service';
import {Store} from '@ngrx/store';
import {AlertController, NavController} from '@ionic/angular';
import {selectLoading, selectUserById} from '../../../store/selectors/users.selectors';
import {map} from 'rxjs/operators';
import {deleteUserRequest} from '../../../store/actions/users.actions';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent implements OnInit {
  user$: Observable<IUser>;
  user: IUser;
  loading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private alertController: AlertController,
    private store: Store,
    private navCtrl: NavController,
  ) {
    const userId = + this.route.snapshot.params.id;
    this.user$ = this.store.select(selectUserById, userId)
      .pipe(
        map(user => this.user = user)
      );
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit(): void {
  }

  async deleteHandler() {
    const alert = await this.alertController.create({
      header: 'You sure?',
      message: 'You want to delete the user?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.store.dispatch(deleteUserRequest({id: this.user.id}));
            this.navCtrl.navigateForward('');
          }
        },
        {
          text: 'No'
        }
      ]
    });

    await alert.present();
  }

}
