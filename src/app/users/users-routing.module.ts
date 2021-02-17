import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserListComponent} from './pages/user-list/user-list.component';
import {CreateUserComponent} from './pages/create-user/create-user.component';
import {EditUserComponent} from './pages/edit-user/edit-user.component';
import {DeleteUserComponent} from './pages/delete-user/delete-user.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
  },
  {
    path: 'create',
    component: CreateUserComponent,
  },
  {
    path: 'edit/:id',
    component: EditUserComponent,
  },
  {
    path: 'delete/:id',
    component: DeleteUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
