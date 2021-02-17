import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {UserService} from '../../../core/services/user.service';
import {Store} from '@ngrx/store';
import {addUserRequest} from '../../../store/actions/users.actions';
import {Observable} from 'rxjs';
import {selectLoading} from '../../../store/selectors/users.selectors';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.scss'],
})
export class CreateUserFormComponent implements OnInit {
  loading$: Observable<boolean>;
  createUserForm: FormGroup;
  defaultDate = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private store: Store,
    private navCtrl: NavController
  ) {
    this.createUserForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfBirth: new FormControl(this.defaultDate, [Validators.required]),
    });

    this.loading$ = this.store.select(selectLoading);
  }

  get formControls() {
    return this.createUserForm.controls;
  }

  ngOnInit(): void {
  }

  submitForm() {
    if (this.createUserForm.valid) {
      const formValue = this.createUserForm.value;
      this.store.dispatch(addUserRequest({user: formValue}));
      this.navCtrl.navigateForward('');
    }
  }

  getDate(event) {
    const date = new Date(event.target.value).toISOString().substring(0, 10);
    this.createUserForm.get('dateOfBirth').setValue(date, {
      onlyself: true
    });
  }

}
