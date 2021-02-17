import { NgModule, Optional, SkipSelf } from '@angular/core';
import {throwIfAlreadyLoaded} from './module-import-guard';
import {UserApi} from './api/user.api';
import {UserService} from './services/user.service';

@NgModule({
  imports: [
  ],
  exports: [
  ],
  providers: [
    UserApi,
    UserService
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
