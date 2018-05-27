import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
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
})
export class MatFileUploadModule {}
