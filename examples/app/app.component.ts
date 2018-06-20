import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {MatFileUploadComponent} from '@webacad/ng-mat-file-upload';


@Component({
	selector: 'wa-example-app',
	templateUrl: './app.component.html',
})
export class AppComponent
{


	public form: FormGroup;


	constructor(
		private $fb: FormBuilder,
	) {
		this.createForm();
	}


	public startUploader(fileUpload: MatFileUploadComponent): void
	{
		const files = fileUpload.value;

		if (!files.length) {
			fileUpload.hideUploader();
			return;
		}

		fileUpload.showUploader();

		const stepSize: number = 10;
		let current: number = 0;

		const interval = setInterval(() => {
			if (current === 100) {
				fileUpload.hideUploader();
				fileUpload.disabled = true;
				clearInterval(interval);
				return;
			}

			for (let i = 0; i < files.length; i++) {
				fileUpload.increaseUploaderProgress(i, stepSize);
			}

			current += stepSize;
		}, 500);
	}


	private createForm(): void
	{
		this.form = this.$fb.group({
			file: [null],
		});
	}

}
