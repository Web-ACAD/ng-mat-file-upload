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


	public save(): void
	{
		console.log(this.form.value.fileUpload);
	}


	public startUploader(fileUpload: MatFileUploadComponent): void
	{
		const files = fileUpload.files;

		if (!files.length) {
			fileUpload.preview = false;
			return;
		}

		fileUpload.preview = true;

		const intervalTime: number = 750;
		const stepSize: number = 10;
		let current: number = 0;

		const interval = setInterval(() => {
			if (current === 100) {
				for (let i = 0; i < files.length; i++) {
					files[i].progress = 0;
					files[i].icon = 'check';
				}

				setTimeout(() => {
					fileUpload.preview = false;
					fileUpload.disabled = true;
					clearInterval(interval);
				}, intervalTime);

				return;
			}

			for (let i = 0; i < files.length; i++) {
				files[i].increaseProgress(stepSize);
			}

			current += stepSize;
		}, intervalTime);
	}


	private createForm(): void
	{
		this.form = this.$fb.group({
			fileUpload: [null],
		});
	}

}
