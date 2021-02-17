import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {IUser} from '../../../common/interfaces/user.interface';
import {Store} from '@ngrx/store';
import {updateUserRequest} from '../../../store/actions/users.actions';
import {Observable} from 'rxjs';
import {selectLoading} from '../../../store/selectors/users.selectors';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.scss'],
})
export class EditUserFormComponent implements OnInit {
  @Input() user: IUser;
  editUserForm: FormGroup;
  loading$: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private navCtrl: NavController
  ) {

    this.loading$ = this.store.select(selectLoading);
  }

  get formControls() {
    return this.editUserForm.controls;
  }

  ngOnInit(): void {
    this.editUserForm = this.formBuilder.group({
      firstName: new FormControl(this.user.firstName, [Validators.required]),
      lastName: new FormControl(this.user.lastName, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      dateOfBirth: new FormControl(this.user.dateOfBirth, [Validators.required]),
    });
  }

  submitForm() {
    if (this.editUserForm.valid) {
      const formValue = this.editUserForm.value;
      const user = Object.assign({...this.user}, formValue);
      this.store.dispatch(updateUserRequest({user}));
      this.navCtrl.navigateForward('');
    }
  }

  getDate(event) {
    const date = new Date(event.target.value).toISOString().substring(0, 10);
    this.editUserForm.get('dateOfBirth').setValue(date, {
      onlyself: true
    });
  }

}
