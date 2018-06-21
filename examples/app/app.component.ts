import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {MatFileUploadComponent, fileType, fileMaxSize} from '@webacad/ng-mat-file-upload';


const FORM_LIST: Array<string> = ['Simple', 'Validation', 'Uploader', 'Preview', 'Dense', 'PreviewOnTop'];


@Component({
	selector: 'wa-example-app',
	templateUrl: './app.component.html',
})
export class AppComponent
{


	public formSimple: FormGroup;

	public formValidation: FormGroup;

	public formUploader: FormGroup;

	public formPreview: FormGroup;

	public formDense: FormGroup;

	public formPreviewOnTop: FormGroup;


	constructor(
		private $fb: FormBuilder,
	) {
		this.createForms();
	}


	public save(form: FormGroup): void
	{
		console.log(form.value.fileUpload);
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


	private createForms(): void
	{
		for (let variant of FORM_LIST) {
			let fileUpload: Array<any> = [null];

			if (variant === 'Validation') {
				fileUpload = [null, [
					fileType(['image/gif', 'image/png', 'image/jpeg',]),
					fileMaxSize(1 * 1024 * 1024),
				]];
			}

			this['form' + variant] = this.$fb.group({
				fileUpload: fileUpload,
			});
		}
	}

}
