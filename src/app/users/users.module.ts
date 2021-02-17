import { NgModule } from '@angular/core';
import {UserListComponent} from './pages/user-list/user-list.component';
import {SharedModule} from '../shared/shared.module';
import {UsersRoutingModule} from './users-routing.module';
import {IonicModule} from '@ionic/angular';
import {CreateUserComponent} from './pages/create-user/create-user.component';
import {CreateUserFormComponent} from './components/create-user-form/create-user-form.component';
import {EditUserComponent} from './pages/edit-user/edit-user.component';
import {DeleteUserComponent} from './pages/delete-user/delete-user.component';
import {EditUserFormComponent} from './components/edit-user-form/edit-user-form.component';


@NgModule({
  declarations: [
    UserListComponent,
    CreateUserComponent,
    CreateUserFormComponent,
    EditUserComponent,
    DeleteUserComponent,
    EditUserComponent,
    EditUserFormComponent
  ],
  imports: [
    SharedModule,
    UsersRoutingModule,
    IonicModule
  ],
  exports: [
    UsersRoutingModule
  ]
})
export class UsersModule { }
