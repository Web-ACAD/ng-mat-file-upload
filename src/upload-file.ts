import {readFileAsDataURL} from '@webacad/observable-file-reader';
import {Observable} from 'rxjs';


const imageMimeTypes: Array<string> = [
	'image/gif', 'image/png', 'image/jpeg',
];


export class UploadFile
{


	public icon: string = 'cloud_upload';

	private imageSource: Observable<string>|undefined;


	constructor(
		public readonly file: File,
		private _progress: number = 0,
	) {}


	get progress(): number
	{
		return this._progress;
	}

	set progress(progress: number)
	{
		this._progress = progress;
	}


	public supportsImagePreview(): boolean
	{
		return imageMimeTypes.indexOf(this.file.type) >= 0;
	}


	public getImageSource(): Observable<string>
	{
		if (typeof this.imageSource !== 'undefined') {
			return this.imageSource;
		}

		return this.imageSource = readFileAsDataURL(this.file);
	}


	public increaseProgress(add: number): void
	{
		this.progress += add;
	}

}
