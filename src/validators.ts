import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';


export function fileMaxSize(maxSize: number): ValidatorFn
{
	return (control: AbstractControl): ValidationErrors => {
		if (!control.value) {
			return null;
		}

		const files: FileList = control.value;
		const errors: Array<any> = [];

		for (let i = 0; i < files.length; i++) {
			if (files[i].size > maxSize) {
				errors.push(files[i]);
			}
		}

		if (errors.length) {
			return {
				fileMaxSize: {
					maxSize: maxSize,
					invalidFiles: errors,
				},
			};
		}

		return null;
	};
}


export function fileType(allowedTypes: Array<string>): ValidatorFn
{
	return (control: AbstractControl): ValidationErrors => {
		if (!control.value) {
			return null;
		}

		const files: FileList = control.value;
		const errors: Array<any> = [];

		for (let i = 0; i < files.length; i++) {
			if (allowedTypes.indexOf(files[i].type) < 0) {
				errors.push(files[i]);
			}
		}

		if (errors.length) {
			return {
				fileType: {
					allowedTypes: allowedTypes,
					invalidFiles: errors,
				},
			};
		}

		return null;
	};
}

