import {Component, Input, Optional, Self, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import {ControlValueAccessor, NgForm, FormGroupDirective, NgControl, FormControl} from '@angular/forms';
import {ErrorStateMatcher, CanUpdateErrorState} from '@angular/material/core';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Subject} from 'rxjs';


let nextUniqueId: number = 0;


@Component({
	selector: 'wa-mat-file-upload',
	templateUrl: './mat-file-upload.component.html',
	providers: [
		{
			provide: MatFormFieldControl,
			useExisting: MatFileUploadComponent,
		},
	],
})
export class MatFileUploadComponent implements
	OnDestroy,
	ControlValueAccessor,
	MatFormFieldControl<FileList>,
	CanUpdateErrorState
{


	@Input()
	public placeholder: string;

	@Input()
	public required: boolean = false;

	@Input()
	public errorStateMatcher: ErrorStateMatcher;

	@Input()
	public multiple: boolean = false;

	@Input()
	public color: string|undefined;

	@ViewChild('fileUpload')
	public fileUpload: ElementRef;

	public visibleValue: string = '';

	public errorState: boolean = false;

	public shouldLabelFloat: boolean = true;

	public readonly stateChanges: Subject<void> = new Subject<void>();

	private _value: FileList|undefined;

	private _disabled: boolean = false;

	private _id: string;

	private _uid: string = `wa-mat-file-upload-${nextUniqueId++}`;


	constructor(
		private _defaultErrorStateMatcher: ErrorStateMatcher,
		@Optional() private _parentForm: NgForm,
		@Optional() private _parentFormGroup: FormGroupDirective,
		@Self() @Optional() public readonly ngControl: NgControl,
	) {
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
		if (this.ngControl && this.ngControl.disabled !== null) {
			return this.ngControl.disabled;
		}

		return this._disabled;
	}

	set disabled(disabled: boolean)
	{
		this._disabled = this.disabled;
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
		if (files.length === 0) {
			this.visibleValue = '';
		} else if (files.length === 1) {
			this.visibleValue = files[0].name;
		} else {
			this.visibleValue = files.length + ' Files selected';
		}

		this._value = files.length === 0 ? undefined : files;

		this._onChange(files);
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


	public updateErrorState(): void
	{
		const oldState = this.errorState;
		const parent = this._parentFormGroup || this._parentForm;
		const matcher = this.errorStateMatcher || this._defaultErrorStateMatcher;
		const control = this.ngControl ? <FormControl>this.ngControl.control : null;
		const newState = matcher.isErrorState(control, parent);

		if (newState !== oldState) {
			this.errorState = newState;
			this.stateChanges.next();
		}
	}


	private _onChange = (_: any) => {};

}
