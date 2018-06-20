[![NPM version](https://img.shields.io/npm/v/@webacad/ng-mat-file-upload.svg?style=flat-square)](https://www.npmjs.com/package/@webacad/ng-mat-file-upload)
[![Build Status](https://img.shields.io/travis/Web-ACAD/ng-mat-file-upload.svg?style=flat-square)](https://travis-ci.org/Web-ACAD/ng-mat-file-upload)

# WebACAD/MatFileUpload

File input for angular material

![default style](./docs/default.png)

## Installation

```bash
$ npm install --save @webacad/ng-mat-file-upload
```

or with yarn

```bash
$ yarna add @webacad/ng-mat-file-upload
```

**Dependencies:**

* [@angular/common@^5.0](https://www.npmjs.com/package/@angular/common)
* [@angular/core@^5.0](https://www.npmjs.com/package/@angular/core)
* [@angular/forms@^5.0](https://www.npmjs.com/package/@angular/forms)
* [@angular/material@^5.0](https://github.com/angular/material2/tree/5.2.5)
* [rxjs^5.5.0](https://github.com/ReactiveX/rxjs/tree/5.5.11)
* [@webacad/observable-file-reader](https://github.com/Web-ACAD/observable-file-reader)

## Register module

**app.module.ts**

```typescript
import {MatFileUploadModule} from '@webacad/ng-mat-file-upload';

@NgModule({
    imports: [
        MatFileUploadModule,
    ],
})
export class AppModule {}
```

## Usage

```html
<wa-mat-file-upload>Choose file</wa-mat-file-upload>
```

**Available options:**

* `multiple` (boolean): allow to select multiple files
* `dense` (boolean): show with smaller text sizes
* `preview` (boolean): display selected files in preview box
* `previewPosition` (top/bottom): position of preview box, default is `bottom`
* `color` (string): change color of `mat-raised-button`

## Using in angular forms

This package implements all the necessary code for angular forms. That means that you can use it just like any other 
ordinary form control.

It is also fully ready for material's `<mat-form-field>` component.

## Upload progress

![upload progress](./docs/upload-progress.png)

**Example:**

```html
<wa-mat-file-upload
    #fileUpload="waMatFileUpload"
    placeholder="File"
    [preview]="true"
    (change)="onFileChange(fileUpload)"
>Choose file</wa-mat-file-upload>
```

```typescript
import {MatFileUploadComponent} from '@webacad/ng-mat-file-upload';

export class UploadComponent
{
    
    public onFileChange(fileUpload: MatFileUploadComponent): void
    {
        const files = fileUpload.files;
        
        if (!files.length) {
            return;
        }
        
        const stepSize: number = 10;
        
        this.uploadFile(files[0].file, () => {
            files[0].increaseProgress(stepSize);
        }, () => {
            files[0].progress = 100;
            fileUpload.disabled = true;
        });
    }
    
    private uploadFile(file: File, onChunk: () => void, onDone: () => void): void
    {
        // todo
    }
    
}
```

## Validation

There are some build in form validators which you can use out of the box.

* `fileMaxSize` (number): Maximum size of file(s)
* `fileType` (string[]): List of allowed mime types
