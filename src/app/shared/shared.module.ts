import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppSpinnerComponent} from './components/app-spinner/app-spinner.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {IonicModule} from '@ionic/angular';


@NgModule({
  declarations: [
    AppSpinnerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    AppSpinnerComponent
  ]
})
export class SharedModule { }
