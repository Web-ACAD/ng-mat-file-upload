export class UploadFile
{


	public icon: string = 'cloud_upload';


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


	public increaseProgress(add: number): void
	{
		this.progress += add;
	}

}
