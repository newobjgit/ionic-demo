import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {RequestInterceptor} from './core/interceptors/request.interceptor';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './store';
import {EffectsModule} from '@ngrx/effects';
import { StorageSyncEffects } from 'ngrx-store-capacitor';
import {UsersEffects} from './store/effects/users.effects';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    IonicModule.forRoot(),
    CoreModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      initialState: {
        hydrated: false
      }
    }),
    EffectsModule.forRoot([
      UsersEffects,
      StorageSyncEffects
    ]),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
