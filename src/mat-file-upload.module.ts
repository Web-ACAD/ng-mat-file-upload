import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

import {MatFileUploadComponent} from './mat-file-upload.component';


@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
	],
	declarations: [
		MatFileUploadComponent,
	],
	exports: [
		MatFileUploadComponent,
	],
})
export class MatFileUploadModule {}
