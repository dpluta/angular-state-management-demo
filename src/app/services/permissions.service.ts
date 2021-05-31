import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FilePermissions } from './../models/file-permissions';

@Injectable({
    providedIn: 'root'
})
export class FilesPermissionsService {
    constructor() { }

    public getFilesPermissions(): Observable<FilePermissions[]> {
        const filesPermissions = [
            { fileId: 1, fileName: 'Sample.docx', permissions: ['View', 'Edit', 'Create'] },
            { fileId: 2, fileName: 'Sample2.pdf', permissions: ['View'] },
            { fileId: 3, fileName: 'Sample3.doc', permissions: ['View'] }
        ];

        return of(filesPermissions).pipe(delay(3000));
    }
}
