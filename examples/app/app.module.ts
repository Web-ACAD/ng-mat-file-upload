import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';

import {MatFileUploadModule} from '@webacad/ng-mat-file-upload';

import {AppComponent} from './app.component';


@NgModule({
	imports: [
		BrowserModule, BrowserAnimationsModule,
		CommonModule,
		ReactiveFormsModule,
		MatFormFieldModule, MatTabsModule, MatButtonModule,
		MatFileUploadModule,
	],
	declarations: [
		AppComponent,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
