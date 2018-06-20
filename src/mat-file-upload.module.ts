import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';

import {MatFileUploadComponent} from './mat-file-upload.component';


@NgModule({
	imports: [
		CommonModule,
		MatButtonModule, MatDividerModule, MatListModule, MatProgressBarModule, MatIconModule,
	],
	declarations: [
		MatFileUploadComponent,
	],
	exports: [
		MatFileUploadComponent,
	],
	providers: [
		ErrorStateMatcher,
	],
})
export class MatFileUploadModule {}
