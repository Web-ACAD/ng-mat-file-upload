import {Component, Input, Optional, Self, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
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
	OnInit,
	OnDestroy,
	ControlValueAccessor,
	MatFormFieldControl<Array<File>>
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

	@Input()
	public selectedText: (files: Array<UploadFile>) => string = defaultSelectedText;

	@ViewChild('fileUpload')
	public fileUpload: ElementRef;

	public visibleValue: string = '';

	public shouldLabelFloat: boolean = true;

	private _value: Array<File>;

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
	get value(): Array<File>
	{
		return this._value;
	}

	set value(value: Array<File>) {}


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


	public clearFiles(): void
	{
		this._value = [];
		this._files = [];
		this.recalculate();
	}


	public removeFile(file: UploadFile): void
	{
		this._value.splice(this._value.indexOf(file.file), 1);
		this._files.splice(this._files.indexOf(file), 1);
		this.recalculate();
	}


	public ngOnInit(): void
	{
		this.visibleValue = this.selectedText(this._files);
	}


	public ngOnDestroy(): void
	{
		this.stateChanges.complete();
	}


	public onTouched = () => {};


	public onChange(files: FileList): void
	{
		this._value = [];
		this._files = [];

		for (let i = 0; i < files.length; i++) {
			this._value.push(files[i]);
			this._files.push(new UploadFile(files[i]));
		}

		this.recalculate();
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


	private recalculate(): void
	{
		this.visibleValue = this.selectedText(this._files);

		this._onChange(this._value);
		this.onTouched();
		this.updateErrorState();
	}

}


function defaultSelectedText(files: Array<UploadFile>): string
{
	if (files.length === 0) {
		return '';
	}

	if (files.length === 1) {
		return files[0].file.name;
	}

	return files.length + ' Files selected';
}
