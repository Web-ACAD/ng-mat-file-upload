import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';


export function fileMaxSize(maxSize: number): ValidatorFn
{
	return fileValidation((file) => file.size > maxSize, (errors) => {
		return {
			fileMaxSize: {
				maxSize: maxSize,
				invalidFiles: errors,
			},
		};
	});
}


export function fileType(allowedTypes: Array<string>): ValidatorFn
{
	return fileValidation((file) => allowedTypes.indexOf(file.type) < 0, (errors) => {
		return {
			fileType: {
				allowedTypes: allowedTypes,
				invalidFiles: errors,
			},
		};
	});
}


function fileValidation(validator: (file: Blob) => boolean, createErrors: (errorFiles: Array<Blob>) => ValidationErrors): ValidatorFn
{
	return (control: AbstractControl): ValidationErrors => {
		if (!control.value) {
			return null;
		}

		const files: FileList = control.value;
		const errors: Array<any> = [];

		for (let i = 0; i < files.length; i++) {
			if (validator(files[i])) {
				errors.push(files[i]);
			}
		}

		if (errors.length) {
			return createErrors(errors);
		}

		return null;
	};
}

