import {Component, Input, Optional, Self, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import {ControlValueAccessor, NgForm, FormGroupDirective, NgControl} from '@angular/forms';
import {ErrorStateMatcher, CanUpdateErrorState, mixinErrorState} from '@angular/material/core';
import {MatFormFieldControl} from '@angular/material/form-field';

import {UploadFile} from './upload-file';


let nextUniqueId: number = 0;


export class BaseMatFileUploadComponent
{


	constructor(
		public _defaultErrorStateMatcher: ErrorStateMatcher,
		public _parentForm: NgForm,
		public _parentFormGroup: FormGroupDirective,
		public ngControl: NgControl,
	) {}

}


export const _BaseMatFileUploadComponentMixin = mixinErrorState(BaseMatFileUploadComponent);


@Component({
	exportAs: 'waMatFileUpload',
	selector: 'wa-mat-file-upload',
	templateUrl: './mat-file-upload.component.html',
	providers: [
		{
			provide: MatFormFieldControl,
			useExisting: MatFileUploadComponent,
		},
	],
})
export class MatFileUploadComponent extends _BaseMatFileUploadComponentMixin implements
	OnDestroy,
	ControlValueAccessor,
	MatFormFieldControl<FileList>
{


	@Input()
	public placeholder: string;

	@Input()
	public required: boolean = false;

	@Input()
	public multiple: boolean = false;

	@Input()
	public color: string|undefined;

	@Input()
	public preview: boolean = false;

	@Input()
	public previewPosition: 'top' | 'bottom' = 'bottom';

	@Input()
	public dense: boolean = false;

	@ViewChild('fileUpload')
	public fileUpload: ElementRef;

	public visibleValue: string = '';

	public shouldLabelFloat: boolean = true;

	private _value: FileList|undefined;

	private _files: Array<UploadFile> = [];

	private _disabled: boolean;

	private _id: string;

	private _uid: string = `wa-mat-file-upload-${nextUniqueId++}`;


	constructor(
		defaultErrorStateMatcher: ErrorStateMatcher,
		@Optional() parentForm: NgForm,
		@Optional() parentFormGroup: FormGroupDirective,
		@Self() @Optional() public readonly ngControl: NgControl,
	) {
		super(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl);

		if (this.ngControl !== null) {
			this.ngControl.valueAccessor = this;
		}
	}


	@Input()
	get value(): FileList
	{
		return this._value;
	}

	set value(value: FileList) {}


	@Input()
	get disabled(): boolean
	{
		if (typeof this._disabled !== 'undefined') {
			return this._disabled;
		}

		if (this.ngControl && this.ngControl.disabled !== null) {
			return this.ngControl.disabled;
		}

		return false;
	}

	set disabled(disabled: boolean)
	{
		this._disabled = disabled;
	}


	@Input()
	get id(): string
	{
		return this._id;
	}

	set id(id: string)
	{
		this._id = id || this._uid;
	}


	get files(): Array<UploadFile>
	{
		return this._files;
	}


	get empty(): boolean
	{
		return typeof this._value === 'undefined';
	}


	get focused(): boolean
	{
		return false;
	}


	public openDialog(): void
	{
		if (this.fileUpload) {
			this.fileUpload.nativeElement.click();
		}
	}


	public ngOnDestroy(): void
	{
		this.stateChanges.complete();
	}


	public onTouched = () => {};


	public onChange(files: FileList): void
	{
		this._value = files.length === 0 ? undefined : files;
		this._files = [];

		for (let i = 0; i < files.length; i++) {
			this._files.push(new UploadFile(files[i]));
		}

		if (this._value.length === 0) {
			this.visibleValue = '';
		} else if (this._value.length === 1) {
			this.visibleValue = this._value[0].name;
		} else {
			this.visibleValue = this._value.length + ' Files selected';
		}

		this._onChange(this._value);
		this.onTouched();
		this.updateErrorState();
	}


	public writeValue(value: any): void {}


	public registerOnChange(fn: (_: any) => void): void
	{
		this._onChange = fn;
	}


	public registerOnTouched(fn: () => void): void
	{
		this.onTouched = fn;
	}


	public setDisabledState(isDisabled: boolean): void
	{
		this.disabled = isDisabled;
	}


	public onContainerClick(): void {}


	public focus(): void {}


	public setDescribedByIds(): void {}


	private _onChange = (_: any) => {};

}
